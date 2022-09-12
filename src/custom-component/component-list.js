// 编辑器左侧组件列表

const formList = [
  {
    id: 0,
    name: "输入框",
    tag: "el-input",
    inline: true,
    required: "false",
    rules: [],
    default: "",
    labelWidth: "100px",
    on: {
      blur: `function blur(e, ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, e, "blur"); 
}`,
      focus: `function focus(e, ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, e, "focus"); 
}`,
      clear: `function clear(ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, "clear"); 
}`,
      change: `function change(value, ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, value, "change"); 
}`,
    },
    propValue: {
      label: "输入框",
      width: "200px",
      maxlength: 10,
      minLength: 1,
      placeholder: "请输入内容",
      clearable: true,
      disabled: "false",
      size: "small",
      readonly: false,
      "show-password": false,
    },
  },
  {
    id: 1,
    tag: "el-select",
    name: "选择框",
    itemsValue: "",
    default: "1",
    url: "",
    watchField: "",
    labelWidth: "100px",
    inline: true,
    required: "false",
    rules: [],
    items: [
      { label: "黄金糕", value: "1" },
      { label: "臭豆腐", value: "2" },
    ],
    on: {
      blur: `function blur(e, ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
        console.log(ctx, e, "blur"); 
}`,
      focus: `function focus(e, ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, e,"focus"); 
}`,
      clear: `function clear(ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, "clear"); 
}`,
      change: `function change(value, ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, value,"change"); 
}`,
      "visible-change": `function visibleChange(ctx,e) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, e,"visible-change"); 
}`,
      "remove-tag": `function removeTag(ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, "remove-tag"); 
}`,
    },
    propValue: {
      label: "选择框",
      width: "200px",
      placeholder: "请输入内容",
      clearable: false,
      disabled: "false",
      size: "small",
    },
  },
  {
    id: 2,
    tag: "el-switch",
    name: "开关",
    default: true,
    inline: true,
    labelWidth: "100px",
    on: {
      change: `function change(value, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, value,"change"); 
    }`,
      focus: `function focus(e, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
      console.log(ctx, e,"focus"); 
    }`,
    },
    propValue: {
      label: "开关",
      disabled: "false",
      width: "200px",
    },
  },
  {
    id: 3,
    name: "单选框",
    tag: "el-radio",
    default: "1",
    inline: true,
    labelWidth: "100px",
    on: {
      change: `function change(value, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, value,"change"); 
    }`,
    },
    items: [
      { label: "黄金糕", value: "1" },
      { label: "臭豆腐", value: "2" },
    ],
    propValue: {
      label: "单选框",
      width: "200px",
      disabled: "false",
      size: "small",
    },
  },
  {
    id: 4,
    name: "多选框",
    tag: "el-checkbox",
    default: ["1"],
    inline: true,
    labelWidth: "100px",
    items: [
      { label: "黄金糕", value: "1" },
      { label: "臭豆腐", value: "2" },
    ],
    on: {
      change: `function change(value, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, value,"change"); 
    }`,
    },
    propValue: {
      label: "多选框",
      width: "200px",
      disabled: "false",
      size: "small",
    },
  },
  {
    id: 5,
    name: "时间选择器",
    tag: "el-time-select",
    default: "",
    inline: true,
    required: "false",
    rules: [],
    labelWidth: "100px",
    on: {
      blur: `function blur(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
            console.log(ctx, e, "blur"); 
    }`,
      focus: `function focus(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, e,"focus"); 
    }`,
      change: `function change(value, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
      console.log(ctx, value,"change"); 
  }`,
    },
    propValue: {
      label: "时间选择器",
      width: "200",
      disabled: "false",
      placeholder: "请选择时间",
      start: "03:30",
      end: "18:30",
      step: "00:15",
      size: "small",
    },
  },
  {
    id: 6,
    name: "时间范围选择器",
    tag: "el-time-picker",
    default: "",
    inline: true,
    required: "false",
    rules: [],
    labelWidth: "130px",
    on: {
      blur: `function blur(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
            console.log(ctx, e, "blur"); 
    }`,
      focus: `function focus(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, e,"focus"); 
    }`,
      change: `function change(value, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
      console.log(ctx, value,"change"); 
  }`,
    },
    propValue: {
      label: "时间范围选择器",
      width: "220",
      disabled: "false",
      "is-range": true,
      placeholder: "请选择时间",
      selectableRange: "18:30:00 - 20:30:00",
      size: "small",
    },
  },
  {
    id: 7,
    name: "日期时间选择器",
    tag: "el-date-picker",
    default: "",
    inline: true,
    required: "false",
    rules: [],
    labelWidth: "120px",
    on: {
      blur: `function blur(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
            console.log(ctx, e, "blur"); 
    }`,
      focus: `function focus(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, e,"focus"); 
    }`,
      change: `function change(value, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
      console.log(ctx, value,"change"); 
  }`,
    },
    propValue: {
      label: "日期时间选择器",
      with: "220",
      disabled: "false",
      placeholder: "请选择日期",
      type: "date",
      format: "",
      clearable: true,
      size: "small",
      readonly: true,
    },
  },
  {
    id: 8,
    name: "颜色选择器",
    tag: "el-color-picker",
    default: "#409EFF",
    inline: true,
    required: "false",
    labelWidth: "120px",
    on: {
      change: `function change(value, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, value,"change"); 
    }`,
      "active-change": `function activeChange(value, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
      console.log(ctx, value,"change"); 
  }`,
    },
    propValue: {
      label: "颜色选择器",
      disabled: "false",
      top: "10px",
    },
  },
  {
    id: 9,
    name: "文本输入框",
    tag: "el-input",
    default: "",
    required: "false",
    rules: [],
    inline: true,
    labelWidth: "120px",
    on: {
      blur: `function blur(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, e, "blur"); 
    }`,
      focus: `function focus(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, e, "focus"); 
    }`,
      clear: `function clear(ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, "clear"); 
    }`,
      change: `function change(value, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, value, "change"); 
    }`,
    },
    propValue: {
      label: "文本输入框",
      width: "200",
      disabled: "false",
      type: "textarea",
      maxlength: 10,
      minLength: 1,
      placeholder: "请输入内容",
      clearable: false,
      size: "small",
      readonly: false,
      width: "200px",
      "show-word-limit": true,
      rows: 2,
    },
  },
  {
    id: 10,
    name: "计数器",
    tag: "el-input-number",
    default: 2,
    inline: true,
    labelWidth: "120px",
    on: {
      blur: `function blur(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
            console.log(ctx, e, "blur"); 
    }`,
      focus: `function focus(e, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, e,"focus"); 
    }`,
      change: `function change(value, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
      console.log(ctx, value,"change"); 
  }`,
      select: `function select(ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx,"select"); 
}`,
    },
    propValue: {
      label: "计数器",
      disabled: "false",
      step: 2,
      size: "small",
      precision: 0,
      max: 10,
      min: 0,
    },
  },
  {
    id: 11,
    name: "级联选择器",
    tag: "el-cascader",
    default: ["zhinan", "shejiyuanze", "yizhi"],
    inline: true,
    required: "false",
    rules: [],
    labelWidth: "120px",
    optionsValue: "",
    on: {
      change: `function change(value, ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, value,"change"); 
    }`,
      "visible-change": `function visibleChange(ctx,e) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, e,"visible-change"); 
    }`,
      "remove-tag": `function removeTag(ctx) {
        // ctx 参数对象 包含三个变量
        // componentData 所有组件的所有属性
        // formValue  表单的值 
        console.log(ctx, "remove-tag"); 
    }`,
      blur: `function blur(e, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
          console.log(ctx, e, "blur"); 
  }`,
      focus: `function focus(e, ctx) {
      // ctx 参数对象 包含三个变量
      // componentData 所有组件的所有属性
      // formValue  表单的值 
      console.log(ctx, e,"focus"); 
  }`,
      "expand-change": `function expandChange(val, ctx) {
    // ctx 参数对象 包含三个变量
    // componentData 所有组件的所有属性
    // formValue  表单的值 
    console.log(ctx, val,"expandChange"); 
}`,
    },
    propValue: {
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
      width: "220",
      label: "级联选择器",
      disabled: "false",
      "show-all-levels": false,
      multiple: false,
      "collapse-tags": false,
      checkStrictly: false,
    },
  },
];


const a = {
  input: {
    tag: "el-input",
    label: "选择框",
  },
  select: {
    tag: "el-select",
    label: "选择框"
  }
}


export default formList;


