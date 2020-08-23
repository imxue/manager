<template>
  <div class="AreaManagement">
    <el-dialog
      title="提示"
      :visible.sync="showUp"
      width="30%"
      :before-close="handleClose"
    >
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <el-tree
      ref="tree"
      @node-expand="HandleNodeExpand"
      style="max-width:500px;"
      :data="Region"
      node-key="value"
      :filter-node-method="filterNode"
    >
    </el-tree>
  </div>
</template>
<script>
import { addArea, getAllArea, deleteArea } from "../../api";
export default {
  data() {
    return {
      data4: [],
      showUp: false,
      input: "",
      country_id: "",
      str: [],
      expanded: [localStorage.getItem("expandItem")] || [],
      region_id: "",
      province_id: "",
      filterText: "",
      Region: [
        {
          value: "123",
          label: "test",
          children: []
        }
      ]
    };
  },
  created() {
    this.getArea();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    append(node) {
      this.str = [];
      this.HandleGetId(node);
      this.showUp = true;
      this.input = "";
    },
    async ok() {
      let params = {};
      if (this.str.length == 0) {
        // add city
        params = { country: this.input };
      }
      if (this.str.length == 1) {
        // add region
        params = {
          country_id: this.str[0],
          region: this.input
        };
      }
      if (this.str.length == 2) {
        // add province
        params = {
          country_id: this.str[1],
          region_id: this.str[0],
          province: this.input
        };
      }
      if (this.str.length == 3) {
        // add city
        params = {
          country_id: this.str[2],
          region_id: this.str[1],
          province_id: this.str[0],
          city: this.input
        };
      }
      try {
        await addArea(params);
        this.showUp = false;
      } catch (error) {
        console.log(error);
      } finally {
        this.getArea();
      }
    },
    handleClose() {},
    HandleNodeExpand(node) {
      localStorage.setItem("expandItem", node.value);
    },
    async remove(node, data) {
      try {
        await deleteArea(data.areaId);
      } catch (error) {
        this.$message.error(error.data.error);
      } finally {
        this.getArea();
      }
    },
    HandleGetId(item) {
      if (item.data.value) {
        this.str.push(item.data.value);
      }
      if (item.parent) {
        this.HandleGetId(item.parent);
      }
    },
    async getArea() {
      this.Region = [
        {
          value: "",
          label: "All",
          children: [],
          level: "1"
        }
      ];
      try {
        let x = await getAllArea();
        let temp = x.data.data;
        this.Region[0].children = this.test2(temp);
      } catch (error) {
        this.$message({
          type: "error",
          message: `${error}`
        });
      }
    },
    test2(array) {
      let countryCount = 0;
      let regionCount = 0;
      let provinceCount = 0;
      let areaCount = 0;
      array.forEach(item => {
        Object.keys(item).forEach(key => {
          if (item[key] && item[key].constructor === Array) {
            item["children"] = item[key];
            delete item[key];
            this.test2(item["children"]);
          } else {
            if (key === "country_id") {
              item["value"] = item["country_id"];
              item.level = countryCount++;
            }
            if (key === "region_id") {
              item["value"] = item["region_id"];
              item.level = regionCount++;
            }
            if (key === "province_id") {
              item["value"] = item["province_id"];
              item.level = provinceCount++;
            }
            if (key === "area_id") {
              item["areaId"] = item["area_id"];
              item.level = areaCount++;
            } else {
              if (!item["value"]) {
                item["value"] = item[key];
              }
              if (item[key]) {
                item["label"] = item[key];
              }
            }
            delete item[key];
          }
        });
      });
      return array;
    }
    // renderContent(h, { node, data }) {
    //   if (node.level === 1) {
    //     return (
    //       <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
    //         <span>
    //           <span>{node.label}</span>
    //         </span>
    //       </span>
    //     );
    //   }
    //   if (node.level > 4) {
    //     return (
    //       <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
    //         <span>
    //           <span>{node.label}</span>
    //         </span>
    //         <span>
    //           <el-button
    //             style="font-size: 12px;"
    //             type="text"
    //             on-click={() => this.remove(node, data)}
    //           >
    //             删除
    //           </el-button>
    //         </span>
    //       </span>
    //     );
    //   } else {
    //     return (
    //       <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
    //         <span>
    //           <span>{node.label}</span>
    //         </span>
    //         <span>
    //           <el-button
    //             style="font-size: 12px;"
    //             type="text"
    //             on-click={() => this.append(node, data)}
    //           >
    //             新增
    //           </el-button>
    //           <el-button
    //             style="font-size: 12px;"
    //             type="text"
    //             on-click={() => this.remove(node, data)}
    //           >
    //             删除
    //           </el-button>
    //         </span>
    //       </span>
    //     );
    //   }
    // }
  }
};
</script>
