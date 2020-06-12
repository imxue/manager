<template>
  <div class="add">
    <div class="add-right">
      <el-form :model="form" status-icon ref="form" label-width="180px">
        <el-form-item label="加盟商账号" prop="pass">
          <el-input
            v-model="form.account"
            autocomplete="off"
            @change="SearchByName"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="pass">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="pass">
          <el-input v-model="form.mobile_phone" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="原充值点数" prop="pass">
          <el-input v-model="form.recharge_balance" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="调整点数" prop="pass">
          <el-input
            v-model="form.adj_recharge_balance"
            :disabled="flag"
            type="number"
            @change="HandleChangeRechargeBalance"
          ></el-input>
          调整后充值点数:{{ submit.Actual_recharge_balance }}
        </el-form-item>
        <el-form-item label="原赠送点数" prop="pass">
          <el-input v-model="form.gift_balance" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="调整点数" prop="pass">
          <el-input
            v-model="form.adj_gift_balance"
            :disabled="flag"
            type="number"
            @change="HandleChangeGifBalance"
          ></el-input>
          调整后赠送点数:{{ submit.Actualt_gift_balance }}
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :disabled="flag"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')" :disabled="flag"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { checkout, recharge } from "../../../api/index";
export default {
  name: "add",
  data() {
    return {
      flag: true,
      form: {
        account: "",
        mobile_phone: "",
        name: "",
        allow_child_agent: 1,
        enable: 1,
        area_ids: "",
        oem_id: "",
        user_id: "",
        gift_balance: "",
        adj_gift_balance: "",
        recharge_balance: "",
        adj_recharge_balance: ""
      },
      submit: {
        user_id: "",
        Actual_recharge_balance: "",
        Actualt_gift_balance: ""
      },
      enablelList: [
        {
          id: 1,
          name: "启用"
        },
        {
          id: 0,
          name: "禁用"
        }
      ],
      selfAdd: [
        {
          id: 1,
          name: "是"
        },
        {
          id: 0,
          name: "否"
        }
      ],

      channelList: [] // 渠道类别
    };
  },
  created() {},
  methods: {
    HandleChangeRechargeBalance(e) {
      this.submit.Actual_recharge_balance =
        Number(this.form.recharge_balance) + Number(e);
    },
    HandleChangeGifBalance(e) {
      this.submit.Actualt_gift_balance =
        Number(this.form.gift_balance) + Number(e);
    },
    HandleGetAreas(data, obj) {
      console.log(obj);
    },
    async SearchByName(e) {
      try {
        let resp = await checkout(e);
        let {
          mobile_phone,
          user_name,
          user_id,
          gift_balance,
          recharge_balance
        } = resp.data.data;
        this.form.mobile_phone = mobile_phone;
        this.form.name = user_name;
        this.submit.user_id = user_id;
        this.form.gift_balance = gift_balance;
        this.form.recharge_balance = recharge_balance;
        this.flag = false;
      } catch (error) {
        this.flag = true;
        console.log(error);
      }
    },
    submitForm(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            let {
              user_id,
              Actual_recharge_balance,
              Actualt_gift_balance
            } = this.submit;
            await recharge({
              user_id,
              adjust_recharge_balance: Actual_recharge_balance,
              adjust_gift_balance: Actualt_gift_balance
            });
            this.$message({
              showClose: true,
              message: "创建成功",
              type: "success"
            });
            this.form = {};
            this.$router.push({ path: "/ChannelsFranchisees/pointIndex" });
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
    }
  }
};
</script>
<style lang="scss" scoped>
.add {
  display: flex;
  padding: 60px;
  form {
    min-width: 450px;
  }
  .add-left {
    margin-left: 100px;
    li {
      margin-bottom: 10px;
    }
    li:nth-child(2) {
      margin-top: 10px;
    }
  }
}
</style>
