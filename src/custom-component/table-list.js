// 编辑器左侧组件列表

const tableList = [
  {
    id: 17,
    tag: "el-table-column",
    name: "列",
    propValue: {
      label: "列名",
      prop: "prop",
      width: "180",
      "min-width": "120",
      sortable: false,
      align: "left",
      "header-align": "left",
      fixed: false,
    },
  },
  {
    id: 18,
    tag: "el-table-column",
    name: "序列",
    propValue: {
      label: "列名",
      prop: "prop",
      width: "180",
      "min-width": "120",
      align: "left",
      "header-align": "left",
      type: "index",
      fixed: "left",
    },
  },
  {
    id: 19,
    tag: "el-table-column",
    name: "选择列",
    propValue: {
      label: "列名",
      prop: "prop",
      width: "180",
      "min-width": "120",
      align: "left",
      "header-align": "left",
      type: "selection",
      fixed: "left",
    },
  },
  {
    id: 20,
    tag: "el-table-column",
    name: "tag列",
    propValue: {
      label: "列名",
      prop: "prop",
      width: "180",
      "min-width": "120",
      align: "left",
      "header-align": "left",
      fixed: false,
      component: {
        tag: "tag",
        on: {
          close: `function(val) {
            console.log(1, val);
          }`,
        },
        props: {
          size: "large",
          type: "primary",
          effect: "dark",
          closable: false,
        },
      },
    },
  },
  {
    id: 21,
    tag: "el-table-column",
    name: "tags列",
    propValue: {
      label: "列名",
      prop: "prop",
      width: "280",
      "min-width": "120",
      align: "left",
      "header-align": "left",
      fixed: false,
      component: {
        tag: "tags",
        on: {
          close: `function(val) {
            console.log(1,val);
          }`
        },
        props: {
          size: "large",
          type: "primary",
          effect: "dark",
          colors: true,
          closable: false,
        },
      },
    },
  },
  {
    id: 22,
    tag: "el-table-column",
    name: "按钮",
    propValue: {
      label: "操作",
      prop: "prop",
      width: "180",
      "min-width": "120",
      align: "left",
      fixed: false,
      "header-align": "left",
      component: {
        tag: "button",
        label: "操作",
        on: {
          click: `function() {
            console.log(2);
          }`
        },
        props: {
          size: "large",
          type: "primary",
          icon: "el-icon-edit",
          plain: false,
          round: false,
          circle: false
        },
      },
    },
  },
];

export default tableList;
