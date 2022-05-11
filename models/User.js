//class and object from sequelize. Model creates our own models
//user inherits all that Model offers
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const brcrypt = require('bcrypt');

//create User
class User extends Model {
    //set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return brcrypt.compareSync(loginPw, this.password);
    }
}

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
        //functions called before or after calls in sequelize
        hooks: {
            //set up beforeCreate lifecyle "hook" 
            //generates hashed password before User model is created
            async beforeCreate(newUserData) {
                newUserData.password = await brcrypt.hash(newUserData.password, 10);
                    return newUserData;
                },
                //set up beforeUpdate lifecycle "hook"
                //generates hashed password before making updated User model
                async beforeUpdate(updatedUserData) {
                    updatedUserData.password = await brcrypt.hash(updatedUserData.password, 10);
                    return updatedUserData;
                }
            },
            

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