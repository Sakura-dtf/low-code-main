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
      <el-button size="mini" @click="open">打开</el-button>
      <el-button size="mini" @click="exit">登出</el-button>
    </div>

    <Preview v-model="isShowPreview" @change="handlePreviewChange" />
    <el-dialog title="保存" :visible.sync="saveVisible" width="500px">
      <div v-if="type === 'add'">
        <el-form :model="saveForm" ref="saveForm">
          <el-form-item label="名称" label-width="100px" required>
            <el-input v-model="saveForm.label" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="type === 'open'">
        <el-form :model="openForm" ref="openForm">
          <el-form-item label="名称" label-width="100px" required>
            <el-select v-model="openForm.id" placeholder="请选择页面">
              <el-option
                v-for="item in webConfigList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
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
import { saveWebConfig, getConfig, getConfigByUser, updateWebConfigById } from "@/api/http.js";

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
      openForm: {
        id: "",
      },
      saveVisible: false,
      webConfigList: [],
      type: "add",
    };
  },
  components: { Preview },
  computed: {
    ...mapState([
      "curButton",
      "curComponent",
      "curTableHeader",
      "curLowCodeId",
    ]),
    lowCodeData() {
      return this.$store.getters.lowCodeData;
    },
  },
  created() {
    this.getConfigList();
  },
  methods: {
    async getConfigList() {
      const res = await getConfigByUser();
      console.log(res);
      if (res.errno === 0) {
        this.webConfigList = res.data.data;
      }
    },
    open() {
      this.type = "open";
      this.saveVisible = true;
    },
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
    exit() {},
    deleteCur() {
      if (this.curButton || this.curComponent || this.curTableHeader) {
        this.$store.commit("deleteCurComponent");
      } else {
        this.$message.info("请选择组件");
      }
    },
    async save() {
      if (this.curLowCodeId) {
        const res =await updateWebConfigById({
          id: this.curLowCodeId,
          lowCodeData: this.lowCodeData
        })
        if(res.errno === 0) {
          this.$message.success("保存成功")
          console.log("保存成功");
        }
      } else {
        this.type = "add";
        this.saveVisible = true;
      }
    },
    async handleSave() {
      if (this.type === "add") {
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
            this.$message.success("创建成功");
          } else {
            return false;
          }
        });
      } else if (this.type === "open") {
        this.$refs["openForm"].validate(async (valid) => {
          if (valid) {
            const { data: res } = await getConfig({
              id: this.openForm.id,
            });
            this.saveVisible = false;
            this.$store.commit("setLowCode", res.data);
            this.$store.commit("setLowCodeId", this.openForm.id);
            this.$message.success("打开成功");
          } else {
            return false;
          }
        });
      }
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
