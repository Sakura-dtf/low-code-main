import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { deepCopy } from "@/utils/utils.js";

export default new Vuex.Store({
  state: {
    editMode: "edit", // 编辑器模式  edit preview
    componentData: [],
    curComponent: null,
    curComponentName: null,

    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,

    efsSchema: {},
    formValue: {}, //  表单的value

    updateFlag: true, //  数据更新的标志

    buttonData: [],
    curButton: null,

    tableData: [],
    tableJson: [],
    tableSchema: null,

    curTableHearderLabel: null,
    curTableHeader: null,

    labelIndex: 1,

    shouldSubmit: true,
    expandNumber: 5,
    inline: true,
    size: "small",
    onSubmit: `function submit(formCtx, tableCtx) {
  // formCtx 表单元素的参数对象 有三个变量
  // componentData 表单元素的数据
  // formValue 表单元素的值
  // cb 回调函数，接受三个参数 请求路径，请求参数，请求方法
  // tableCtx 表格元素的参数对象，有两个变量
  // pageIndex 请求的页数
  // pageSize 请求的每页数量
  // cb 回调函数，接受两个参数 表格数据，总数
  
  console.log(formCtx, tableCtx);
  setTimeout(()=> {
    tableCtx.cb([],100);
  }, 2000)
}`,

    selectRow: [],
    pageSize: 5,
    pageSizes: [5, 10, 15, 20],
    pageTotal: null,
    pageCurpage: 1,
    onSizeChange: `function submit(Size) {
      console.log(Size);
    }`,

    dialogData: [],
    dialogValue: {},

    dialogComponentData: {},
    dialogEfsSchema: {},
    dialogEfsValue: {},

    dialogTableColums: {},
    dialogTableJson: {},

    curIsDialog: false,
    curDialogField: "",

    snapShotIndex: {
      efs: -1,
      btn: -1,
      table: -1,
      dialog: -1,
      dialogComponent: -1,
    },
    snapShotData: {
      efs: [],
      btn: [],
      table: [],
      dialog: [],
      dialogComponent: [],
    },
  },
  mutations: {
    setDialogValue(state, data) {
      state.dialogValue = data;
    },

    addDialogData(state, data) {
      state.dialogData.push(data);
      this.commit("recordSnapShot", "dialog");
    },

    setDialogDataByField(state, { field, data }) {
      for (let i = 0; i < state.dialogData.length; i++) {
        if (state.dialogData[i].field === field) {
          state.dialogData[i].propValue.title = data.title;
          state.dialogData[i].propValue.width = data.width;
          state.dialogData[i].field = data.field;
        }
      }
    },

    setEditMode(state, mode) {
      state.editMode = mode;
    },

    setSelectRow(state, val) {
      state.selectRow = val;
    },

    setOnSubmit(state, val) {
      state.onSubmit = val;
    },

    setOnSizeChange(state, val) {
      state.onSizeChange = val;
    },

    setPageTotal(state, val) {
      state.pageTotal = val;
    },

    setPageSizes(state, val) {
      state.pageSizes = val;
    },

    setPageSize(state, val) {
      state.pageSize = val;
    },

    setTableJson(state, val) {
      state.tableJson = val;
    },

    setTableSchema(state, val) {
      state.tableSchema = val;
    },

    setShouldSubmit(state, val) {
      state.shouldSubmit = val;
    },

    setSize(state, size) {
      state.size = size;
    },

    setExpandNumber(state, val) {
      state.expandNumber = val;
    },

    setInline(state, val) {
      state.inline = val;
    },

    setUpdataFlag(state, flag) {
      state.updateFlag = flag;
    },

    setClickComponentStatus(state, status) {
      state.isClickComponent = status;
    },

    setCurComponent(state, { component, name, isDialogEfs, dialogField }) {
      state.curComponentName = null;
      state.curComponent = null;
      state.curTableHeader = null;
      state.curTableHearderLabel = null;
      state.curDialogTable = null;
      state.curButton = null;

      state.curComponent = component;
      state.curComponentName = name;
      state.curIsDialog = isDialogEfs;
      state.curDialogField = dialogField;
    },

    setCurBtnComponent(state, component) {
      state.curComponentName = null;
      state.curComponent = null;
      state.curTableHeader = null;
      state.curTableHearderLabel = null;
      state.curDialogTable = null;
      state.curButton = null;

      state.curButton = component;
    },

    setCurTable(state, { label, isDialogEfs, dialogField }) {
      state.curButton = null;
      state.curComponentName = null;
      state.curComponent = null;
      state.curDialogTable = null;
      state.curTableHeader = null;
      state.curTableHearderLabel = null;

      state.curIsDialog = isDialogEfs;
      state.curDialogField = dialogField;
      if (label === null) {
        state.curTableHeader = null;
        state.curTableHearderLabel = null;
      } else {
        if (isDialogEfs) {
          console.log(state.dialogComponentData);
          state.dialogComponentData[dialogField].forEach((item) => {
            if (item.propValue.label === label) {
              state.curTableHeader = item;
            }
          });
          state.curTableHearderLabel = label;
        } else {
          state.tableData.forEach((item) => {
            if (item.propValue.label === label) {
              state.curTableHeader = item;
            }
          });
          state.curTableHearderLabel = label;
        }
      }
    },

    addComponent(state, { component, index }) {
      if (index !== undefined) {
        state.componentData.splice(index, 0, component);
      } else {
        state.componentData.push(component);
        this.commit("recordSnapShot", "efs");
      }
    },

    addBtnComponent(state, { component, index }) {
      if (index !== undefined) {
        state.buttonData.splice(index, 0, component);
      } else {
        state.buttonData.push(component);
        this.commit("recordSnapShot", "btn");
      }
    },

    addTableComponent(state, { component, index }) {
      if (index !== undefined) {
        state.buttonData.splice(index, 0, component);
      } else {
        component.propValue.label =
          component.propValue.label + state.labelIndex.toString();
        component.propValue.prop =
          component.propValue.prop + state.labelIndex.toString();
        state.tableData.push(component);
        state.labelIndex++;
        //debugger;
        this.commit("recordSnapShot", "table");
      }
    },

    addDialogComponent(state, { component, field }) {
      if (!state.dialogComponentData[field]) {
        Vue.set(state.dialogComponentData, field, []);
      }

      state.dialogComponentData[field].push(component);
      this.commit("recordSnapShot", "dialogComponent");
    },

    deleteComponent(state, index) {
      if (index === undefined) {
        index = state.curComponentIndex;
      }

      if (index == state.curComponentIndex) {
        state.curComponentIndex = null;
        state.curComponent = null;
      }

      state.componentData.splice(index, 1);
    },
    setFormValue(state, formValue) {
      state.formValue = formValue;
    },
    setEfsSchema(state, schema) {
      state.efsSchema = schema;
    },
    setDialogEfsSchema(state, schema) {
      state.dialogEfsSchema = schema;
    },

    setDialogTableColums(state, { data, field }) {
      Vue.set(state.dialogTableColums, field, []);
      state.dialogTableColums[field].push(...data);
    },
    setDialogTableJson(state, { data, field }) {
      Vue.set(state.dialogTableJson, field, []);

      state.dialogTableJson[field].push(...data);
    },
    setDialogEfsValue(state, value) {
      state.dialogEfsValue = value;
    },
    openDialog(state, { field, value }) {
      if (value !== undefined) {
        if (type === "form") {
          state.dialogEfsValue[field] = value;
        } else if (type === "table") {
          state.dialogTableJson[field] = value;
        }
      }
      state.dialogValue[field] = true;
    },
    closeDialog(state, field) {
      state.dialogValue[field] = false;
    },
    deleteCurComponent(state) {
      if (state.curButton) {
        for (let i = 0; i < state.buttonData.length; i++) {
          if (state.curButton.field === state.buttonData[i].field) {
            state.buttonData.splice(i, 1);
            state.curButton = null;
            this.commit("recordSnapShot", "btn");
            break;
          }
        }
      } else if (state.curComponent) {
        console.log(state.curComponent, state.componentData, state.curIsDialog);

        if (!state.curIsDialog) {
          for (let i = 0; i < state.componentData.length; i++) {
            if (state.curComponent.field === state.componentData[i].field) {
              state.componentData.splice(i, 1);
              state.curComponent = null;
              state.curComponentName = null;
              this.commit("recordSnapShot", "efs");
              break;
            }
          }
        } else {
          for (
            let j = 0;
            j < state.dialogComponentData[state.curDialogField].length;
            j++
          ) {
            if (
              state.curComponentName ===
              state.dialogComponentData[state.curDialogField][j].field
            ) {
              state.curTableHeader = null;
              state.curTableHearderLabel = null;
              state.dialogComponentData[state.curDialogField].splice(j, 1);
              this.commit("recordSnapShot", "dialogComponent");
              break;
            }
          }
        }
      } else if (state.curTableHeader) {
        if (!state.curIsDialog) {
          for (let j = 0; j < state.tableData.length; j++) {
            if (
              state.curTableHearderLabel === state.tableData[j].propValue.label
            ) {
              state.tableJson = [];
              state.curTableHeader = null;
              state.curTableHearderLabel = null;
              state.tableData.splice(j, 1);
              this.commit("recordSnapShot", "table");
              break;
            }
          }
        } else {
          if (state.curDialogField) {
            for (
              let j = 0;
              j < state.dialogComponentData[state.curDialogField].length;
              j++
            ) {
              if (
                state.curTableHearderLabel ===
                state.dialogComponentData[state.curDialogField][j].propValue
                  .label
              ) {
                state.dialogTableJson[state.curDialogField] = [];
                state.curTableHeader = null;
                state.curTableHearderLabel = null;
                state.dialogComponentData[state.curDialogField].splice(j, 1);
                this.commit("recordSnapShot", "dialogComponent");
                break;
              }
            }
          }
        }
      }
    },

    recordSnapShot(state, type) {
      // 添加新的快照

      if (type === "efs") {
        state.snapShotData.efs[++state.snapShotIndex.efs] = deepCopy(
          state.componentData
        );

        if (state.snapShotIndex.efs < state.snapShotData.efs.length - 1) {
          state.snapShotData.efs = state.snapShotData.efs.splice(
            0,
            state.snapShotIndex.efs + 1
          );
        }
      } else if (type === "btn") {
        state.snapShotData.btn[++state.snapShotIndex.btn] = deepCopy(
          state.buttonData
        );

        if (state.snapShotIndex.btn < state.snapShotData.btn.length - 1) {
          state.snapShotData.btn = state.snapShotData.btn.splice(
            0,
            state.snapShotIndex.btn + 1
          );
        }
      } else if (type === "table") {
        state.snapShotData.table[++state.snapShotIndex.table] = deepCopy(
          state.tableData
        );

        if (state.snapShotIndex.table < state.snapShotData.table.length - 1) {
          state.snapShotData.table = state.snapShotData.table.splice(
            0,
            state.snapShotIndex.table + 1
          );
        }
      } else if (type === "dialog") {
        state.snapShotData.dialog[++state.snapShotIndex.dialog] = deepCopy(
          state.dialogData
        );

        if (state.snapShotIndex.dialog < state.snapShotData.dialog.length - 1) {
          state.snapShotData.dialog = state.snapShotData.dialog.splice(
            0,
            state.snapShotIndex.dialog + 1
          );
        }
      } else if (type === "dialogComponent") {
        state.snapShotData.dialogComponent[
          ++state.snapShotIndex.dialogComponent
        ] = deepCopy(state.dialogComponentData);

        if (
          state.snapShotIndex.dialogComponent <
          state.snapShotData.dialogComponent.length - 1
        ) {
          state.snapShotData.dialogComponent =
            state.snapShotData.dialogComponent.splice(
              0,
              state.snapShotIndex.dialogComponent + 1
            );
        }
      }
    },
    redo(state, type) {
      if (type === "efs") {
        if (state.snapShotIndex.efs < state.snapShotData.efs.length - 1) {
          state.snapShotIndex.efs++;
          state.componentData = deepCopy(
            state.snapShotData.efs[state.snapShotIndex.efs]
          );
        }
      } else if (type === "btn") {
        if (state.snapShotIndex.btn < state.snapShotData.btn.length - 1) {
          state.snapShotIndex.btn++;
          state.buttonData = deepCopy(
            state.snapShotData.btn[state.snapShotIndex.btn]
          );
        }
      } else if (type === "table") {
        if (state.snapShotIndex.table < state.snapShotData.table.length - 1) {
          state.snapShotIndex.table++;
          state.tableData = deepCopy(
            state.snapShotData.table[state.snapShotIndex.table]
          );
        }
      } else if (type === "dialog") {
        if (state.snapShotIndex.dialog < state.snapShotData.dialog.length - 1) {
          state.snapShotIndex.dialog++;
          state.dialogData = deepCopy(
            state.snapShotData.dialog[state.snapShotIndex.dialog]
          );
        }
      } else if (type === "dialogComponent") {
        if (
          state.snapShotIndex.dialogComponent <
          state.snapShotData.dialogComponent.length - 1
        ) {
          state.snapShotIndex.dialogComponent++;
          state.dialogComponentData = deepCopy(
            state.snapShotData.dialogComponent[
              state.snapShotIndex.dialogComponent
            ]
          );
        }
      }
    },
    undo(state, type) {
      let temp, needClear;
      if (type === "efs") {
        if (state.snapShotIndex.efs >= 0) {
          state.snapShotIndex.efs--;

          temp = deepCopy(
            state.snapShotData.efs[state.snapShotIndex.efs] || []
          );

          if (state.curComponent) {
            needClear = !temp.find((item) => {
              item.field === state.curComponent.field;
            });
            if (needClear) {
              this.commit("setCurComponent", { component: null, index: null });
            }
          }
          state.componentData = temp;
        }
      } else if (type === "btn") {
        if (state.snapShotIndex.btn >= 0) {
          state.snapShotIndex.btn--;

          temp = deepCopy(
            state.snapShotData.btn[state.snapShotIndex.btn] || []
          );

          if (state.curButton) {
            needClear = !temp.find((item) => {
              item.field === state.curButton.field;
            });
            if (needClear) {
              this.commit("setCurBtnComponent", null);
            }
          }
          state.buttonData = temp;
        }
      } else if (type === "table") {
        if (state.snapShotIndex.table >= 0) {
          state.snapShotIndex.table--;

          temp = deepCopy(
            state.snapShotData.table[state.snapShotIndex.table] || []
          );

          if (state.curTableHeader) {
            needClear = !temp.find((item) => {
              item.label === state.curTableHearderLabel;
            });
            if (needClear) {
              this.commit("setCurTable", { label: null });
            }
          }
          state.tableJson = [];
          state.tableData = temp;
        }
      } else if (type === "dialog") {
        state.snapShotIndex.dialog--;
        temp = deepCopy(
          state.snapShotData.dialog[state.snapShotIndex.dialog] || []
        );
        state.dialogData = temp;
      } else if (type === "dialogComponent") {
        if (state.snapShotIndex.dialogComponent >= 0) {
          state.snapShotIndex.dialogComponent--;

          if (state.snapShotIndex.dialogComponent < 0) {
            temp = {};
            Object.keys(state.dialogComponentData).forEach((item) => {
              temp[item] = [];
            });
          } else {
            temp = deepCopy(
              state.snapShotData.dialogComponent[
                state.snapShotIndex.dialogComponent
              ]
            );
          }
          state.dialogComponentData = temp;

          this.commit("setCurComponent", {
            component: null,
            index: null,
          });
          this.commit("setCurBtnComponent", null);
          this.commit("setCurTable", { label: null });
        }
      }
    },
  },
  getters: {
    lowCodeData: (state) => {
      return {
        componentData: JSON.stringify(state.componentData),
        efsSchema: JSON.stringify(state.efsSchema),
        formValue: JSON.stringify(state.formValue),
        efsConfig: JSON.stringify({
          shouldSubmit: state.shouldSubmit,
          expandNumber: state.expandNumber,
          inline: state.inline,
          size: state.size,
          onSubmit: state.onSubmit,
        }),
        buttonData: JSON.stringify(state.buttonData),
        tableData: JSON.stringify(state.tableData),
        tableSchema: JSON.stringify(state.tableSchema),
        pageOption: JSON.stringify({
          pageSize: state.pageSize,
          pageSizes: state.pageSizes,
          pageTotal: state.pageTotal,
          pageCurpage: state.pageCurpage,
          onSizeChange: state.onSizeChange,
        }),
        dialogValue: JSON.stringify(state.dialogValue),
        dialogData: JSON.stringify(state.dialogData),
        dialogEfsSchema: JSON.stringify(state.dialogEfsSchema),
        dialogEfsValue: JSON.stringify(state.dialogEfsValue),
        dialogTableColums: JSON.stringify(state.dialogTableColums),
      };
    },
  },
  actions: {},
  modules: {},
});
