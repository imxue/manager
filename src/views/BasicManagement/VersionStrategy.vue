<template>
  <div class="RoleManagement">
    <el-button type="primary" @click="AddRoles" style="margin-Bottom:10px"
      >创建版本策略</el-button
    >
    <el-table :data="List" style="width: 100%" border v-loading="loading">
      <el-table-column type="index" label="编号" width="50"> </el-table-column>
      <el-table-column prop="upgrade_url" label="更新url"> </el-table-column>
      <el-table-column prop="force_upgrade_url" label="强力更新url">
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.create_time | formatTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.update_time | formatTime }}</span>
        </template>
      </el-table-column>
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
      :title="EidtFlag ? '修改版本策略' : '添加版本策略'"
      :visible.sync="addRole"
    >
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="id" v-if="EidtFlag">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="强更地址">
          <el-input
            v-model="form.force_upgrade_url"
            autocomplete="off"
            :disabled="subloading"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="form.upgrade_url"
            autocomplete="off"
            :disabled="subloading"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="HandleClose" :loading="subloading">取 消</el-button>
        <el-button type="primary" @click="submit('form')" :loading="subloading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addOemUpgradeUrl,
  deleteOemUpgradeUrl,
  getOemUpgradeUrl,
  editOemUpgradeUrl
} from "../../api/index";

export default {
  name: "Role",
  data() {
    return {
      List: [],
      addRole: false,
      EidtFlag: false,
      subloading: false,
      form: {
        upgrade_url: "",
        force_upgrade_url: ""
      },
      loading: true
    };
  },
  created() {
    this.HandOemUpgradeUrl();
  },
  methods: {
    async HandOemUpgradeUrl() {
      try {
        this.loading = true;
        let resp = await getOemUpgradeUrl();
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
        oem_id: this.channelList[0].id
      };
    },
    submit(formName) {
      this.subloading = true;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            this.EidtFlag
              ? await editOemUpgradeUrl(this.form)
              : await addOemUpgradeUrl(this.form);
            this.addRole = false;
            this.HandOemUpgradeUrl();
          } catch (error) {
            this.$Message.error(error.data.error);
          } finally {
            this.subloading = false;
          }
        }
      });
    },
    edit(row) {
      this.EidtFlag = true;
      this.addRole = true;
      let { id, name, upgrade_url, oem_id } = row;
      this.form = { id, name, upgrade_url, oem_id };
    },
    async handleDelete(row) {
      try {
        await deleteOemUpgradeUrl(row.id);
      } catch (error) {
        console.log(error);
      } finally {
        this.HandleGetRole();
      }
    },
    HandleClose() {
      this.addRole = false;
    }
  }
};
</script>
>
