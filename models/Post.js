const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //title column
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //post column
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //validates if inputed data matches standard url syntax or else fails
                isUrl: true
            }
        },
        //user_id column
        //foreign key to user - 'id'
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;