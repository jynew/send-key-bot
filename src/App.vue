<template>
  <div id="app">
    <div class="main">
      <div>
        <div>每人仅能领取一个激活码</div>
        <div></div>
      </div>
      <a-form class="form" :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" @submit="handleSubmit">
        <a-form-item label="QQ">
          <a-input
            size="large"
            type="text"
            placeholder="请输入你的QQ"
            v-decorator="['user', { rules: [{ required: true, message: '请输入你的QQ!' }] }]"
          />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input
            size="large"
            type="text"
            placeholder="请输入你的邮箱"
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: '请输入正确的邮箱!',
                  },
                  {
                    required: true,
                    message: '请输入你的邮箱!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button class="button" type="primary" html-type="submit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data() {
    return {
       form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.sendKey(values)
        }
      })
    },
    sendKey(values) {
      axios.post('api/sendKey', {
        ...values
      })
      .then((response) => {
        this.$message.success(response)
      })
      .catch((error) => {
        this.$message.error(error)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
.main {
  width: 50%;
  margin: 0 auto;
}
</style>
