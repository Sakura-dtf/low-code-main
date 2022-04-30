<template>
  <div class="login-container">
    <div class="form-container">
      <el-card class="form">
        <div class="form-top">
          <img class="form-img" src="@/static/images/logo.png" alt="" />
          <div class="form-title">低代码展示平台</div>
        </div>
        <el-form
          class="form-context"
          :model="loginForm"
          ref="loginForm"
          :rules="rules"
        >
          <el-form-item prop="username" required>
            <el-input
              v-model="loginForm.username"
              suffix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" required>
            <el-input
              type="password"
              v-model="loginForm.password"
              suffix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item prop="captcha" class="captcha-container" required>
            <el-input
              placeholder="请输入验证码"
              v-model="loginForm.captcha"
              class="captcha-input"
            >
            </el-input>
            <img
              class="captcha-img"
              ref="captchaImg"
              src="http://localhost:4000/user/getCode"
              @click="changeCaptcha"
            />
          </el-form-item>
        </el-form>
        <div class="button-container">
          <el-button type="primary" class="btn" size="medium" @click="submit"
            >登录</el-button
          >
          <el-button type="primary" class="btn" size="medium">注册</el-button>
        </div>
      </el-card>
    </div>
    <div class="right-container">
      <img src="@/static/images/login_left.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { login } from "@/api/http.js";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        captcha: "",
      },
      error: true,
      errorMsg: "验证码错误",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
    };
  },
  methods: {
    changeCaptcha(e) {
      e.target.src = `http://localhost:4000/user/getCode?${Math.random()}`;
    },
    submit() {
      this.$refs["loginForm"].validate(async (valid) => {
        const data = await login(this.loginForm);
        console.log(data);
        if (data.errno === 1005) {
          this.$refs["loginForm"].fields[2].validateMessage = "验证码错误";
          this.$refs["loginForm"].fields[2].validateState = "error";
          this.$refs["captchaImg"].src = `http://localhost:4000/user/getCode?${Math.random()}`;
        } else if(data.errno === 1003) {
          this.$message.error("登录失败，请查看用户名或者密码是否正确");
        } else if(data.errno === 0) {
          this.$message.success("登录成功");
          window.localStorage.setItem("token", data.data.data.token);
          window.localStorage.setItem("username", data.data.data.username);
          // window.localStorage.setItem("token", data.data.data.token);
          // window.localStorage.setItem("token", data.data.data.token);

          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<style scoped>
.login-container {
  height: 100%;
  background: url("../static/images/login_background.jpg");
  display: flex;
  justify-content: space-between;
}

.form-container {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-container {
  width: 50%;
  display: flex;
  align-items: center;
}

.form {
  width: 67%;
  min-width: 460px;
  height: 430px;
  border-radius: 15px !important;
}

.form-top {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 20px 20px;
}

.form-img {
  width: 80px;
}

.form-title {
  font-size: 27px;
  font-weight: 600;
  letter-spacing: 4px;
  height: 80px;
  line-height: 80px;
  width: 70%;
}

.form-context {
  padding: 0 20px;
}

.captcha-input {
  width: 65% !important;
}

.captcha-img {
  height: 40px;
  border-radius: 5px;
  position: absolute;
  right: 0;
  cursor: pointer;
}

.button-container {
  padding: 5px 20px;
  display: flex;
  justify-content: space-around;
}

.btn {
  width: 50%;
}
</style>
