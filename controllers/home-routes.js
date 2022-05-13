//homepage and login
//serves up handlebars when we render 
const router = require('express').Router();
//import models and sequelize to make query upon request
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    //log session info
    console.log(req.session);

    Post.findAll({
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        //data sequelize returns is a sequelize object, we need it to 
        //return as a json i believe so plain: true pulls it as that
        //const post will serialize the entire array as opposed to just one
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);    
    })
})

router.get('/login', (req, res) => {
    //if already logged in, redirect to dashboard
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    //else redirect to login 
    res.render('login');
})

module.exports = router;