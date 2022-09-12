<template>
  <div class="dialog-container">
    <template v-for="dialog in schema">
      <template v-if="editMode === 'edit'">
        <div class="mode" :key="dialog.field">
          <div
            v-if="dialog.tag === 'el-dialog-efs'"
            class="dialog-context"
            :style="`width: ${dialog.propValue.width}`"
            @drop="handleFormDrop($event, dialog.field)"
            @dragover="handleFormDragOver"
          >
            <div class="dialog-title">{{ dialog.propValue.title }}</div>
            <el-form-schema
              ref="editEfs"
              v-if="flag"
              :schema="dialogEfsSchema[dialog.field]"
              v-model="dialogEfsValue[dialog.field]"
              :editMode="editMode"
              :dialogField="dialog.field"
              :isDialogEfs="true"
            >
            </el-form-schema>
          </div>
          <div
            v-if="dialog.tag === 'el-dialog-table'"
            class="dialog-context"
            :style="`width: ${dialog.propValue.width}`"
            @drop="handleTableDrop($event, dialog.field)"
            @dragover="handleTableDragOver"
          >
            <div class="dialog-title">{{ dialog.propValue.title }}</div>

            <EasyTable
              :columns="dialogTableColums[dialog.field]"
              :tableData="dialogTableJson[dialog.field]"
              :isDialogEfs="true"
              :dialogField="dialog.field"
              :tableOption="{
                border: true,
              }"
              editMode="edit"
              :sizeChange="dialog.on.click"
            ></EasyTable>
          </div>
        </div>
      </template>
      <template v-else>
        <el-dialog
          :title="dialog.propValue.title"
          :key="dialog.field"
          :visible.sync="dialogValue[dialog.field]"
          :width="dialog.propValue.width"
          append-to-body
        >
          <template v-if="dialog.tag === 'el-dialog-efs'">
            <el-form-schema
              ref="editEfs"
              :schema="dialogEfsSchema[dialog.field]"
              v-model="dialogEfsValue[dialog.field]"
              :editMode="editMode"
              :dialogField="dialog.field"
              :isDialogEfs="true"
            >
            </el-form-schema>
          </template>
          <template v-if="dialog.tag === 'el-dialog-table'">
            <EasyTable
              :columns="dialogTableColums[dialog.field]"
              :tableData="dialogTableJson[dialog.field]"
              :tableOption="{
                border: true,
              }"
              editMode="edit"
              :isDialogEfs="true"
              :dialogField="dialog.field"
              :sizeChange="dialog.on.click"
            ></EasyTable>
          </template>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogValue[dialog.field] = false" size="small"
              >取 消</el-button
            >
            <el-button type="primary" @click="handleSubmit(dialog)" size="small"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </template>
    </template>
  </div>
</template>

<script>
import formList from "@/custom-component/component-list";
import tableList from "@/custom-component/table-list";
import EasyTable from "@/components/EasyTable/EasyTable.vue";

import { deepCopy } from "@/utils/utils.js";
import generateID from "@/utils/generateID";
import { mapState } from "vuex";
import mock from "mockjs";

export default {
  inheritAttrs: false,
  props: {
    schema: {
      type: Array,
      default: () => [],
    },
    editMode: {
      type: String,
      default: "preview",
    },
    dialogVisible: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      copyFormValue: {},
      flag: true,
      index: 0,
    };
  },
  components: { EasyTable },
  computed: {
    ...mapState([
      "dialogData",
      "dialogValue",
      "dialogComponentData",
      "dialogEfsSchema",
      "dialogEfsValue",
      "updateFlag",
      "dialogTableJson",
      "dialogTableColums",
    ]),
  },
  watch: {
    dialogTableColums: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
    dialogTableJson: {
      handler(val) {
        console.log(val);
      },
      deep: true,
    },
    copyFormValue: {
      handler(val) {
        this.$store.commit("setFormValue", val);
      },
      deep: true,
    },
    dialogComponentData: {
      handler(val) {
        let fields = Object.keys(val);
        let schemaData = {};
        fields.forEach((field) => {
          console.log(this.dialogData);

          this.dialogData.forEach((item) => {
            if (item.field === field) {
              if (item.id === 23) {
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
                  ];
                  const attrs = ["maxlength", "minLength", "readonly", "rows"];

                  const styles = ["width", "top"];

                  const timeOption = [
                    "start",
                    "end",
                    "step",
                    "selectableRange",
                  ];

                  val[field].forEach((item) => {
                    schema[item.field] = {};

                    schema[item.field].label = item.propValue.label;
                    schema[item.field].tag = item.tag;

                    Object.keys(item).forEach((key) => {
                      if (names.join().indexOf(key) > -1) {
                        if (key === "default") {
                          if (item[key]) {
                            schema[item.field][key] = item[key];
                          } else {
                            // debugger;
                            if (!this.$store.state.dialogEfsValue[field]) {
                              this.$store.state.dialogEfsValue[field] = {};
                            }

                            this.$store.state.dialogEfsValue[field][
                              item.field
                            ] = undefined;
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
                            schema[item.field]["props"][key] =
                              item.propValue[key];
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
                          schema[item.field]["props"][key] =
                            item.propValue[key];
                        } else {
                          schema[item.field]["props"][key] =
                            item.propValue[key];
                        }
                      } else if (attrs.join().indexOf(key) > -1) {
                        schema[item.field]["attrs"][key] = item.propValue[key];
                      } else if (styles.join().indexOf(key) > -1) {
                        schema[item.field]["style"][key] = item.propValue[key];
                      } else if (timeOption.join().indexOf(key) > -1) {
                        if (
                          typeof schema[item.field]["props"][
                            "picker-options"
                          ] !== "object"
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
                            schema[item.field]["props"][key] =
                              item.propValue[key];
                          } else {
                            schema[item.field]["props"]["picker-options"][key] =
                              item.propValue[key];
                          }
                        }
                      }
                    });
                  });
                  schemaData[field] = schema;
                }
              } else if (item.id === 24) {
                let props = [];
                let tableColumns = [];

                val[field].forEach((item) => {
                  props.push({
                    prop: item.propValue.prop,
                    tag: item.tag,
                    component:
                      item.propValue.component && item.propValue.component.tag,
                  });
                  tableColumns.push(item.propValue);
                });

                let Random = mock.Random;
                let res = [];
                for (let i = 0; i < 5; i++) {
                  let obj = {};
                  props.forEach((item, index) => {
                    if (
                      item.tag === "el-table-column" &&
                      item.type !== "section" &&
                      item.type !== "index" &&
                      item.component !== "tags" &&
                      item.component !== "button"
                    ) {
                      obj[item.prop] = Random.string(7);
                    } else if (item.component === "tags") {
                      obj[item.prop] = [
                        Random.string(7),
                        Random.string(7),
                        Random.string(7),
                      ];
                    }
                  });
                  res.push(obj);
                }
                this.$store.commit("setDialogTableJson", { data: res, field });
                this.$store.commit("setDialogTableColums", {
                  data: tableColumns,
                  field,
                });
              }
            }
          });
        });

        this.$store.commit("setDialogEfsSchema", schemaData);

        this.flag = false;

        this.$nextTick(() => {
          this.flag = true;
        });
      },
      deep: true,
    },
  },
  methods: {
    handleFormDrop(e, field) {
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

        if (id === 4) {
          this.$set(this.copyFormValue, component.field, []);
        } else if (id === 6) {
          this.$set(this.copyFormValue, component.field);
        } else {
          this.$set(this.copyFormValue, component.field, null);
        }
        this.$store.commit("addDialogComponent", { component, field });
      }
    },

    handleTableDrop(e, field) {
      e.preventDefault();
      e.stopPropagation();

      const id = Number(e.dataTransfer.getData("id"));

      if (id >= 17 && id <= 22) {
        let component;
        tableList.forEach((item) => {
          if (item.id == id) {
            component = deepCopy(item);
          }
        });
        component.field = generateID();

        component.propValue.label =
          component.propValue.label + String(field) + String(this.index);
        component.propValue.prop =
          component.propValue.prop + String(field) + String(this.index);
        this.index++;

        if (id === 4) {
          this.$set(this.copyFormValue, component.field, []);
        } else if (id === 6) {
          this.$set(this.copyFormValue, component.field);
        } else {
          this.$set(this.copyFormValue, component.field, null);
        }
        this.$store.commit("addDialogComponent", { component, field });
      }
    },

    handleSubmit(dialog) {
      let formCtx = this.dialogEfsValue[dialog.field];

      let fn = new Function("return " + dialog.on.click.trim())();
      fn.call(this, formCtx);
      this.$store.commit("closeDialog", dialog.field);
    },
    handleFormDragOver(e) {
      e.preventDefault();
    },
    handleTableDragOver(e) {
      e.preventDefault();
    },
  },
};
</script>

<style>
.mode {
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  background: #e0e0e0;
  margin: 20px 0;
}
.dialog-context {
  margin: 0 auto;
  min-height: 400px;
  background: #fff;
}
.dialog-title {
  line-height: 24px;
  font-size: 18px;
  color: #303133;
  padding: 20px;
}
</style>
