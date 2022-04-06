<template>
  <div>
      <el-button type="primary" @click="dialogValue.delete = true">打开弹窗</el-button>
    <EasyDialog :schema="schema" :dialogValue="dialogValue" editMode="edit"></EasyDialog>
    <!-- 这是git测试 -->
  </div>
</template>

<script>
import EasyDialog from "@/components/EasyDialog/EasyDialog.vue";
export default {
  data() {
    return {
      schema: [
        {
          id: 1,
          field: "delete",
          tag: "el-dialog-form",
          props: {
            title: "标题",
          },
        },
      ],
      dialogValue: {
          delete: false,
      }
    };
  },
  components: { EasyDialog },
  methods: {},
};
</script>

<style>
</style>