<template>
  <div class="editBtn-content">
    <div
      class="button-wrap"
      style="padding: 5px"
      :class="{
        'click-active':
          editMode === 'edit'
            ? curButton
              ? curButton.field === btn.field
                ? true
                : false
              : false
            : false,
      }"
      v-for="(btn, index) in schema"
      :key="index"
      @click="handlerWrap($event, btn.field)"
    >
      <el-button
        :size="btn.propValue.size"
        :type="btn.propValue.type"
        :plain="btn.propValue.plain"
        :round="btn.propValue.round"
        :circle="btn.propValue.circle"
        :disabled="handleDisabled(btn.field)"
        @click="handleClick($event, btn.field)"
      >
        {{ btn.propValue.label }}
        <i :class="`${btn.propValue.icon} el-icon--right`"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    schema: {
      type: Array,
      require: true,
    },
    editMode: {
      type: String,
      default: "preview",
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["curButton", "buttonData", "selectRow", "dialogValue"]),
  },
  methods: {
    handleClick(e, field) {
      console.log(1111111);
      //  debugger;
      let copyComponent = {};

      this.buttonData.forEach((component) => {
        if (component.field === field) {
          copyComponent = component;
        }
      });

      // let ctx = {
      //   buttonData: this.buttonData,
      //   curButton: copyComponent,
      // };

      let tableCtx = {
        selectRow: this.selectRow,
      }

      let dialogCtx = {
        dialogValue: this.dialogValue,
        cb: (field, value) => {
          this.$store.commit("openDialog", { field, value });
        }
      }

      if (copyComponent.on) {
        console.log(copyComponent.on.click);
        let func = new Function("return " + copyComponent.on.click)();
        func.call(this, tableCtx, dialogCtx);
      }
    },
    handlerWrap(e, field) {
      if (this.editMode === "edit") {
        e.stopPropagation();
        this.$store.commit("setClickComponentStatus", true);
        let copyComponent = {};

        this.buttonData.forEach((component) => {
          if (component.field === field) {
            copyComponent = component;
          }
        });

        this.$store.commit("setCurBtnComponent", copyComponent);
      }
    },
    handleDisabled(field) {
      let component = {};
      this.buttonData.forEach((item) => {
        if ((item.field === field)) {
          component = item;
        }
      });

      if (String(component.propValue.disabled) === "true") {
        return true;
      } else if (String(component.propValue.disabled) === "false") {
        return false;
      } else {
        if (component.propValue.disabled.includes("$model")) {
          return this.evalTemplateString(component.propValue.disabled);
        }
        return false;
      }
    },
    evalTemplateString(str) {
      let res = str;
      if (str.includes("$model")) {
        res = str.replace(/(\$model)/g, "this.formValue");
        try {
          if (String(eval(res)) === "true") {
            return true;
          } else if (String(eval(res)) === "false") {
            return false;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
.editBtn-content {
  padding: 0 10px;
  display: flex;
}
</style>