<template>
  <div class="component-list" @dragstart="handleDragStart">
    <div class="form-list">
      <div style="width: 100%; font-size: 14px">表单元素</div>
      <div class="form-control" @click="openFormDialog">表单整体设计</div>
      <div
        v-for="item in formList"
        :key="item.id"
        class="list"
        draggable
        :data-id="item.id"
      >
        <span style="font-size: 13px"> {{ item.name }}</span>
      </div>
    </div>

    <div class="btn-list">
      <div style="width: 100%; font-size: 14px">操作元素</div>
      <div
        v-for="item in btnList"
        :key="item.id"
        class="list"
        draggable
        :data-id="item.id"
      >
        <span style="font-size: 13px"> {{ item.name }}</span>
      </div>
    </div>

    <div class="table-list">
      <div style="width: 100%; font-size: 14px">表格元素</div>
      <div class="table-control" @click="openTableDialog">表格整体设计</div>
      <div
        v-for="item in tableList"
        :key="item.id"
        class="list"
        draggable
        :data-id="item.id"
      >
        <span style="font-size: 13px"> {{ item.name }}</span>
      </div>
    </div>

    <div class="dialog-list">
      <div style="width: 100%; font-size: 14px">表格元素</div>
      <div
        class="dialog-control"
        v-for="item in dialogData"
        :key="item.field"
        @click="openDialog(item.field, item.tag)"
      >
        弹框整体设计--{{ item.field }}
      </div>
      <div
        v-for="item in dialogList"
        :key="item.id"
        class="list"
        draggable
        :data-id="item.id"
      >
        <span style="font-size: 13px"> {{ item.name }}</span>
      </div>
    </div>

    <div class="dialog-container">
      <el-dialog
        title="表单整体设计"
        :visible.sync="dialogFormVisible"
        width="800px"
      >
        <el-form>
          <el-form-item label="是否立即查询">
            <el-switch v-model="copyShouldSubmit"></el-switch>
          </el-form-item>
          <el-form-item label="是否在同一行">
            <el-switch v-model="copyInline"></el-switch>
          </el-form-item>
          <el-form-item label="展示数量">
            <el-input-number v-model="copyExpandNumber"></el-input-number>
          </el-form-item>
          <el-form-item label="size大小">
            <el-select v-model="copySize">
              <el-option
                v-for="item in sizeOtions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  item.value
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询方法"> </el-form-item>
          <codemirror
            ref="cmEditor"
            :value="onSubmit"
            :options="cmOptions"
            @input="onCmCodeChange"
          />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saveForm" type="warning">保存代码</el-button>
          <el-button @click="dialogFormVisible = false" type="primary"
            >关闭</el-button
          >
        </div>
      </el-dialog>

      <el-dialog title="表格整体设计" :visible.sync="dialogTableVisible">
        <el-form>
          <el-form-item label="每页数量" label-width="150px">
            <el-input
              v-model.number="copyPageSize"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="每页可选择数量" label-width="150px">
            <el-input v-model="copyPageSizes" style="width: 500px"></el-input>
          </el-form-item>
          <el-form-item label="分页变化方法" label-width="150px">
          </el-form-item>
          <codemirror
            ref="cmEditor"
            :value="onSizeChange"
            :options="cmOptions"
            @input="onTableCmCodeChange"
            style="width: 90%; margin: 0 auto"
          />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saveTable" type="warning">保存代码</el-button>
          <el-button @click="dialogTableVisible = false" type="primary"
            >关闭</el-button
          >
        </div>
      </el-dialog>

      <el-dialog title="弹框整体设计" :visible.sync="dialogDialogVisible">
        <el-form>
          <el-form-item label="弹框宽度" label-width="150px">
            <el-input
              v-model="copyDialogData.width"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="弹框key值" label-width="150px">
            <el-input
              v-model="copyDialogData.field"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="弹框标题" label-width="150px">
            <el-input
              v-model="copyDialogData.title"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item :label="tag === 'el-dialog-efs' ?  '确定方法' : '尺寸变化方法'" label-width="150px"> </el-form-item>
          <codemirror
            ref="cmDialogEditor"
            :value="tempDialogCode"
            :options="cmOptions"
            @input="onDialogCmCodeChange"
            style="width: 90%; margin: 0 auto"
          />
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="saveDialog" type="warning">保存代码</el-button>
          <el-button @click="dialogDialogVisible = false" type="primary"
            >关闭</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import formList from "@/custom-component/component-list.js";
import btnList from "@/custom-component/editBtn.js";
import tableList from "@/custom-component/table-list.js";
import dialogList from "@/custom-component/dialog-list.js";

import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

// import language js
import "codemirror/mode/javascript/javascript.js";

// import theme style
import "codemirror/theme/base16-dark.css";

// theme css
import "codemirror/theme/monokai.css";
import { mapState } from "vuex";

export default {
  data() {
    return {
      formList,
      btnList,
      tableList,
      dialogList,
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        aligh: "left",
        lineNumbers: true,
        line: true,
      },
      tempCode: "",
      tempTableCode: "",
      dialogFormVisible: false,
      dialogTableVisible: false,
      copyInline: null,
      copyShouldSubmit: null,
      copySize: null,
      copyExpandNumber: null,
      copyPageSize: null,
      copyPageSizes: null,
      sizeOtions: [
        { label: "large", value: "large" },
        { label: "medium", value: "medium" },
        { label: "small", vlaue: "small" },
        { label: "mini", value: "mini" },
      ],
      field: "",
      copyDialogData: {
        field: "",
        width: "",
        title: "",
      },
      tempDialogCode: "",
      dialogDialogVisible: false,
      tag: ""
    };
  },
  computed: {
    ...mapState([
      "shouldSubmit",
      "onSubmit",
      "expandNumber",
      "inline",
      "size",
      "pageSize",
      "pageSizes",
      "pageTotal",
      "onSizeChange",
      "dialogData",
    ]),
  },
  created() {
    this.copyInline = this.inline;
    this.copyShouldSubmit = this.shouldSubmit;
    this.copyExpandNumber = this.expandNumber;
    this.copySize = this.size;
    this.copyPageSize = this.pageSize;
    this.copyPageSizes = this.pageSizes.join(",");
  },
  watch: {
    copyShouldSubmit(val) {
      this.$store.commit("setShouldSubmit", val);
    },
    copyInline(val) {
      this.$store.commit("setInline", val);
    },
    copyExpandNumber(val) {
      this.$store.commit("setExpandNumber", val);
    },
    copySize(val) {
      this.$store.commit("setSize", val);
    },
    copyPageSize(val) {
      this.$store.commit("setPageSize", val);
    },
    copyPageSizes(val) {
      this.$store.commit("setPageSizes", val.split(","));
    },
    copyDialogData: {
      handler(val) {
        this.$store.commit("setDialogDataByField", {
          field: this.field,
          data: val,
        });
      },
      deep: true,
    },
  },
  components: { codemirror },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData("id", e.target.dataset.id);
    },
    onCmCodeChange(newCode) {
      this.tempCode = newCode;
    },
    openFormDialog() {
      this.dialogFormVisible = true;
    },
    openTableDialog() {
      this.dialogTableVisible = true;
    },
    saveForm() {
      if (this.tempCode.length) {
        this.$store.commit("setOnSubmit", this.tempCode);
        this.$message.success("保存成功");
      } else {
        this.$message.info("您没有修改");
      }
    },
    saveTable() {
      if (this.tempTableCode.length) {
        this.$store.commit("setOnSizeChange", this.tempTableCode);
        this.$message.success("保存成功");
      } else {
        this.$message.info("您没有修改");
      }
    },
    onTableCmCodeChange(val) {
      this.tempTableCode = val;
    },
    onDialogCmCodeChange(val) {
      this.tempDialogCode = val;
    },
    openDialog(field, tag) {
      this.field = field;
      this.tag = tag;
      this.copyDialogData.field = field;
      this.dialogData.forEach((item) => {
        if (item.field === field) {
          this.copyDialogData.title = item.propValue.title;
          this.copyDialogData.width = item.propValue.width;
          this.tempDialogCode = item.on.click;
        }
      });
      this.dialogDialogVisible = true;
    },
    saveDialog() {
      if (this.tempDialogCode.length) {
        this.$store.state.dialogData.forEach((item, index) => {
          if (item.field === this.field) {
            this.$store.state.dialogData[index].on.click = this.tempDialogCode;
            this.$message.success("修改成功");
          }
        });
      } else {
        this.$message.info("您还没有修改");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.component-list {
  padding: 10px;
}

.btn-list,
.form-list,
.dialog-list,
.table-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.list {
  width: 40%;
  border: 1px solid #ddd;
  cursor: grab;
  margin: 10px 0;
  text-align: center;
  color: #333;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list:hover {
  cursor: grabbing;
}

.dialog-list,
.table-list,
.btn-list {
  margin-top: 15px;
}

.dialog-control,
.table-control,
.form-control {
  width: 100%;
  margin: 10px 0;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #ddd;
  cursor: pointer;
}
</style>