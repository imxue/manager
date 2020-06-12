<template>
  <div class="add">
    <div class="add-right">
      <el-form :model="Form" status-icon ref="rules" label-width="100px">
        <el-form-item label="游戏中心名称" prop="name">
          <el-input v-model="Form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="IP地址或域名" prop="address">
          <el-input v-model="Form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="enable">
          <el-select v-model.number="Form.enable">
            <el-option label="启用" :value="1"> </el-option>
            <el-option label="禁用" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('rules')"
            >提交</el-button
          >
          <el-button @click="resetForm('rules')">重置</el-button>
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
            用于渠道管理中对应游戏中心地址
          </li>
          <li>
            每个加盟商挂载一个渠道
          </li>
          <li>
            加盟商管辖的网吧中，mainserver根据这个配置获取游戏中心地址，并从中获取游戏
          </li>
        </ol>
      </el-card>
    </div>
  </div>
</template>

<script>
import { create } from "../../../api/index";
export default {
  name: "add",
  data() {
    return {
      Form: {
        name: "",
        address: "",
        enable: 1
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        address: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        enable: [
          {
            required: true,
            type: Number,
            message: "请输入活动名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.Form.enable = Number(this.Form.enable);
            await create(this.Form);
            this.$message({
              showClose: true,
              message: "创建成功",
              type: "success"
            });
            this.Form = {};
            this.$router.push({ path: "/BasicManagement/GameCenter" });
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
    resetForm(name) {
      this.$refs[name].resetFields();
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
