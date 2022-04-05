// 编辑器左侧组件列表

const btnList = [
    {
        id: 23,
        tag: "el-dialog-efs",
        name: "表单弹窗",
        propValue: {
            width: "50%",
            title: "弹框"
        },
        on: {
            click: `function(ctx) {
                console.log(ctx);
            }`
        }
    },
    {
        id: 24,
        tag: "el-dialog-table",
        name: "表格弹窗",
        propValue: {
            width: "50%",
            title: "弹框"
        },
        on: {
            click: `function(ctx) {
                console.log(ctx);
            }`
        }
    }
]

export default btnList