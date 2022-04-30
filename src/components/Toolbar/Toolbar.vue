<template>
  <div class="toolbar-container">
    <div class="toolbar">
      <el-button size="mini" @click="preview">preview</el-button>
      <el-button size="mini" @click="deleteCur">删除</el-button>
      <el-select
        v-model="curSnapShot"
        placeholder="当前对象"
        size="mini"
        style="margin: 0 10px; width: 100px"
      >
        <el-option
          v-for="item in snapShotOption"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button size="mini" @click="undo">撤销</el-button>
      <el-button size="mini" @click="redo">重做</el-button>
      <el-button size="mini" @click="save">保存</el-button>
      <el-button size="mini" @click="exit">登出</el-button>
    </div>

    <Preview v-model="isShowPreview" @change="handlePreviewChange" />
    <el-dialog title="保存" :visible.sync="saveVisible" width="500px">
      <el-form :model="saveForm" ref="saveForm">
        <el-form-item label="名称" label-width="100px" required>
          <el-input v-model="saveForm.label" style="width: 300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleSave" size="small"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Preview from "@/components/Preview/Preview.vue";
import { mapState } from "vuex";
import indexID from "@/utils/indexId.js";
import { saveWebConfig } from "@/api/http.js";

export default {
  data() {
    return {
      isShowPreview: false,
      curSnapShot: null,
      snapShotOption: [
        { label: "表单", value: "efs" },
        { label: "操作", value: "btn" },
        { label: "表格", value: "table" },
        { label: "弹框", value: "dialog" },
        { label: "弹框组件", value: "dialogComponent" },
      ],
      saveForm: {
        label: "",
      },
      saveVisible: false,
    };
  },
  components: { Preview },
  computed: {
    ...mapState(["curButton", "curComponent", "curTableHeader"]),
    lowCodeData() {
      return this.$store.getters.lowCodeData;
    },
  },
  methods: {
    preview() {
      this.isShowPreview = true;
      this.$store.commit("setEditMode", "preview");
    },
    undo() {
      this.$store.commit("undo", this.curSnapShot);
    },
    redo() {
      this.$store.commit("redo", this.curSnapShot);
    },
    handlePreviewChange() {
      this.$store.commit("setEditMode", "edit");
    },
    exit()  {

    },
    deleteCur() {
      if (this.curButton || this.curComponent || this.curTableHeader) {
        this.$store.commit("deleteCurComponent");
      } else {
        this.$message.info("请选择组件");
      }
    },
    save() {
      this.saveVisible = true;
    },
    async handleSave() {
      let index = indexID();
      console.log(this.lowCodeData);

      this.$refs["saveForm"].validate(async (valid) => {
        if (valid) {
          const { data: res } = await saveWebConfig({
            lowCodeData: this.lowCodeData,
            index,
            label: this.saveForm.label,
          });
          this.saveVisible = false;
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.toolbar {
  padding: 10px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
</style>
