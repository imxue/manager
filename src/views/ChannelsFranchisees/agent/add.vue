<template>
  <div class="add">
    <div class="add-right">
      <el-form
        v-if="!editFlag"
        :model="form"
        status-icon
        ref="form"
        label-width="180px"
      >
        <el-form-item label="加盟商账号" prop="pass">
          <el-input
            v-model.trim="form.account"
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
        <el-form-item label="地区" prop="pass">
          <el-cascader
            ref="tree"
            :disabled="flag || getAreaLoading"
            placeholder="请选择地区"
            width="200px"
            :options="Region"
            :props="props"
            clearable
            v-model="form.area_ids"
            @change="HandleChange"
            collapse-tags
          ></el-cascader>
        </el-form-item>
        <el-form-item label="渠道" prop="checkPass">
          <el-select
            v-model="form.oem_id"
            :disabled="flag || getChannelLoading"
          >
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否允许添加自加盟商" prop="menu_type">
          <el-select v-model="form.allow_child_agent" :disabled="flag">
            <el-option
              v-for="item in selfAdd"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="enable" :disabled="flag">
          <el-select v-model="form.enable" :disabled="flag">
            <el-option
              v-for="item in enablelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :disabled="flag"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
      <el-form
        v-if="editFlag"
        :model="editForm"
        status-icon
        ref="form"
        label-width="180px"
      >
        <el-form-item label="加盟商ID" prop="pass">
          <el-input
            v-model="editForm.id"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="加盟商账号" prop="pass">
          <el-input
            v-model="editForm.account"
            autocomplete="off"
            @change="SearchByName"
          ></el-input>
        </el-form-item>

        <el-form-item label="联系人" prop="pass">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="pass">
          <el-input v-model="editForm.mobile_phone"></el-input>
        </el-form-item>

        <el-form-item label="地区" prop="pass">
          <el-cascader
            :disabled="getAreaLoading"
            ref="tree"
            placeholder="请选择地区"
            width="200px"
            :options="Region"
            :props="props"
            collapse-tags
            v-model="editForm.area_ids"
            :show-all-levels="false"
            @change="HandleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="渠道" prop="checkPass">
          <el-select v-model="editForm.oem_id" :disabled="getChannelLoading">
            <el-option
              v-for="item in channelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否允许添加自加盟商" prop="menu_type">
          <el-select v-model="editForm.allow_child_agent">
            <el-option
              v-for="item in selfAdd"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="enable">
          <el-select v-model="editForm.enable">
            <el-option
              v-for="item in enablelList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEdit('form')"
            >添加</el-button
          >
          <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="add-left"></div>
  </div>
</template>

<script>
import {
  oemGetall,
  createAgent,
  getUserInfo,
  getAllArea,
  editAgent
} from "../../../api/index";
export default {
  name: "add",
  data() {
    return {
      props: {
        value: "area_id",
        label: "label",
        multiple: true,
        checkStrictly: false,
        emitPath: false
      },
      editFlag: false,
      options: [],
      flag: true,
      areas: [],
      form: {
        account: "",
        mobile_phone: "",
        name: "",
        allow_child_agent: 1,
        enable: 1,
        area_ids: "",
        oem_id: "",
        user_id: ""
      },
      editForm: {
        id: "",
        name: "",
        mobile_phone: "",
        allow_child_agent: "",
        enable: "",
        area_ids: "",
        oem_id: ""
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

      channelList: [], // 渠道类别
      Region: [],
      getAreaLoading: true,
      getChannelLoading: true
    };
  },
  async created() {
    this.HandleGetAll();
    this.getArea();
    let { data, edit } = this.$route.query;
    if (edit) {
      this.editFlag = true;
      let {
        id,
        allow_child_agent,
        mobile_phone,
        name,
        oem_id,
        enable,
        area_ids
      } = data;
      this.editForm.id = id;
      this.editForm.allow_child_agent = allow_child_agent;
      this.editForm.enable = enable;
      this.editForm.name = name;
      this.editForm.oem_id = oem_id;
      this.editForm.mobile_phone = mobile_phone;
      this.editForm.area_ids = area_ids.split(",");
    }
  },
  methods: {
    HandleGetAreas(data, obj) {
      console.log(obj);
    },
    async getArea() {
      try {
        let x = await getAllArea();
        let temp = x.data.data;
        this.Region = this.test1(temp);
        this.getAreaLoading = false;
      } catch (error) {
        this.$message({
          type: "error",
          message: `${error}`
        });
      }
    },
    async SearchByName(e) {
      try {
        let resp = await getUserInfo(e);
        let { mobile_phone, name, id } = resp.data.data;
        this.form.mobile_phone = mobile_phone;
        this.form.name = name;
        this.form.user_id = id;
        this.flag = false;
      } catch (error) {
        this.flag = true;
        this.$message({
          type: "error",
          message: `${error.data.error}`
        });
      }
    },
    async HandleGetAll() {
      try {
        let resp = await oemGetall();
        this.channelList = resp.data.data;
        if (!this.editFlag) {
          this.form.oem_id = this.channelList[0].id;
        }
        this.getChannelLoading = false;
      } catch (error) {
        this.$message({
          type: "error",
          message: `${error.data.error}`
        });
      }
    },
    submitForm(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            await createAgent(this.form);
            this.$message({
              showClose: true,
              message: "创建成功",
              type: "success"
            });
            this.form = {};
            this.$router.push({ path: "/ChannelsFranchisees/index" });
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
    submitFormEdit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.editForm.area_ids =
              this.editForm.area_ids && this.editForm.area_ids.toString();
            await editAgent(this.editForm);
            this.$message({
              showClose: true,
              message: "创建成功",
              type: "success"
            });
            this.form = {};
            this.$router.push({ path: "/ChannelsFranchisees/index" });
          } catch (error) {
            this.$message({
              showClose: true,
              message: error,
              type: "error"
            });
          }
        } else {
          return false;
        }
      });
    },
    test1(array) {
      array.forEach(item => {
        for (let key in item) {
          if (key.indexOf("name") !== -1) {
            item["label"] = item[key];
          }
          if (item[key] instanceof Array) {
            item["children"] = item[key];
            this.test1(item["children"]);
          }
        }
      });
      return array;
    },

    HandleChange(v) {
      this.form.area_ids = v.toString();
      this.editForm.area_ids = v.toString();
    },

    resetForm() {
      this.$router.push({ path: "/ChannelsFranchisees/index" });
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
