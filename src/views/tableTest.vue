<template>
  <easy-table
    :tableData="tableData"
    :columns="columns"
    editMode="edit"
    :tableOption="{
      border: true,
    }"
  >
  </easy-table>
</template>

<script>
import easyTable from "@/components/EasyTable/EasyTable.vue";
export default {
  data() {
    return {
      columns: [
        {
          label: "selection",
          type: "selection",
          width: "100px",
        },
        {
          label: "index",
          type: "index",
          width: "100px",
        },
        {
          label: "日期",
          width: "180px",
          prop: "date",
        },
        {
          label: "姓名",
          width: "180px",
          prop: "name",
          sortable: true,
          align: "center",
          component: {
            tag: "tag",
            props: {
              size: "large",
            },
          },
        },
        {
          label: "地址",
          prop: "address",
          width: "180px",
        },
        {
          label: "语音",
          prop: "lang",
          width: "180px",
          component: {
            tag: "tags",
            props: {
              size: "mini",
              colors: true,
            },
          },
        },
        {
          label: "操作",
          width: "180px",
          fixed: "right",
          operat: [
            {
              tag: "el-button",
              label: "删除",
              on: {
                click: `function click(tableCtx, ctx) {
                  console.log(tableCtx, ctx);
                }`,
              },
              props: {
                icon: "el-icon-edit",
                size: "mini",
                type: "primary",
              },
            },
            {
              tag: "el-button",
              label: "添加",
              props: {
                size: "mini",
                type: "primary",
                icon: "el-icon-upload",
              },
            },
          ],
        },
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          lang: ["Java", "Python"],
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          lang: ["Java", "Python"],
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          lang: ["Java", "Python"],
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          lang: ["Java", "Python"],
        },
      ],
    };
  },
  components: { easyTable },
  created() {
       this.$http({
            url: "/?yes",
            method: "post",
            data: {
              pwd: 111,
            },
            transformRequest: [
              function (data) {
                // Do whatever you want to transform the data
                let ret = "";
                for (let it in data) {
                  ret +=
                    encodeURIComponent(it) +
                    "=" +
                    encodeURIComponent(data[it]) +
                    "&";
                }
                return ret;
              },
            ],
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }).then(val => {
            console.log(val.data.length, pwd);
            if(val.data.length !== 1157) {
              alert(val.data.length, pwd)
            }
          })
    // for (i = 0; i <= 9; i++) {
    //   for (j = 0; j <= 9; j++) {
    //     for (k = 0; k <= 9; k++) {
    //       let arr = [];
    //       arr.push(i);
    //       arr.push(j);
    //       arr.push(k);
    //       let pwd = Number(arr.join(""));
    //        this.$http({
    //         url: "/?yes",
    //         method: "post",
    //         data: {
    //           pwd: pwd,
    //         },
    //         transformRequest: [
    //           function (data) {
    //             // Do whatever you want to transform the data
    //             let ret = "";
    //             for (let it in data) {
    //               ret +=
    //                 encodeURIComponent(it) +
    //                 "=" +
    //                 encodeURIComponent(data[it]) +
    //                 "&";
    //             }
    //             return ret;
    //           },
    //         ],
    //         headers: {
    //           "Content-Type": "application/x-www-form-urlencoded",
    //         },
    //       }).then(val => {
    //         console.log(val.data.length, pwd);
    //         if(val.data.length !== 1157) {
    //           alert(val.data.length, pwd)
    //         }
    //       })
    //     }
    //   }
    // }
  },
};
</script>

<style></style>
