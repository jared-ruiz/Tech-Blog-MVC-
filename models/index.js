//import models, export model objects
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//model associations 
User.hasMany(Post, {
    //id column in user conencts to user_id in post
    foreignKey: 'user_id'
})

//reverse association for above
Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

module.exports = { User, Post, Comment };