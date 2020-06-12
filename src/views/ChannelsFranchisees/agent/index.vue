<template>
  <div class="FranchiseeList">
    <div class="fl-header">
      <router-link to="/ChannelsFranchisees/add">
        <el-button type="primary">添加加盟商</el-button>
      </router-link>
    </div>
    <div class="fl-main">
      <el-table
        :data="agentList"
        style="width: 100%"
        border
        v-loading="loading"
      >
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="user_name" label="联系人"> </el-table-column>
        <el-table-column prop="mobile_phone" label="联系电话" width="150">
        </el-table-column>
        <el-table-column prop="oem" label="渠道"> </el-table-column>
        <el-table-column prop="enable" label="状态">
          <template slot-scope="scope">
            <span>{{ scope.row.enable === 1 ? "启用" : "禁用" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operator" label="操作人"> </el-table-column>
        <el-table-column prop="update_time" label="操作时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | formatTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="small"
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

      <el-pagination
        style="float:right;margin-top:10px;"
        background
        layout="prev, pager, next"
        :total="pageinfo.count"
        :page-size="limit"
        @current-change="HandleChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getAllAgentInfo, deleteAgent } from "../../../api/index";
export default {
  name: "FranchiseeList",
  data() {
    return {
      agentList: [],
      loading: false,
      pageinfo: {
        count: 0
      },
      limit: 10,
      offset: 0
    };
  },
  created() {
    this.HandleGetAllAgent({ offset: 0, limit: 10, orderby: "" });
  },
  methods: {
    async handleEdit(data) {
      this.$router.push({
        path: "/ChannelsFranchisees/add?edit=true",
        query: {
          data: data
        }
      });
    },
    async HandleGetAllAgent(params) {
      try {
        this.loading = true;
        let resp = await getAllAgentInfo(params);
        this.agentList = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async handleDelete(row) {
      try {
        await deleteAgent(row.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.HandleGetAllAgent({
          offset: this.offset,
          limit: this.limit,
          orderby: ""
        });
      }
    },
    HandleChange(page) {
      this.offset = (page - 1) * this.limit;
      this.HandleGetAllAgent({ offset: this.offset, limit: this.limit });
    },
    resetForm(name) {
      this.dialogFormVisible = false;
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.fl-header {
  margin-bottom: 20px;
}
</style>
