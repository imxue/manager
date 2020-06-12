<template>
  <div class="RoleManagement">
    <el-table :data="List" style="width: 100%" border v-loading="loading">
      <el-table-column type="index" label="编号" width="50"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile_phone" label="手机号"> </el-table-column>

      <el-table-column prop="regist_time" label="注册日期">
        <template slot-scope="scope">
          <span>{{ scope.row.regist_time | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role_ids" label="角色">
        <template slot-scope="scope">
          <span>{{ scope.row.role_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleallocate(scope.row)"
            >分配权限</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <el-pagination
      style="float:right;margin-top:10px;"
      background
      layout="prev, pager, next"
      :total="pageinfo.count"
      :page-size="limit"
      @current-change="HandleChange"
    >
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-transfer
        :props="{
          key: 'id',
          label: 'name'
        }"
        :titles="['可选权限', '已有权限']"
        v-model="value"
        :data="Roledata"
      ></el-transfer>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleCorfim">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getallUser, getallRole, allocateRole } from "../../api/index";
export default {
  name: "Role",
  data() {
    return {
      List: [],
      RoleList: [],
      dialogVisible: false,
      value: [],
      Roledata: [],
      selectedId: "",
      loading: false,
      pageinfo: {
        count: 0
      },
      limit: 5,
      offset: 0
    };
  },
  async created() {
    await this.HandleGetRole();
    this.HandleGetUser({ offset: 0, limit: this.limit });
  },
  methods: {
    handleClose() {},
    async HandleGetUser(data) {
      try {
        this.loading = true;
        let resp = await getallUser(data);
        this.List = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
        for (let x = 0; x < this.List.length; x++) {
          let temp = new Set();
          let array = this.List[x].role_ids.split(",");
          for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < this.RoleList.length; j++) {
              if (array[i] === this.RoleList[j].id) {
                temp.add(this.RoleList[j].name);
              }
            }
          }
          this.List[x].role_id = [...temp].toString();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async HandleGetRole() {
      try {
        let resp = await getallRole();
        this.RoleList = resp.data.data;
      } catch (error) {
        console.log(error);
      }
      return this.RoleList;
    },
    async handleallocate(row) {
      this.Roledata = this.RoleList;
      this.selectedId = row.id;
      this.value = row.role_ids.split(",");
      this.dialogVisible = true;
    },
    HandleCorfim() {
      try {
        let str = this.value.toString();
        allocateRole({ userid: this.selectedId, roleids: str });
        this.dialogVisible = false;
      } catch (error) {
        this.$Message.success("修改成功");
      } finally {
        this.HandleGetUser({ offset: 0, limit: 10 });
      }
    },
    HandleChange(page) {
      this.offset = (page - 1) * this.limit;
      this.HandleGetUser({ offset: this.offset, limit: this.limit });
    }
  }
};
</script>
>
