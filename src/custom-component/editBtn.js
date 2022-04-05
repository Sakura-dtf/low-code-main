// 编辑器左侧组件列表

const btnList = [
  {
    id: 16,
    tag: "el-input",
    name: "按钮",
    on: {
      click: `function click(tableCtx, dialogCtx) {
                console.log(tableCtx, dialogCtx, "change"); 
            }`,
    },
    propValue: {
      label: "操作",
      size: "small",
      type: "primary",
      plain: false,
      round: false,
      circle: false,
      disabled: "false",
      icon: "el-icon-edit",
    },
  },
];

export default btnList;
