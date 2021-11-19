<template>
  <div id="app">
    <div class="main">
      <a-form class="form" :form="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }" @submit="handleSubmit">
        <a-form-item label="提示">
          <ul class="tip">
            <li>金庸群侠传3D重制版是一个非盈利游戏项目，重制经典游戏《金庸群侠传》并支持后续一系列MOD和二次开发。</li>
            <li>目前正处于内测中，我们使用steam来进行更新游戏（非上架），您可以申请steam激活码。由于激活码有限，我们希望挑选游戏核心受众来帮助我们改进游戏，所以我们每个小时限量发布激活码数量，并且需要正确回答问题，还请见谅。</li>
            <li>最新解释权归金庸群侠传3D重制版开源社区所有</li>
          </ul>
        </a-form-item>
        <a-form-item v-for="(question, index) in questions" :key="question.id" :label="`题目${index + 1}`">
          <div>{{ question.topic }}</div>
          <a-radio-group v-model="answers[index]">
            <a-radio v-for="(o, i) in question.option" :key="o" :value="`${question.id}|${i + 1}`">
              {{ o }}
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
        questions: [],
        answers: [],
        form: this.$form.createForm(this)
    }
  },
  mounted() {
    this.handleQuestion()
  },
  methods: {
    handleQuestion() {
      axios.get('/api/getAllQuestions')
      .then((response) => {
        const { data: { data } } = response
        this.questions = data.map(item => {
          const option = item.option.split(';')
          return {
            ...item,
            option
          }
        }) 
      })
      .catch((error) => {
        console.log(error)
        this.$message.error('请求过多，请一分钟之后再试')
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const map = {
            1: 'a',
            2: 'b',
            3: 'c',
            4: 'd'
          }
          const answers = this.answers.map(answer => {
            const temp = answer.split('|')
            return {
              id: parseInt(temp[0]),
              value: map[temp[1]]
            }
          })
          axios.post('/api/isCorrect', {
            answers
          })
          .then((res) => {
            const { data: { msg, data } } = res
            if (data) {
              this.$message.success(msg)
              axios.post('/api/sendKey', {
                ...values
              })
              .then((response) => {
                const { data: { code, msg } } = response
                code === -1 ? this.$message.error(msg) : this.$message.success(msg)
                this.form = this.$form.createForm(this)
              })
              .catch((error) => {
                console.log(error)
                this.$message.error('请求过多，请一分钟之后再试')
              })
            } else {
              this.$message.error(msg)
            }
            this.reset()
          })
          .catch((err) => {
            console.log(err)
            this.$message.error('请求过多，请一分钟之后再试')
          })
        }
      })
    },
    reset() {
      this.questions = []
      this.answers = []
      this.handleQuestion()
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
  line-height: 25px;
}
</style>
