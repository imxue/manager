<template>
  <div class="RoleManagement">
    <el-button type="primary" @click="AddRoles" style="margin-Bottom:10px"
      >创建角色</el-button
    >
    <el-table :data="List" style="width: 100%" border v-loading="loading">
      <el-table-column type="index" label="编号" width="50"> </el-table-column>
      <el-table-column prop="code" label="编号"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="edit(scope.row)"
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
    <el-dialog
      :title="EidtFlag ? 'EditRole' : 'addRole'"
      :visible.sync="addRole"
    >
      <el-form :model="form" ref="form">
        <el-form-item label="id" v-if="EidtFlag">
          <el-input v-model="form.id" autocomplete="off" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="description">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getallRole, addRole, editRole, deleteRole } from "../../api/index";
export default {
  name: "Role",
  data() {
    return {
      List: [],
      addRole: false,
      EidtFlag: false,
      form: {
        name: "",
        code: "",
        description: ""
      },
      loading: true
    };
  },
  created() {
    this.HandleGetRole();
  },
  methods: {
    async HandleGetRole() {
      try {
        this.loading = true;
        let resp = await getallRole();
        this.List = resp.data.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    AddRoles() {
      this.addRole = true;
      this.EidtFlag = false;
      this.form = {
        name: "",
        code: "",
        description: ""
      };
    },
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            this.EidtFlag
              ? await editRole(this.form)
              : await addRole(this.form);
            this.addRole = false;
            this.HandleGetRole();
          } catch (error) {
            this.$Message.error(error.data.error);
          }
        }
      });
    },
    edit(row) {
      this.EidtFlag = true;
      this.addRole = true;
      let { id, name, code, description } = row;
      this.form = { id, name, code, description };
    },
    async handleDelete(row) {
      try {
        await deleteRole(row.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.HandleGetRole();
      }
    }
  }
};
</script>
>
