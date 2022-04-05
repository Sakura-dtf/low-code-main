<template>
  <div class="bg" v-if="show">
    <el-button @click="close" class="close">关闭</el-button>
    <div class="canvas-container">
      <div class="canvas" style="width: 1200px; height: 700px; padding: 30px; margin-top: 100px;">
        <el-form-schema
          :schema="efsSchema"
          v-model="copyFormValue"
          editMode="preview"
          ref="previewEfs"
          :is-search-form="true"
          :inline="inline"
          :use-enter-search="false"
          :expand-number="expandNumber"
          :size="size"
          @submit="submit"
        ></el-form-schema>
        <div class="edit-container">
          <EditButton :schema="buttonData" editMode="preview" />
        </div>
        <div class="table-container">
          <EasyTable
            :columns="tableSchema"
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
            editMode="preview"
          ></EasyTable>
        </div>
        <div class="dialog-container">
          <EasyDialog
            :schema="dialogData"
            :dialogVisible="dialogValue"
            editMode="preview"
          ></EasyDialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditButton from "@/components/EditButton/EditButton.vue";
import EasyTable from "@/components/EasyTable/EasyTable.vue";
import EasyDialog from "@/components/EasyDialog/EasyDialog.vue"

export default {
  model: {
    prop: "show",
    event: "change",
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  components: { EditButton, EasyTable, EasyDialog },
  computed: mapState([
    "efsSchema",
    "componentData",
    "formValue",
    "buttonData",
    "expandNumber",
    "shouldSubmit",
    "onSubmit",
    "inline",
    "size",
    "tableJson",
    "tableSchema",
    "pageTotal",
    "pageCurpage",
    "pageSize",
    "pageSizes",
    "dialogValue",
    "dialogData"
  ]),
  data() {
    return {
      copyFormValue: {},
    };
  },
  watch: {
    copyFormValue: {
      handler(val) {
        this.$store.commit("setFormValue", val);
      },
      deep: true,
    },
  },
  methods: {
    close() {
      this.$emit("change", false);
    },
    submit() {
      this.$refs.previewEfs.validate((valid) => {
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
        let submit = new Function(
          "return " + this.onSubmit.toString().trim()
        )();
        submit.call(this, formCtx, tableCtx);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 20px;

  .canvas-container {
    overflow: auto;

    .canvas {
      background: #fff;
      position: relative;
      margin: auto;
    }
  }

  .close {
    position: absolute;
    right: 85px;
    top: 28px;
    z-index: 1000;
  }
}

.edit-container {
  padding: 15px;
}
.table-container {
  padding: 0 15px;
}
</style>