<template>
  <div>
    <p>{{ model }}</p>
    <el-form-schema
      ref="el-form-schema"
      :schema="schema"
      v-model="model"
      label-width="100px"
    >
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form-schema>
    <div class="margin-top: 100px">
      <ve-table :columns="columns" :table-data="tableData" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        cascader: {
          tag: "el-cascader",
          label: "级联选择器",
          props: {
            options: [
              {
                value: "zhinan",
                label: "指南",
                children: [
                  {
                    value: "shejiyuanze",
                    label: "设计原则",
                    children: [
                      {
                        value: "yizhi",
                        label: "一致",
                      },
                      {
                        value: "fankui",
                        label: "反馈",
                      },
                    ],
                  },
                  {
                    value: "daohang",
                    label: "导航",
                    children: [
                      {
                        value: "cexiangdaohang",
                        label: "侧向导航",
                      },
                      {
                        value: "dingbudaohang",
                        label: "顶部导航",
                      },
                    ],
                  },
                ],
              },
              {
                value: "zujian",
                label: "组件",
                children: [
                  {
                    value: "basic",
                    label: "Basic",
                    children: [
                      {
                        value: "layout",
                        label: "Layout 布局",
                      },
                      {
                        value: "color",
                        label: "Color 色彩",
                      },
                    ],
                  },
                  {
                    value: "form",
                    label: "Form",
                    children: [
                      {
                        value: "radio",
                        label: "Radio 单选框",
                      },
                      {
                        value: "checkbox",
                        label: "Checkbox 多选框",
                      },
                    ],
                  },
                  {
                    value: "data",
                    label: "Data",
                    children: [
                      {
                        value: "table",
                        label: "Table 表格",
                      },
                      {
                        value: "tag",
                        label: "Tag 标签",
                      },
                    ],
                  },
                  {
                    value: "notice",
                    label: "Notice",
                    children: [
                      {
                        value: "alert",
                        label: "Alert 警告",
                      },
                      {
                        value: "loading",
                        label: "Loading 加载",
                      },
                    ],
                  },
                  {
                    value: "navigation",
                    label: "Navigation",
                    children: [
                      {
                        value: "menu",
                        label: "NavMenu 导航菜单",
                      },
                      {
                        value: "tabs",
                        label: "Tabs 标签页",
                      },
                    ],
                  },
                  {
                    value: "others",
                    label: "Others",
                    children: [
                      {
                        value: "dialog",
                        label: "Dialog 对话框",
                      },
                      {
                        value: "tooltip",
                        label: "Tooltip 文字提示",
                      },
                    ],
                  },
                ],
              },
            ],
            clearable: true,
          },
        },
        input: {
          tag: "el-input",
          label: "输入框",
          default: "1",
          labelWidth: "200px",
          props: {
            componentWidth: "2400px",
          },
        },
        inputNumber: {
          tag: "el-input-number",
          default: 2,
        },
        switch: {
          tag: "el-switch",
          label: "开关",
          default: false,
        },
        elTimePicker: {
          tag: "el-time-picker",
          default: ["", ""],
          props: {
            "is-range": true,
          },
        },
        radio1: {
          tag: "el-radio",
          label: "单选框",
          items: [
            {
              label: "黄金糕",
              value: "1",
            },
            {
              label: "臭豆腐",
              value: "2",
            },
          ],
        },
        select2: {
          tag: "el-select",
          label: "下拉框1",
          default: "1",
          inline: true,
          required: true,
          props: {
            items: [{ label: "黄金糕", value: "1" }],
          },
        },
        select: {
          tag: "el-select",
          label: "下拉框",
          slot: { after: " " },
          inline: true,
          required: true,
          items: [],
        },
        radio: {
          tag: "el-radio",
          label: "单选框",

          slot: { after: " " },
          required: true,
          items: [],
        },
        checkbox: {
          tag: "el-checkbox",
          label: "复选框",

          required: true,
          items: [],
        },
        obj: {
          tag: "object",
          label: "对象测试-obj",

          components: {
            input: {
              tag: "el-input",
              required: true,
              props: { disabled: "!$model.select" },
              slot: { prepend: "测试" },
            },
            date: {
              tag: "el-date-picker",
              props: { disabled: "!$item.input", type: "date" },
              required: true,
            },
            radio: {
              tag: "el-radio",
              required: true,
              props: { disabled: "!$item.date" },
              items: this.arrayData(2),
            },
          },
        },
        arr: {
          tag: "array",
          inline: true,
          label: "数组",
          required: true,
          components: {
            input: { tag: "el-input", required: true },
            select: {
              tag: "el-select",
              slot: { after: " " },
              inline: true,
              required: true,
              items: [],
            },
          },
        },
      },
      model: {},
      columns: [
          { field: "name", key: "a", title: "Name", align: "center" },
          { field: "date", key: "b", title: "Date", align: "left" },
          { field: "hobby", key: "c", title: "Hobby", align: "right" },
          { field: "address", key: "d", title: "Address", align: "left" }
        ],
        tableData: [
          {
            name: "John",
            date:"1900-05-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shanghai",
          },
          {
            name: "Dickerson",
            date:"1910-06-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Beijing",
          },
          {
            name: "Larsen",
            date:"2000-07-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Chongqing",
          },
          {
            name: "Geneva",
            date:"2010-08-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Xiamen",
          },
          {
            name: "Jami",
            date:"2020-09-20",
            hobby: "coding and coding repeat",
            address: "No.1 Century Avenue, Shenzhen",
          },
        ],
    };
  },
  methods: {
    arrayData(num) {
      return new Array(num).fill({}).map((item, index) => ({
        label: `测试-${index + 1}`,
        value: index + 1,
      }));
    },
    submit() {
      this.$refs["el-form-schema"].validate((valid) => {
        alert(valid);
      });
    },
    reset() {
      this.$refs["el-form-schema"].resetFields();
    },
  },
  mounted() {
    // 组件 items 赋值
    setTimeout(() => {
      this.schema.select.items = this.arrayData(1);
      this.schema.radio.items = this.arrayData(2);
      this.schema.checkbox.items = this.arrayData(3);
      this.schema.arr.components.select.items = this.arrayData(10);
    }, 500);
    // model 数据赋值
    setTimeout(() => {
      Object.assign(this.model, {
        select: 1,
        radio: 2,
        checkbox: [1],
        obj: {
          input: "hello world!",
          date: "2020-12-08",
          radio: 1,
        },
        arr: [
          {
            input: "测试1",
            select: 1,
          },
          {
            input: "测试2",
            select: 2,
          },
        ],
      });
    }, 1000);
  },
};
</script>