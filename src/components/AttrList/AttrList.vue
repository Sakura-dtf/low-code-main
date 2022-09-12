<template>
  <div class="attr-list">
    <el-form>
      <template v-if="curComponent">
        <el-form-item label="field">
          <el-input v-model="curComponent.field"></el-input>
        </el-form-item>

        <el-form-item label="labelWidth">
          <el-input v-model="curComponent.labelWidth"></el-input>
        </el-form-item>

        <el-form-item label="inline">
          <el-switch v-model="curComponent.inline"></el-switch>
        </el-form-item>

        <el-form-item label="default" v-if="curComponent.default !== undefined">
          <template v-if="Array.isArray(curComponent.default)"> </template>
          <el-switch
            v-else-if="typeof curComponent.default === 'boolean'"
            v-model="curComponent.default"
            @change="handleSwitch"
          ></el-switch>
          <el-input-number
            v-else-if="typeof curComponent.default === 'number'"
            v-model="curComponent.default"
            :precision="curComponent.propValue.precision"
            style="width: 220px"
          ></el-input-number>
          <el-input v-else v-model="curComponent.default"></el-input>
        </el-form-item>

        <template v-if="curComponent.required !== undefined">
          <el-form-item key="required" label="required">
            <!-- 方式一  利用开关控制 -->
            <el-switch
              v-model="requiredValue"
              :disabled="requiredExpress"
            ></el-switch>
          </el-form-item>
          <el-form-item key="required_input" label="required_表达式写法">
            <el-input
              v-model="curComponent.required"
              @focus="handleFocus"
              @blur="handleBlur"
            ></el-input>
          </el-form-item>
          <el-form-item label="rules">
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 20px"
              @click="dialogVisible = true"
              >添加 / 修改 rules</el-button
            >
          </el-form-item>
        </template>

        <template v-if="curComponent.items">
          <el-form-item label="items">
            <el-select v-model="curComponent.itemsValue">
              <el-option
                v-for="item in curComponent.items"
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
          <el-form-item>
            <el-button
              type="primary"
              @click="addItems"
              size="mini"
              style="width: 100px"
              >添加</el-button
            >
            <el-button
              type="success"
              @click="editDictionary"
              size="mini"
              style="width: 100px"
              >字典设置</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="info"
              @click="removeItems"
              size="mini"
              style="width: 100px"
              >删除</el-button
            >
            <el-button
              type="danger"
              @click="addApi"
              size="mini"
              style="width: 100px"
              >API设置</el-button
            >
          </el-form-item>
        </template>

        <template v-for="item in propValue">
          <template v-if="item.name === 'disabled'">
            <el-form-item :key="item.name" :label="item.name">
              <el-switch
                v-model="disabledValue"
                :disabled="disabledExpress"
              ></el-switch>
            </el-form-item>
            <el-form-item
              :key="`${item.name}_input`"
              :label="`${item.name}_表达式写法`"
            >
              <el-input
                v-model="curComponent.propValue[item.name]"
                @focus="handleFocus"
                @blur="handleBlur"
              ></el-input>
            </el-form-item>
          </template>

          <template v-else-if="item.name === 'size'">
            <el-form-item :key="item.name" :label="item.name">
              <el-select v-model="curComponent.propValue[item.name]">
                <el-option
                  v-for="item in sizeOtions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>

          <template v-else-if="item.name === 'options'">
            <el-form-item :key="item.name" :label="item.name">
              <el-cascader
                :options="curComponent.propValue[item.name]"
                v-model="curComponent.optionsValue"
              ></el-cascader>
            </el-form-item>
            <el-form-item :key="`button_${item.name}`">
              <el-button
                type="primary"
                @click="addItems"
                size="mini"
                style="width: 100px"
                >修改Options</el-button
              >
              <el-button
                type="primary"
                @click="addItems"
                size="mini"
                style="width: 100px"
                >API 设置</el-button
              >
            </el-form-item>
          </template>

          <el-form-item
            v-else-if="curComponent.id === 7 && item.name === 'type'"
            :key="item.name"
            :label="item.name"
          >
            <el-select v-model="curComponent.propValue[item.name]">
              <el-option
                v-for="item in timeTypeOption"
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

          <el-form-item
            v-else-if="item.name === 'start' || item.name === 'end'"
            :key="item.name"
            :label="item.name"
          >
            <el-time-select
              v-model="curComponent.propValue[item.name]"
            ></el-time-select>
          </el-form-item>

          <el-form-item
            v-else-if="
              item.name === 'clearable' ||
              item.name === 'readonly' ||
              item.name === 'show-password' ||
              item.name === 'border' ||
              item.name === 'show-word-limit' ||
              item.name === 'step-strictly' ||
              item.name === 'show-all-levels' ||
              item.name === 'multiple' ||
              item.name === 'collapse-tags' ||
              item.name === 'checkStrictly'
            "
            :key="item.name"
            :label="item.name"
          >
            <el-switch v-model="curComponent.propValue[item.name]"></el-switch>
          </el-form-item>

          <el-form-item
            v-else-if="item.name === 'is-range'"
            :key="item.name"
            :label="item.name"
          >
            <el-switch
              v-model="curComponent.propValue[item.name]"
              disabled
            ></el-switch>
          </el-form-item>

          <el-form-item
            v-else-if="
              item.name === 'rows' ||
              item.name === 'max' ||
              item.name === 'min' ||
              item.name === 'precision' ||
              (item.name === 'step' && curComponent.id !== 5)
            "
            :key="item.name"
            :label="item.name"
          >
            <el-input-number
              size="medium"
              v-model="curComponent.propValue[item.name]"
              style="width: 220px"
            ></el-input-number>
          </el-form-item>

          <el-form-item v-else :key="item.name" :label="item.name">
            <el-input v-model="curComponent.propValue[item.name]"></el-input>
          </el-form-item>
        </template>
      </template>
      <template v-if="curButton">
        <template v-for="item in btnPropValue">
          <template v-if="item.name === 'size'">
            <el-form-item :key="`btn_${item.name}`" :label="item.name">
              <el-select v-model="curButton.propValue[item.name]">
                <el-option
                  v-for="item in sizeOtions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-else-if="item.name === 'type'">
            <el-form-item :key="`btn_${item.name}`" :label="item.name">
              <el-select v-model="curButton.propValue[item.name]">
                <el-option
                  v-for="item in typeOption"
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
          </template>
          <el-form-item
            v-else-if="
              item.name === 'plain' ||
              item.name === 'round' ||
              item.name === 'circle'
            "
            :key="`btn_${item.name}`"
            :label="item.name"
          >
            <el-switch v-model="curButton.propValue[item.name]"></el-switch>
          </el-form-item>

          <template v-else-if="item.name === 'disabled'">
            <el-form-item :key="`btn_${item.name}`" :label="item.name">
              <el-switch
                v-model="disabledBtnValue"
                :disabled="disabledBtnExpress"
              ></el-switch>
            </el-form-item>
            <el-form-item
              :key="`${item.name}_input`"
              :label="`${item.name}_表达式写法`"
            >
              <el-input
                v-model="curButton.propValue[item.name]"
                @focus="handleFocus"
                @blur="handleBlurBtn"
              ></el-input>
            </el-form-item>
          </template>

          <el-form-item v-else :key="`btn_${item.name}`" :label="item.name">
            <el-input v-model="curButton.propValue[item.name]"></el-input>
          </el-form-item>
        </template>
      </template>
      <template v-if="curTableHeader">
        <template v-for="(item, index) in tablePropValue">
          <el-form-item
            v-if="item.name === 'sortable'"
            :key="`table_${item.name}`"
            :label="item.name"
          >
            <el-switch
              v-model="curTableHeader.propValue[item.name]"
            ></el-switch>
          </el-form-item>
          <el-form-item
            v-else-if="item.name === 'align' || item.name === 'header-align'"
            :key="`table_${item.name}`"
            :label="item.name"
          >
            <el-select v-model="curTableHeader.propValue[item.name]">
              <el-option
                v-for="item in alignOption"
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

          <el-form-item
            v-else-if="item.name === 'fixed'"
            :key="`table_${item.name}`"
            :label="item.name"
          >
            <el-select v-model="curTableHeader.propValue[item.name]">
              <el-option
                v-for="item in fixedOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{
                  String(item.value)
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <template v-else-if="item.name === 'component'">
            <div :key="index"></div>
            <template>
              <el-form-item
                label="按钮文字"
                :key="`btn_label_${index}`"
                v-if="curTableHeader.propValue.component.label !== undefined"
              >
                <el-input
                  v-model="curTableHeader.propValue.component.label"
                ></el-input>
              </el-form-item>
            </template>
            <template
              v-for="(prop, index) in Object.keys(
                curTableHeader.propValue.component.props
              )"
            >
              <el-form-item :label="prop" :key="index" v-if="prop === 'size'">
                <el-select
                  v-model="curTableHeader.propValue.component.props[prop]"
                >
                  <el-option
                    v-for="item in sizeOtions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.value }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                :label="prop"
                :key="index"
                v-else-if="prop === 'type'"
              >
                <el-select
                  v-model="curTableHeader.propValue.component.props[prop]"
                >
                  <el-option
                    v-for="item in typeOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.value }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                :label="prop"
                :key="index"
                v-else-if="prop === 'effect'"
              >
                <el-select
                  v-model="curTableHeader.propValue.component.props[prop]"
                >
                  <el-option
                    v-for="item in effectOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.value }}</span
                    >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item
                :label="prop"
                :key="index"
                v-else-if="
                  prop === 'colors' ||
                  prop === 'plain' ||
                  prop === 'round' ||
                  prop === 'circle' ||
                  prop === 'closable'
                "
              >
                <el-switch
                  v-model="curTableHeader.propValue.component.props[prop]"
                ></el-switch>
              </el-form-item>
              <el-form-item :label="prop" :key="index" v-else>
                <el-input
                  v-model="curTableHeader.propValue.component.props[prop]"
                ></el-input>
              </el-form-item>
            </template>
          </template>

          <el-form-item
            v-else-if="item.name === 'type'"
            :key="`table_${item.name}`"
            :label="item.name"
          >
            <el-input
              v-model="curTableHeader.propValue[item.name]"
              disabled
            ></el-input>
          </el-form-item>

          <el-form-item v-else :key="`table_${item.name}`" :label="item.name">
            <el-input v-model="curTableHeader.propValue[item.name]"></el-input>
          </el-form-item>
        </template>
      </template>
    </el-form>
    <div class="dialog-container">
      <el-dialog title="提示" :visible.sync="dialogVisible" width="700px">
        <codemirror
          ref="cmEditor"
          :value="tempCode"
          :options="cmOptions"
          @input="onCmCodeChange"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="save">保存</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >关闭</el-button
          >
        </span>
      </el-dialog>

      <el-dialog title="字典设计" :visible.sync="dictDialogVisible">
        <div v-if="type === 'dict'">
          <el-form ref="dictForm" :model="dictForm" label-width="80px">
            <el-form-item label="value">
              <el-select v-model="dictForm.value">
                <el-option
                  v-for="item in dictList"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="type === 'delete' || type === 'add'">
          <codemirror
            ref="dictEditor"
            :value="tempDictCode"
            :options="cmOptions"
            @input="onDictCodeChange"
          />
        </div>
        <div v-if="type === 'url'">
          <el-form ref="dictForm" :model="dictForm" label-width="80px">
            <el-form-item label="组件filed">
              <el-input
                v-model="dictForm.field"
                placeholder="传入参数 用空格隔开"
              ></el-input>
            </el-form-item>
            <el-form-item label="url">
              <el-input v-model="dictForm.url"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveDict">保存</el-button>
          <el-button type="primary" @click="dictDialogVisible = false"
            >关闭</el-button
          >
        </span>
      </el-dialog>
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

import { getDictKey } from "@/api/http.js";


export default {
  data() {
    return {
      dictDialogVisible: false,
      dictList: [],
      type: "dict",
      sizeOtions: [
        { label: "large", value: "large" },
        { label: "medium", value: "medium" },
        { label: "small", vlaue: "small" },
        { label: "mini", value: "mini" },
      ],
      timeTypeOption: [
        { label: "日", value: "date" },
        { label: "年", value: "year" },
        { label: "月", value: "month" },
        { label: "周", value: "week" },
        { label: "多个日期", value: "dates" },
        { label: "日期范围", value: "daterange" },
        { label: "月份范围", value: "monthrange" },
        { label: "日期时间选择器", value: "datetime" },
        { label: "日期时间范围选择器", value: "datetimerange" },
      ],
      typeOption: [
        { label: "默认", value: "" },
        { label: "主要", value: "primary" },
        { label: "成功", value: "success" },
        { label: "信息", value: "info" },
        { label: "警告", value: "warning" },
        { label: "危险", value: "danger" },
      ],
      alignOption: [
        { label: "靠左", value: "left" },
        { label: "居中", value: "center" },
        { label: "靠右", value: "right" },
      ],
      effectOption: [
        { label: "dark", value: "dark" },
        { label: "light", value: "light" },
        { label: "plain", value: "plain" },
      ],
      fixedOption: [
        { label: "固定左侧", value: "left" },
        { label: "固定右侧", value: "right" },
        { label: "不固定", value: false },
      ],
      cmOptions: {
        tabSize: 4,
        mode: "text/javascript",
        theme: "base16-dark",
        aligh: "left",
        lineNumbers: true,
        line: true,
      },
      tempCode: `function valid() {
        let rules = [];
        return rules;
      }
      `,
      dialogVisible: false,
      dictForm: {
        value: "",
        field: "",
        url: "",
      },
      itemsCode: "",
    };
  },
  components: { codemirror },
  computed: {
    ...mapState([
      "componentData",
      "curComponent",
      "formValue",
      "curButton",
      "buttonData",
      "curTableHeader",
    ]),
    propValue() {
      const res = [];
      if (this.curComponent) {
        Object.keys(this.curComponent.propValue).forEach((item) => {
          res.push({
            name: item,
            value: this.curComponent.propValue[item],
          });
        });
      }
      return res;
    },
    tempDictCode() {
      return JSON.stringify(this.curComponent.items);
    },
    btnPropValue() {
      const res = [];
      if (this.curButton) {
        Object.keys(this.curButton.propValue).forEach((item) => {
          res.push({
            name: item,
            value: this.curButton.propValue[item],
          });
        });
      }
      return res;
    },
    tablePropValue() {
      const res = [];
      if (this.curTableHeader) {
        Object.keys(this.curTableHeader.propValue).forEach((item) => {
          res.push({
            name: item,
            value: this.curTableHeader.propValue[item],
          });
        });
      }
      return res;
    },
    disabledBtnExpress() {
      if (
        String(this.curButton.propValue.disabled) === "true" ||
        String(this.curButton.propValue.disabled) === "false" ||
        this.curButton.propValue.disabled === ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    disabledExpress() {
      if (
        String(this.curComponent.propValue.disabled) === "true" ||
        String(this.curComponent.propValue.disabled) === "false" ||
        this.curComponent.propValue.disabled === ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    requiredExpress() {
      if (
        String(this.curComponent.required) === "true" ||
        String(this.curComponent.required) === "false" ||
        this.curComponent.required === ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    disabledBtnValue: {
      get() {
        if (String(this.curButton.propValue.disabled) === "true") {
          return true;
        } else if (String(this.curButton.propValue.disabled) === "false") {
          return false;
        } else {
          if (this.curButton.propValue.disabled.includes("$model")) {
            return this.evalTemplateString(this.curButton.propValue.disabled);
          }
          return false;
        }
      },
      set(val) {
        this.curButton.propValue.disabled = String(val);
      },
    },
    disabledValue: {
      get() {
        if (String(this.curComponent.propValue.disabled) === "true") {
          return true;
        } else if (String(this.curComponent.propValue.disabled) === "false") {
          return false;
        } else {
          if (this.curComponent.propValue.disabled.includes("$model")) {
            return this.evalTemplateString(
              this.curComponent.propValue.disabled
            );
          }
          return false;
        }
      },
      set(val) {
        this.curComponent.propValue.disabled = String(val);
      },
    },
    requiredValue: {
      get() {
        if (String(this.curComponent.required) === "true") {
          return true;
        } else if (String(this.curComponent.required) === "false") {
          return false;
        } else {
          if (this.curComponent.required.includes("$model")) {
            return this.evalTemplateString(this.curComponent.required);
          }
          return false;
        }
      },
      set(val) {
        this.curComponent.required = String(val);
      },
    },
    cur() {
      return this.curComponent;
    },
  },
  async created() {
    await this.getAllDictKey();
  },
  watch: { 
    curComponent: {
      handler(val) {
        console.log(val)
        if (val.url) {
          this.dictForm.url = val.url;
        }
        if (val.watchField) {
          this.dictForm.field = val.watchField;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
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
    onDictCodeChange(newCOde) {
      this.itemsCode = newCOde;
    },
    saveDict() {
      if (this.type === "dict") {
        console.log(this.curComponent, this.dictList, this.dictForm.value);
        let items = [];
        this.dictList.forEach((item) => {
          if (item.value === this.dictForm.value) {
            item.children.forEach((i) => {
              items.push({ label: i.label, value: i.value });
            });
          }
        });
        this.curComponent.items = items;
        this.dictDialogVisible = false;
      } else if (this.type === "add" || this.type === "delete") {
        this.curComponent.items = JSON.parse(this.itemsCode);
        this.dictDialogVisible = false;
      } else if (this.type === "url") {
        this.curComponent.watchField = this.dictForm.field;
        this.curComponent.url = this.dictForm.url;
        this.dictDialogVisible = false;
      }
    },
    async getAllDictKey() {
      const res = await getDictKey();
      console.log(res, "res");
      if (res.errno === 0) {
        this.dictList = res.data.data;
      }
    },
    handleFocus() {
      this.$store.commit("setUpdataFlag", false);
    },
    handleBlurBtn() {},
    handleBlur() {
      this.$store.commit("setUpdataFlag", true);
      this.curComponent.field = this.curComponent.field.padStart(
        this.curComponent.field.length + 1,
        " "
      );
      this.curComponent.field = this.curComponent.field.trim();
    },
    handleSwitch() {
      this.curComponent.field = this.curComponent.field.padStart(
        this.curComponent.field.length + 1,
        " "
      );
      this.curComponent.field = this.curComponent.field.trim();
    },
    addItems() {
      this.type = "add";
      this.dictDialogVisible = true;
    },
    editDictionary() {
      this.type = "dict";
      this.dictDialogVisible = true;
    },
    removeItems() {
      this.type = "add";
      this.dictDialogVisible = true;
    },
    addApi() {
      this.type = "url";
      this.dictDialogVisible = true;
    },
    onCmCodeChange(newCode) {
      this.tempCode = newCode;
    },
    save() {
      let fnc = new Function("return " + this.tempCode)();
      console.log(fnc());
      this.curComponent.rules = fnc();
    },
  },
};
</script>

<style lang="scss">
.el-tabs__content {
  padding-left: 15px;
}
</style>
