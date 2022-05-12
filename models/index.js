//import models, export model objects
const User = require('./User');
const Post = require('./Post');

//model associations 
User.hasMany(Post, {
    //id column in user conencts to user_id in post
    foreignKey: 'user_id'
})

//reverse association for above
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post };