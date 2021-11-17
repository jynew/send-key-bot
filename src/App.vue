<template>
  <div id="app">
    <div class="main">
      <a-form class="form" :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
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
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
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
      axios.post('/sendKey', {
        ...values
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  width: 800px;
  margin: 0 auto;
}
</style>
