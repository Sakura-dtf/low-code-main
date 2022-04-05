<template>
  <div class="table-container">
    <el-table
      :editMode="editMode"
      :isDialogEfs="isDialogEfs"
      :dialogField="dialogField"
      v-bind="{ ...tableOption }"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <template v-for="(item, index) in columns">
        <el-table-column
          v-if="
            item.component &&
            !(item.component.tag === 'button' && editMode === 'preview')
          "
          :key="item.prop"
          :index="index + 1"
          v-bind="{ ...item }"
        >
          <template slot-scope="scope">
            <el-tag
              v-if="item.component.tag === 'tag'"
              v-bind="{ ...item.component.props }"
              @close="
                    handlerClose($event, item.component.on.close, scope.row[item.prop])
                  "
              >{{ scope.row[item.prop] }}</el-tag
            >

            <template v-else-if="item.component.tag === 'tags'">
              <template v-if="Array.isArray(scope.row[item.prop])">
                <el-tag
                  v-for="(val, index) in scope.row[item.prop]"
                  :key="index"
                  style="margin: 0 5px"
                  v-bind="{ ...item.component.props }"
                  @close="
                    handlerClose($event, item.component.on.close, val)
                  "
                  :type="
                    item.component.props.colors
                      ? chooseColor(index)
                      : item.component.props.color || 'primary'
                  "
                >
                  {{ val }}</el-tag
                >
              </template>
            </template>

            <template v-else-if="item.component.tag === 'button'">
              <el-button
                v-bind="{ ...item.component.props, icon: null }"
                @click="handerClick($event, scope, item.component.on.click)"
                >{{ item.component.label }}
                <i :class="`${item.component.props.icon}  el-icon--right`"> </i
              ></el-button>
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="!item.component"
          :key="item.prop"
          v-bind="{ ...item }"
        >
        </el-table-column>
      </template>
      <el-table-column label="操作" v-if="editMode === 'preview'">
        <template slot-scope="scope">
          <template v-for="(btn, index) in btns">
            <el-button
              :key="index"
              v-bind="{ ...btn.component.props, icon: null }"
              @click="handerClick($event, scope, btn.component.on.click)"
              >{{ btn.component.label }}
              <i :class="`${btn.component.props.icon}  el-icon--right`"> </i
            ></el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagin-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageOption.curPage"
        :page-sizes="pageOption.sizes"
        :page-size="pageOption.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageOption.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  inheritAttrs: false,
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    tableOption: {
      type: Object,
      default: () => {},
    },
    pageOption: {
      type: Object,
      default: () => {
        return {
          size: 5,
          curPage: 1,
          sizes: [5, 10, 15, 20],
          total: 0,
        };
      },
    },
    sizeChange: String,
    editMode: {
      type: String,
      default: "preview",
    },
    isDialogEfs: {
      type: Boolean,
      default: false,
    },
    dialogField: String,
  },
  data() {
    return {
      multipleSelection: [],
      label: {},
      btns: [],
    };
  },
  computed: {
    ...mapState(["componentData", "tableSchema", "curTableHearderLabel"]),
    a() {
      return this.$root.$store.state.curTableHearderLabel;
    },
  },
  watch: {
    curTableHearderLabel(val) {
      console.log(val);
    },
    "$root.$store.state.curTableHearderLabel"(val) {
      console.log(val);
    },
    tableSchema: {
      handler(val) {
        this.btns = [];
        if (Array.isArray(val)) {
          val.forEach((item) => {
            if (item.component) {
              if (item.component.tag === "button") {
                this.btns.push(item);
              }
            }
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    handleSelectionChange(val, row) {
      console.log(val, row);
      this.multipleSelection = val;
      this.$store.commit("setSelectRow", val);
      console.log(this.multipleSelection);
    },
    chooseColor(index) {
      if (index % 5 === 0) {
        return "primary";
      } else if (index % 5 === 1) {
        return "warning";
      } else if (index % 5 === 2) {
        return "success";
      } else if (index % 5 === 3) {
        return "danger";
      } else {
        return "info";
      }
    },
    handerClick(e, scope, fn) {
      e.stopPropagation();
      let fnc = new Function("return " + fn.toString().trim())();
      fnc.call(this, scope, this.componentData);
    },
    handlerClose(e, fn, val) {
      e.stopPropagation();
      let fnc = new Function("return " + fn.toString().trim())();
      fnc.call(this, val);
    },
    handleCurrentChange(val) {},
    handleSizeChange(val) {
      if(this.editMode === "edit") {
        this.$store.commit("setPageSize", val)
      } else {
        let formCtx = {
          componentData: this.componentData,
          formValue: this.formValue,
          cb: async (url, params, type) => {
            let data = await this.$http.post(url, params);
            this.$store.commit("setTableJson", data.data);
          },
        };

        let tableCtx = {
          cb: (val, total) => {
            this.$store.commit("setTableJson", val);
            this.$store.commit("setPageTotal", total);
          },
          pageSize: this.pageSize,
          pageIndex: this.pageCurpage,
        };

        

      }
      
    },
  },
};
</script>

<style scoped>
.pagin-container {
  margin-top: 10px;
}
</style>