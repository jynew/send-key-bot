const { sequelize, Sequelize } = require('../config/db')
const { DataTypes, Model } = Sequelize

class Question extends Model {

    /**
     * @description: 查询Question
     * @param {*} topic
     * @param {*} option
     * @param {*} answer
     * @return {*} 返回数据
     */
    static async getAllQuestions() {
        return await Question.findAll({
            order: sequelize.random(), limit: 10,
            attributes: ['id', 'topic', 'option']
        })
    }

    /**
     * @description: 添加Question
     * @param {*} topic
     * @param {*} option
     * @param {*} answer
     * @return {*} 返回添加的数据
     */
    static async createQuestion({ topic, option, answer }) {
        return await this.create({
            topic, option, answer
        })
    }

    /**
     * @description: 根据id判断正误
     * @param {*} value
     * @return {*} 返回布尔
     */
      static async isCorrect({ id, value }) {
        const { answer } =  await this.findOne({
          where: {
              id
          }
        })
        return answer === value
      }

}
// 初始化表结构
Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        topic: {
            type: DataTypes.STRING
        },
        option: {
            type: DataTypes.STRING
        },
        answer: {
            type: DataTypes.STRING
        }
    }, {
    underscored: true, //额外字段以下划线来分割
    timestamps: true, //取消默认生成的createdAt、updatedAt字段
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true, // Model 对应的表名将与model名相同
    comment: "question表类",
    // paranoid: true      //虚拟删除
    sequelize, // 我们需要传递连接实例
    // modelName: 'Admin', // 我们需要选择模型名称
    // tableName: 'Admin'  // 表名
}
)

    // 创建表格
    ; (async () => {
        await Question.sync();
        console.log("Question表刚刚(重新)创建！");
        // 这里是代码
    })()
// 定义的模型是类本身
// console.log(User === sequelize.models.User); // true
module.exports = Question
