<template>
  <div class="ChannelList">
    <div class="cl-header">
      <router-link to="AddChannelList">
        <el-button type="primary">添加渠道</el-button>
      </router-link>
    </div>
    <div class="cl-main">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        fit="fit"
        v-loading="loading"
      >
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column
          prop="game_center_name"
          label="游戏中心名称"
          width="140"
        >
        </el-table-column>
        <el-table-column prop="menu_type" label="菜单类型">
          <template slot-scope="scope">
            <span>{{
              scope.row.menu_type === 1
                ? "图标 + Banner"
                : scope.row.menu_type === 2
                ? "卡牌"
                : scope.row.menu_type
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="enable" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.enable === 1 ? "启用" : "禁用" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人"> </el-table-column>
        <el-table-column prop="update_time" label="操作时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >

            <el-button
              size="mini"
              type="primary"
              plain
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </div>
    <el-dialog title="编辑渠道列表" :visible.sync="dialogFormVisible">
      <el-form :model="editData" status-icon ref="form" label-width="100px">
        <el-form-item label="渠道名称" prop="pass">
          <el-input v-model="editData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏中心" prop="checkPass">
          <el-select v-model="editData.game_center_id">
            <el-option
              v-for="item in GamelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menu_type">
          <el-radio-group v-model="editData.menu_type">
            <el-radio :label="1">图标 + Banner</el-radio>
            <el-radio :label="2">卡牌</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="enable">
          <el-select v-model="editData.enable">
            <el-option label="启用" value="1"> </el-option>
            <el-option label="禁用" value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="HandleEdit('form')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { oemGetall, oemEdit, getall, deleteOem } from "../../../api/index";
export default {
  name: "ChannelList",
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      editData: {},
      GamelList: [],
      form: "",
      fit: true
    };
  },
  created() {
    this.HandleOemGetAll();
    this.HandleGetAll(); // 获取游戏中心列表
  },
  methods: {
    async handleEdit(e) {
      await this.HandleOemGetAll();
      let { id, game_center_id, name, menu_type, enable } = e;
      enable += "";
      this.editData = { id, game_center_id, name, menu_type, enable };
      this.dialogFormVisible = true;
    },
    async HandleGetAll() {
      try {
        let resp = await getall();
        this.GamelList = resp.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async HandleOemGetAll() {
      try {
        this.loading = true;
        let resp = await oemGetall();
        this.tableData = resp.data.data;
        console.log(resp);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async HandleEdit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.editData.enable = Number(this.editData.enable);
            await oemEdit(this.editData);
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            this.HandleOemGetAll();
            this.dialogFormVisible = false;
            this.editData = {};
          } catch (error) {
            this.$message({
              showClose: true,
              message: error.data,
              type: "error"
            });
          }
        } else {
          return false;
        }
      });
    },
    async handleDelete(row) {
      try {
        await deleteOem(row.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.HandleOemGetAll();
      }
    },
    resetForm(name) {
      this.dialogFormVisible = false;
      this.$refs[name].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.cl-header {
  margin-bottom: 20px;
}
</style>
