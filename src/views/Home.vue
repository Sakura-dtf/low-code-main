<template>
  <div class="home">
    <Toolbar />

    <main>
      <section class="left">
        <component-list />
      </section>
      <section class="center" @click="deselectCurComponent">
        <div class="content">
          <Editor />
        </div>
      </section>
      <section class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <attr-list v-if="curComponent || curButton || curTableHeader" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
          <el-tab-pane label="事件" name="event">
            <event-list v-if="curComponent || curButton || curTableHeader" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
        </el-tabs>
      </section>
    </main>
  </div>
</template>

<script>
import Toolbar from "@/components/Toolbar/Toolbar.vue";
import ComponentList from "@/components/ComponentList/ComponentList.vue";
import Editor from "@/components/Editor/Editor.vue";
import AttrList from "@/components/AttrList/AttrList.vue";
import EventList from "@/components/EventList/EventList.vue";

import { mapState } from "vuex";

export default {
  data() {
    return {
      activeName: "attr",
    };
  },
  components: {
    Toolbar,
    ComponentList,
    Editor,
    AttrList,
    EventList,
  },
  computed: mapState(["isClickComponent", "curComponent", "curButton", "curTableHeader"]),
  methods: {
    deselectCurComponent() {
      this.$store.commit("setCurComponent", { component: null, index: null });
      this.$store.commit("setCurBtnComponent", null);
      this.$store.commit("setCurTable", { label: null });
    },
  },
};
</script>

<style lang="scss">
.el-tabs__nav-scroll {
  overflow: hidden;
  padding-left: 20px;
}

.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>