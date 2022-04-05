<template>
  <div class="event-list">
    <div class="div-events">
      <div class="form-event" v-if="curComponent">
        <el-button @click="openDialog" size="small"
          >添加 / 修改 事件</el-button
        >
        <div>
          <el-tag v-for="event in Object.keys(curComponent.on)" :key="event">
            {{ event }}
          </el-tag>
        </div>
      </div>
      <div class="btn-event" v-if="curButton">
        <el-button @click="openDialog" size="small"
          >添加 / 修改 事件</el-button
        >
        <div>
          <el-tag v-for="event in Object.keys(curButton.on)" :key="event">
            {{ event }}
          </el-tag>
        </div>
      </div>

      <div class="table-event" v-if="curTableHeader">
        <el-button @click="openDialog" size="small" :disabled="!curTableHeader.propValue.component"
          >添加 / 修改 事件</el-button
        >
        <div>
          <template v-if="curTableHeader.propValue.component">
            <el-tag v-for="event in Object.keys(curTableHeader.propValue.component.on)" :key="event">
              {{ event }}
            </el-tag>
          </template>
        </div>
      </div>

      <el-drawer
        title="添加 / 修改 事件"
        :visible.sync="drawer"
        direction="ltr"
        size="50%"
      >
        <div class="tabs-container" v-if="curComponent || curButton || curTableHeader">
          <el-tabs v-model="eventActiveName">
            <el-tab-pane
              v-for="item in Object.keys(vmodel.on)"
              :key="item"
              :label="item"
              :name="item"
              style="padding: 0 20px"
            >
            </el-tab-pane>
          </el-tabs>
          <div class="codemirror-container">
            <codemirror
              ref="cmEditor"
              :value="codeValue"
              :options="cmOptions"
              @ready="onCmReady"
              @focus="onCmFocus"
              @input="onCmCodeChange"
            />
          </div>

          <div class="btn-container">
            <el-button type="success" size="small" @click="save" :disabled="eventActiveName === '0'"
              >保存</el-button
            >
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

// import language js
import "codemirror/mode/javascript/javascript.js";

// import theme style
import "codemirror/theme/base16-dark.css";

// theme css
import "codemirror/theme/monokai.css";

export default {
  data() {
    return {
      drawer: false,
      eventActiveName: "",
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        aligh: "left",
        lineNumbers: true,
        line: true,
      },
      copyOn: {},
      tempCode: "",
    };
  },
  components: {
    codemirror,
  },
  methods: {
    removeEvent() {},
    onCmReady(cm) {},
    onCmFocus(cm) {},
    onCmCodeChange(newCode) {
      this.tempCode = newCode;
    },
    save() {
      if (this.curComponent) {
        this.curComponent.on[this.eventActiveName] = this.tempCode;
      } else if (this.curButton) {
        this.curButton.on[this.eventActiveName] = this.tempCode;
      } else if(this.curTableHeader) {
        if(this.curTableHeader.propValue.component) {
          this.curTableHeader.propValue.component.on[this.eventActiveName] = this.tempCode;
        } else {

        }
      }
      this.$message.success("保存成功");
    },
    openDialog() {
      this.drawer = true;
      this.tempCode = "";
      this.eventActiveName = "";
    }
  },
  computed: {
    ...mapState([
      "componentData",
      "curComponent",
      "formValue",
      "curButton",
      "curTableHeader",
    ]),
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
    codeValue() {
      if(this.eventActiveName.length) {
        return this.vmodel.on[this.eventActiveName]
      } else {
        return ""
      }
    },
    vmodel() {
      if (this.curButton) {
        return this.curButton;
      } else if (this.curComponent) {
        return this.curComponent;
      } else if (this.curTableHeader) {
        if(this.curTableHeader.propValue.component) {
          return this.curTableHeader.propValue.component;
        } else {
          return {
            on: {},
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.event-list {
  .div-events {
    text-align: center;
    padding: 0 20px;

    .el-button {
      display: inline-block;
      margin-bottom: 10px;
    }

    .el-tag {
      display: block;
      width: 50%;
      margin: auto;
      margin-bottom: 10px;
    }
  }
}

.vue-codemirror {
  text-align: left;
}

.codemirror-container {
  width: 97%;
  margin: 0 auto;
}
.btn-container {
  width: 24%;
  margin-top: 20px;
}
</style>