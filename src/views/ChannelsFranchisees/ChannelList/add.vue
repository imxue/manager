<template>
  <div class="add">
    <div class="add-right">
      <el-form :model="form" status-icon ref="form" label-width="100px">
        <el-form-item label="渠道名称" prop="pass">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="游戏中心" prop="checkPass">
          <el-select v-model="form.game_center_id" :disabled="channeldisabled">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="更新地址" prop="checkPass">
          <el-select
            v-model="form.upgrade_version_id"
            :disabled="updatedisabled"
          >
            <el-option
              v-for="item in UpgradeUrl"
              :key="item.id"
              :label="item.upgrade_url"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" prop="menu_type">
          <el-checkbox-group v-model="form.menu_type" :disabled="disabled">
            <el-radio-group v-model="form.menu_type">
              <el-radio :label="1">图标 + Banner</el-radio>
              <el-radio :label="2">卡牌</el-radio>
            </el-radio-group>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态" prop="enable">
          <el-select v-model="form.enable">
            <el-option label="启用" value="1"> </el-option>
            <el-option label="禁用" value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">添加</el-button>
          <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-left">
      <el-card shadow="never">
        <ol>
          <label>
            说明：
          </label>
          <li>
            每个渠道可控制可用的游戏中心（1对1）
          </li>
          <li>
            可设置渠道可用的菜单显示类型：图标+Banner或者卡牌图标，加盟商可自行选择
          </li>
        </ol>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getall, oemCreate, getOemUpgradeUrl } from "../../../api/index";
export default {
  name: "add",
  data() {
    return {
      form: {
        name: "",
        game_center_id: "",
        enable: "1",
        menu_type: 1,
        upgrade_version_id: ""
      },
      channeldisabled: true,
      updatedisabled: true,
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
      channelList: [], // 渠道类别，更新地址
      UpgradeUrl: ""
    };
  },
  created() {
    this.HandleGetAll();
    this.HandleGetUdate();
  },
  methods: {
    async HandleGetAll() {
      try {
        let resp = await getall();
        this.channelList = resp.data.data;
        this.form.game_center_id = this.channelList[0].id;
      } catch (error) {
        console.log(error);
      } finally {
        this.channeldisabled = false;
      }
    },

    async HandleGetUdate() {
      try {
        let resp = await getOemUpgradeUrl();
        this.UpgradeUrl = resp.data.data;
        this.form.upgrade_version_id = this.UpgradeUrl[0].id;
      } catch (error) {
        console.log(error);
      } finally {
        this.updatedisabled = false;
      }
    },
    submitForm(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.form.enable = Number(this.form.enable);
            await oemCreate(this.form);
            this.$message({
              showClose: true,
              message: "创建成功",
              type: "success"
            });
            this.form = {};
            this.$router.push({ path: "/ChannelsFranchisees/ChannelList" });
          } catch (error) {
            this.$message({
              showClose: true,
              message: error.data.error,
              type: "error"
            });
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$router.push({ path: "/ChannelsFranchisees/ChannelList" });
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
