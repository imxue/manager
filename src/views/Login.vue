<template>
  <div class="xx">
    <el-form
      :model="form"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="pass">
        <el-input
          type="text"
          v-model="form.account"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../api/index";
export default {
  data() {
    return {
      form: {
        account: "",
        password: ""
      },
      rules2: {
        // pass: [{ validator: validatePass, trigger: "blur" }],
        // checkPass: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            let resp = await login(this.form);
            localStorage.setItem("managementtoken", resp.data.token);
            this.$router.push("/BasicManagement");
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.xx {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
