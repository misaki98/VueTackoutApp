<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="loginType==='msg'?'on':''" @click="loginType='msg'">短信登录</a>
          <a href="javascript:;" :class="loginType==='pwd'?'on':''" @click="loginType='pwd'">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login()">
          <div :class="loginType==='msg'?'on':''">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
              <button
                :disabled="!rightPhone"
                @click.prevent="sendMsg()"
                class="get_verification"
                :style="{color:(rightPhone?'black':'')}"
              >{{(countdown?`倒计时${countdown}s`:'获取验证码')}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="loginType==='pwd'?'on':''">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>
              <section class="login_verification">
                <input
                  :type="showPwd?'password':'text'"
                  maxlength="8"
                  placeholder="密码"
                  v-model="pwd"
                />
                <div class="switch_button" @click="showPwd = !showPwd" :class="showPwd?'off':'on'">
                  <div class="switch_circle" :class="{right:!showPwd}"></div>
                  <span class="switch_text">{{showPwd?'':'已显示'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  @click="getCaptcha"
                  ref="captcha"
                  alt="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <Modal :alertText="alertText" v-show="showModal" @closeTip="showModal=false;alertText=''" />
  </section>
</template>

<script>
import Modal from "../../components/Modal/Modal";
import { reqLogin, reqMsg, reqPhoneLogin } from "../../api";
export default {
  data() {
    return {
      loginType: "msg",
      phone: "",
      code: "", //短信验证码
      countdown: 0,
      name: "", //用户名
      pwd: "",
      captcha: "", //图形验证码
      showPwd: true,
      alertText: "", //提示文本
      showModal: false //是否显示警告框
    };
  },

  components: {
    Modal
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  methods: {
    async sendMsg() {
      // 获取短信验证码
      if (!this.countdown) {
        // 启动倒计时定时器
        this.countdown = 30;
        this.count = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(this.count);
          }
        }, 1000);
      }
      const result = await reqMsg(this.phone);
      if (result.code === 1) {
        // 如果出错了，显示提示和停止倒计时
        this.showErrorMsg(result.msg);
        if (this.countdown) {
          this.countdown = 0;
          clearInterval(this.count);
          this.count = undefined;
        }
      }
    },
    showErrorMsg(text) {
      this.showModal = true;
      this.alertText = text;
    },
    async login() {
      let result;
      // 登录前台表单验证
      if (this.loginType === "msg") {
        // 短信登录
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          // 手机号不正确
          this.showErrorMsg("手机号不正确");
          return;
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码位数错误
          this.showErrorMsg("验证码位数错误");
          return;
        }
        result = await reqPhoneLogin(phone, code);
      } else if (this.loginType === "pwd") {
        // 密码登录
        const { name, pwd, captcha } = this;
        if (!this.name) {
          // 必须指定用户名
          this.showErrorMsg("必须指定用户名");
        } else if (!this.pwd) {
          // 密码必须指定
          this.showErrorMsg("密码必须指定");
        } else if (!this.captcha) {
          // 验证码必须指定
          this.showErrorMsg("验证码必须指定");
        }
        result = await reqLogin({ name, pwd, captcha });
      }
      if (this.countdown) {
          this.countdown = 0;
          clearInterval(this.count);
          this.count = undefined;
        }
      // 根据结果处理数据
      if (result.code === 0) {
        // 登录成功
        const user = result.data;
        // 将user保存到store中,同步action
        this.$store.dispatch('recordUser',user)
        // 路由跳转
        this.$router.replace('/profile')
      } else {
        this.showErrorMsg(result.msg);
        this.getCaptcha()
      }
    },
    getCaptcha() {
      // 获取一个新的图片验证码
      this.$refs.captcha.src = "http://localhost:4000/captcha?time=" + Date.now();
    }
  },
  watch: {}
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #ddd;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                &.right {
                  transform: translateX(27px);
                }

                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>