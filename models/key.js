const { sequelize, Sequelize } = require('../config/db')
const { DataTypes, Model } = Sequelize

class Key extends Model {

    /**
     * @description: 添加key
     * @param {*} key
     * @return {*} 返回添加的数据
     */
    static async createKey({ key }) {
        return await this.create({
            key
        })
    }

    /**
     * @description: 根据id删除key
     * @param {*} id
     * @return {*} 
     */    
    static async deleteById(id){
        return await this.destroy({
            where: {
                id
            }
        })
    }

    /**
     * @description: 根据email查找key
     * @param {*} id
     * @return {*} 
     */    
    static async findByEmail(email){
        return await this.findOne({
            where: {
                email
            }
        })
    }

    /**
     * @description: 根据id修改key
     * @param {*} id
     * @param {*} user
     * @param {*} email
     * @return {*}  返回修改的数据
     */    
    static async updateById({ id, user, email }) {
        return await this.update({ user, email }, {
            where: {
                id
            }
        })
    }

    /**
     * @description: 根据email查找所有key
     * @param {*} id
     * @return {*} 
     */    
    static async findAllByEmail(email){
        return await this.findAndCountAll({
            where: {
                email
            }
        })
    }

}
// 初始化表结构
Key.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, //非空
            autoIncrement: true, //自动递增
            primaryKey: true //主键
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
    underscored: true, //额外字段以下划线来分割
    timestamps: true, //取消默认生成的createdAt、updatedAt字段
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true, // Model 对应的表名将与model名相同
    comment: "key表类",
    // paranoid: true      //虚拟删除
    sequelize, // 我们需要传递连接实例
    // modelName: 'Admin', // 我们需要选择模型名称
    // tableName: 'Admin'  // 表名
}
)

    // 创建表格
    ; (async () => {
        await Key.sync();
        console.log("Key表刚刚(重新)创建！");
        // 这里是代码
    })()
// 定义的模型是类本身
// console.log(User === sequelize.models.User); // true
module.exports = Key
