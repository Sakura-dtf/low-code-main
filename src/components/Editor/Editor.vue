<template>
  <div class="editor" id="editor">
    <div class="form-editor">
      <div class="info" v-if="componentData.length <= 0">表单区域</div>
      <div
        class="form-container"
        @drop="handleFormDrop"
        @dragover="handleFormDragOver"
      >
        <el-form-schema
          ref="editEfs"
          v-if="refresh"
          :schema="efsSchema"
          v-model="copyFormValue"
          editMode="edit"
          :is-search-form="true"
          :inline="inline"
          :use-enter-search="false"
          :expand-number="expandNumber"
          :size="size"
          @submit="submit"
        >
        </el-form-schema>
      </div>
      <div class="editBtn-editor">
        <div class="info" v-if="buttonData.length <= 0">操作区域</div>
        <div
          class="editBtn-container"
          @drop="handleBtnDrop"
          @dragover="handleBtnDragOver"
        >
          <EditButton :schema="buttonData" editMode="edit" />
        </div>
      </div>

      <div class="table-editor">
        <div class="info" v-if="tableData.length <= 0">表格区域</div>
        <div
          class="table-container"
          @drop="handleTableDrop"
          @dragover="handleTableDragOver"
        >
          <EasyTable
            :columns="tableColumns"
            :tableData="tableJson"
            :tableOption="{
              border: true,
            }"
            :pageOption="{
              size: pageSize,
              curPage: pageCurpage,
              sizes: pageSizes,
              total: pageTotal,
            }"
            editMode="edit"
            :sizeChange="onSizeChange"
          ></EasyTable>
        </div>
      </div>

      <div class="dialog-editor">
        <div class="info" v-if="dialogData.length <= 0">弹框区域</div>
        <div
          class="dialog-container"
          @drop="handleDialogDrop"
          @dragover="handleDialogDragOver"
        >
          <EasyDialog
            :schema="dialogData"
            :dialogVisible="dialogValue"
            editMode="edit"
          ></EasyDialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formList from "@/custom-component/component-list";
import btnList from "@/custom-component/editBtn.js";
import tableList from "@/custom-component/table-list";
import dialogList from "@/custom-component/dialog-list";

import { deepCopy } from "@/utils/utils.js";
import generateID from "@/utils/generateID";
import { mapState } from "vuex";
import EditButton from "@/components/EditButton/EditButton.vue";
import EasyTable from "@/components/EasyTable/EasyTable.vue";
import EasyDialog from "@/components/EasyDialog/EasyDialog.vue";
import mock from "mockjs";

export default {
  data() {
    return {
      copyFormValue: {},
      refresh: true,
      tableColumns: [],
      copyDialogValue: {},
      copyDialogFormValue: {},
    };
  },
  components: {
    EditButton,
    EasyTable,
    EasyDialog,
  },
  computed: {
    ...mapState([
      "componentData",
      "efsSchema",
      "formValue",
      "updateFlag",
      "buttonData",
      "curButton",
      "tableData",
      "expandNumber",
      "shouldSubmit",
      "onSubmit",
      "onSizeChange",
      "inline",
      "size",
      "tableJson",
      "tableSchema",
      "pageCurpage",
      "pageSize",
      "pageSizes",
      "pageTotal",
      "dialogData",
      "dialogValue",
      "dialogEfsSchema",
    ]),
  },
  watch: {
    componentData: {
      handler(formList) {
        setTimeout(() => {
          if (this.updateFlag) {
            const schema = {};
            const names = [
              "items",
              "rules",
              "required",
              "vif",
              "inline",
              "default",
              "labelWidth",
              "watchField",
              "url"
            ];
            const props = [
              "disabled",
              "size",
              "max",
              "min",
              "clearable",
              "type",
              "placeholder",
              "show-password",
              "labelWidth",
              "border",
              "is-range",
              "format",
              "show-word-limit",
              "step-strictly",
              "precision",
              "max",
              "min",
              "show-all-levels",
              "multiple",
              "collapse-tags",
              "checkStrictly",
              "options",
              "auth",
            ];
            const attrs = ["maxlength", "minLength", "readonly", "rows"];

            const styles = ["width", "top"];

            const timeOption = ["start", "end", "step", "selectableRange"];

            formList.forEach((item) => {
              schema[item.field] = {};

              if (typeof schema[item.field]["on"] !== "object") {
                schema[item.field]["on"] = {};
              }

              Object.keys(item.on).forEach((event) => {
                schema[item.field].on[event] = new Function(
                  "return " + item.on[event].trimStart()
                )();
              });

              schema[item.field].label = item.propValue.label;
              schema[item.field].tag = item.tag;

              Object.keys(item).forEach((key) => {
                if (names.join().indexOf(key) > -1) {
                  if (key === "default") {
                    if (item[key]) {
                      schema[item.field][key] = item[key];
                    } else {
                      this.$store.state.formValue[item.field] = undefined;
                    }
                  } else {
                    schema[item.field][key] = item[key];
                  }
                }
              });

              const keys = Object.keys(item.propValue);

              if (typeof schema[item.field]["props"] !== "object") {
                schema[item.field]["props"] = {};
              }

              if (typeof schema[item.field]["attrs"] !== "object") {
                schema[item.field]["attrs"] = {};
              }

              if (typeof schema[item.field]["style"] !== "object") {
                schema[item.field]["style"] = {};
              }

              let tiemFlag = false;

              keys.forEach((key) => {
                if (props.join().indexOf(key) > -1) {
                  if (key === "disabled") {
                    if (item.propValue[key] === "true") {
                      schema[item.field]["props"][key] = true;
                    } else if (item.propValue[key] === "false") {
                      schema[item.field]["props"][key] = false;
                    } else {
                      schema[item.field]["props"][key] = item.propValue[key];
                    }
                  } else if (key === "multiple") {
                    if (item.propValue[key]) {
                      this.formValue[item.field] = [];
                      this.componentData.forEach((component) => {
                        if (component.field === item.field) {
                          component.default = [];
                        }
                      });
                      schema[item.field].default = [];
                    }
                    schema[item.field]["props"][key] = item.propValue[key];
                  } else {
                    schema[item.field]["props"][key] = item.propValue[key];
                  }
                } else if (attrs.join().indexOf(key) > -1) {
                  schema[item.field]["attrs"][key] = item.propValue[key];
                } else if (styles.join().indexOf(key) > -1) {
                  schema[item.field]["style"][key] = item.propValue[key];
                } else if (timeOption.join().indexOf(key) > -1) {
                  if (
                    typeof schema[item.field]["props"]["picker-options"] !==
                    "object"
                  ) {
                    schema[item.field]["props"]["picker-options"] = {};
                  }
                  if (key === "selectableRange") {
                    tiemFlag = true;
                    let obj = {};
                    obj[key] = item.propValue[key];
                    schema[item.field]["props"]["picker-options"] = obj;
                  } else if (!tiemFlag) {
                    if (key === "step" && item.id !== 5) {
                      schema[item.field]["props"][key] = item.propValue[key];
                    } else {
                      schema[item.field]["props"]["picker-options"][key] =
                        item.propValue[key];
                    }
                  }
                }
              });
            });

            this.$store.commit("setEfsSchema", schema);

            this.refresh = false;

            this.$nextTick(() => {
              this.refresh = true;
            });
          }
        });
      },
      deep: true,
    },
    tableJson(val) {
      console.log(val);
    },
    tableData: {
      handler(tableData) {
        let props = [];
        this.tableColumns = [];
        tableData.forEach((item) => {
          props.push({
            prop: item.propValue.prop,
            tag: item.tag,
            component: item.propValue.component && item.propValue.component.tag,
          });
          this.tableColumns.push(item.propValue);
        });

        let Random = mock.Random;
        let res = [];
        for (let i = 0; i < this.pageSize; i++) {
          let obj = {};
          props.forEach((item) => {
            if (
              item.tag === "el-table-column" &&
              item.type !== "section" &&
              item.type !== "index" &&
              item.component !== "tags" &&
              item.component !== "button"
            ) {
              obj[item.prop] = Random.string(7);
            } else if (item.component === "tags") {
              console.log(1);
              obj[item.prop] = [
                Random.string(7),
                Random.string(7),
                Random.string(7),
              ];
            }
          });
          res.push(obj);
        }

        if (props.length) {
          this.$store.commit("setTableJson", res);
        }
        this.$store.commit("setTableSchema", this.tableColumns);
      },
      deep: true,
    },
    pageSize(val) {
      let props = [];
      this.tableData.forEach((item) => {
        props.push({
          prop: item.propValue.prop,
          tag: item.tag,
          component: item.propValue.component && item.propValue.component.tag,
        });
      });

      let Random = mock.Random;
      let res = [];
      for (let i = 0; i < val; i++) {
        let obj = {};
        props.forEach((item) => {
          if (
            item.tag === "el-table-column" &&
            item.type !== "section" &&
            item.type !== "index" &&
            item.component !== "tags" &&
            item.component !== "button"
          ) {
            obj[item.prop] = Random.string(7);
          } else if (item.component === "tags") {
            console.log(1);
            obj[item.prop] = [
              Random.string(7),
              Random.string(7),
              Random.string(7),
            ];
          }
        });
        res.push(obj);
      }
      if (props.length) {
        this.$store.commit("setTableJson", res);
      }
    },
    formValue: {
      handler(val) {
        if (typeof val === "object") {
          this.copyFormValue = val;
        }
      },
      deep: true,
    },
    copyFormValue: {
      handler(val) {
        //debugger;
        this.$store.commit("setFormValue", val);
      },
      deep: true,
    },
    dialogData: {
      handler(val) {
        this.copyDialogValue = {};
        val.forEach((item) => {
          console.log(item);
          this.$set(this.copyDialogValue, item.field, false);
        });
        console.log(this.copyDialogValue);
        this.$store.commit("setDialogValue", this.copyDialogValue);
      },
      deep: true,
    },
    dialogEfsSchema: {
      handler(val) {
        this.copyDialogFormValue = {};
        Object.keys(val).forEach((key) => {
          this.$set(this.copyDialogFormValue, key, {});
          Object.keys(val[key]).forEach((item) => {
            if (val[key][item].id === 4) {
              this.$set(this.copyDialogFormValue[key], item, []);
            } else if (val[key][item].id === 6) {
              this.$set(this.copyDialogFormValue[key], item);
            } else {
              this.$set(this.copyDialogFormValue[key], item, null);
            }
          });
        });
        this.$store.commit("setDialogEfsValue", this.copyDialogFormValue);
      },
    },
  },
  methods: {
    handleFormDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const id = Number(e.dataTransfer.getData("id"));
      if (id <= 15) {
        let component;
        formList.forEach((item) => {
          if (item.id == id) {
            component = deepCopy(item);
          }
        });
        component.field = generateID();
        // this.$store.commit("setFormValue", component.field);
        if (id === 4) {
          this.$set(this.copyFormValue, component.field, []);
        } else if (id === 6) {
          this.$set(this.copyFormValue, component.field);
        } else {
          this.$set(this.copyFormValue, component.field, null);
        }

        this.$store.commit("addComponent", { component });
      }
    },

    handleFormDragOver(e) {
      e.preventDefault();
    },
    handleBtnDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const id = Number(e.dataTransfer.getData("id"));  
      //获取 e.dataTransfer的数据
      if (id > 15 && id < 17) {
        let component;
        btnList.forEach((item) => {
          if (item.id == id) {
            component = deepCopy(item);
          }
        });

        component.field = generateID();

        this.$store.commit("addBtnComponent", { component }); // 将数据保存到vuex中
      }
    },
    handleBtnDragOver(e) {
      e.preventDefault();
    },
    handleTableDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      const id = Number(e.dataTransfer.getData("id"));

      if (id >= 17 && id < 23) {
        let component;
        tableList.forEach((item) => {
          if (item.id == id) {
            component = deepCopy(item);
          }
        });

        component.field = generateID();

        this.$store.commit("addTableComponent", { component });
      }
    },
    handleTableDragOver(e) {
      e.preventDefault();
    },
    handleDialogDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const id = Number(e.dataTransfer.getData("id"));

      if (id >= 23) {
        let component;
        dialogList.forEach((item) => {
          if (item.id == id) {
            component = deepCopy(item);
          }
        });

        component.field = generateID();

        this.$store.commit("addDialogData", component);
      }
    },
    handleDialogDragOver(e) {
      e.preventDefault();
    },
    submit() {
      this.$refs.efs.validate((valid) => {
        let formCtx = {};
      });
    },
    reset() {
      this.$refs.efs.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.component-container {
  position: absolute;
}

.form-editor {
  position: relative;
  .info {
    font-size: 15px;
    color: gray;
    position: absolute;
    z-index: 10;
    margin: 10px;
    opacity: 0.5;
  }
  .form-container {
    position: relative;
    background: #fff;
    margin: auto;
    min-height: 200px;
    padding: 10px 0;
  }
}

.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}

.editBtn-editor {
  position: relative;
}
.editBtn-container {
  background: #fff;
  margin: 10px auto;
  min-height: 100px;
  padding: 10px 0;
}

.table-container {
  background: #fff;
  min-height: 400px;
}

.dialog-container {
  background: #fff;
  min-height: 300px;
  margin-top: 10px;
}
.table-editor {
  position: relative;
}
</style>