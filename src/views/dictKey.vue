<template>
  <div style="padding: 30px">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="查询">
        <el-input
          v-model="form.value"
          placeholder="查询字符串"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="small"
          @click="onSubmit"
          style="width: 80px"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <div style="margin-top: 20px">
      <el-button type="primary" size="small" style="width: 80px"
        >添加</el-button
      >
    </div>
    <div style="margin-top: 20px">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="label" label="label">
        </el-table-column>
        <el-table-column prop="value" label="value">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getDictKey} from '@/api/http.js';
export default {
  data() {
    return {
      form: {
        value: "",
      },
      tableData:[],
    };
  },
  async created() {
    await this.getAllDictKey();
  },
  methods: {
    onSubmit() {},
    async getAllDictKey() {
      const res = await getDictKey();
      if(res.errno === 0) {
        this.tableData = res.data.data;
      }
    }
  },
};
</script>

<style></style>
