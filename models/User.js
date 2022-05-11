//class and object from sequelize. Model creates our own models
//user inherits all that Model offers
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//create User
class User extends Model {}

User.init(
    {
        //id column
        id: {
            //this dictates what type of data will be here
            type: DataTypes.INTEGER,
            //sql equivalent of 'NOT NULL'
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //prevents same email from being used
            unique: true,
            validate: {
                //makes sure email follows standard email structure(<string>@<string>.<string>)
                isEmail: true
            }
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //forces the password creation to only allow 4 characters+
                len: [4]
            }
        }
    },
    {
        //import direct connection to database
        sequelize,
        //does not allow automatic creation of 'createdAt/updatedAt' timestamps
        timestamps: false,
        //does not allow pluralization of database table
        freezeTableName: true,
        //use underscores isntead of camelcasing
        underscored: true,
        //maintain models lowercase name in the database
        modelName: 'user'
    }
)

//export user model
module.exports = User;