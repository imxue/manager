<template>
  <div class="FranchisePointsAdjustmentDetails">
    <div class="fpad-header">
      <router-link to="/ChannelsFranchisees/Addpoint">
        <el-button type="primary">
          充值
        </el-button>
      </router-link>
    </div>
    <div class="fpad-main">
      <el-table
        :data="RecordsList"
        style="width: 100%"
        border
        v-loading="loading"
      >
        <el-table-column type="index" label="编号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="加盟商名称"> </el-table-column>
        <el-table-column prop="user_name" label="联系人"> </el-table-column>
        <el-table-column prop="mobile_phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="original_recharge_balance" label="原充值点数">
        </el-table-column>
        <el-table-column prop="original_gift_balance" label="原赠送点数">
        </el-table-column>
        <el-table-column prop="current_recharge_balance" label="现充值点数">
        </el-table-column>
        <el-table-column prop="current_gift_balance" label="现增送点数">
        </el-table-column>
        <el-table-column prop="operator" label="操作人"> </el-table-column>
        <el-table-column prop="update_time" label="操作时间">
          <template slot-scope="scope">
            <span>{{ scope.row.update_time | formatTime }}</span>
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
import { getRechargeRecords } from "../../../api/index";
export default {
  name: "FranchisePointsAdjustmentDetails",
  data() {
    return {
      RecordsList: [],
      loading: false,
      offset: 0,
      limit: 10,
      pageinfo: {
        count: 0
      }
    };
  },
  async created() {
    await this.HandleGetRechargeRecords({ offset: 0, limit: 10, orderby: "" });
  },
  methods: {
    async HandleGetRechargeRecords(params) {
      try {
        this.loading = true;
        let resp = await getRechargeRecords(params);
        this.RecordsList = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    HandleChange(page) {
      this.offset = (page - 1) * this.limit;
      this.HandleGetRechargeRecords({ offset: this.offset, limit: this.limit });
    }
  }
};
</script>
<style lang="scss" scoped>
.fpad-header {
  margin-bottom: 20px;
}
</style>
