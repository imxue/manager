<template>
  <div class="GameCenterAddress">
    <div class="gc-header">
      <router-link to="/BasicManagement/AddGameCenter">
        <el-button type="primary">
          添加
        </el-button>
      </router-link>
    </div>
    <div class="gc-main">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        highlight-current-row
        v-loading="loading"
      >
        <el-table-column type="index" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="158">
        </el-table-column>
        <el-table-column prop="address" label="地址（域名或IP）" width="200">
        </el-table-column>
        <el-table-column prop="enable" label="状态" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.enable === 1 ? "启用" : "禁用" }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="operator" label="操作人" width="80">
        </el-table-column>
        <el-table-column prop="update_time" label="操作时间" width="158">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="158">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑游戏中心地址" :visible.sync="dialogFormVisible">
      <el-form :model="editData" ref="rules">
        <el-form-item label="游戏中心名称" label-width="180px">
          <el-input v-model="editData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP地址或域名" label-width="180px">
          <el-input v-model="editData.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="180px">
          <el-select v-model="editData.enable">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleEdit('rules')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getall, edit, deleteGameCenter } from "../../../api/index";
export default {
  name: "GameCenterAddress",
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      editData: {
        id: "",
        name: "",
        address: "",
        enable: ""
      },
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        enable: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.HandleGetAll();
  },
  methods: {
    handleEdit(e) {
      this.dialogFormVisible = true;
      let { id, name, address, enable } = e;
      enable += "";
      this.editData = { id, name, address, enable };
    },
    async HandleGetAll() {
      try {
        this.loading = true;
        let resp = await getall();
        this.tableData = resp.data.data;
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
            await edit(this.editData);
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            this.HandleGetAll();
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
    handleDelete(row) {
      try {
        deleteGameCenter(row.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.HandleGetAll();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.gc-header {
  margin-bottom: 20px;
  a {
    color: white;
  }
}
</style>
