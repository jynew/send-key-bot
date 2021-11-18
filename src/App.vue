<template>
  <div id="app">
    <div class="main">
      <a-form class="form" :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" @submit="handleSubmit">
        <a-form-item label="提示">
          <ul class="tip">
            <li>正确填写即可领取</li>
            <li>每人仅能领取一个激活码</li>
            <li>最新解释权归金庸群侠传3D重制所有</li>
          </ul>
        </a-form-item>
        <a-form-item>
          <a-radio-group v-model="value" @change="onChange">
          <a-radio :style="radioStyle" :value="1">
            Option A
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            Option B
          </a-radio>
          <a-radio :style="radioStyle" :value="3">
            Option C
          </a-radio>
          <a-radio :style="radioStyle" :value="4">
            More...
            <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
          </a-radio>
        </a-radio-group>
        </a-form-item>
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
    handleQuestion() {

    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.sendKey(values)
          axios.post('/api/sendKey', {
            ...values
          })
          .then((response) => {
            const { data: { code, msg } } = response
            code === -1 ? this.$message.error(msg) : this.$message.success(msg)   
          })
          .catch((error) => {
            console.log(error)
          })
        }
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
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
}
ul {
  list-style: none;
  padding: 0;
}
ul>li {
  list-style-type: circle;
  margin-left: 20px;
  padding-left: 4px;
}
</style>
