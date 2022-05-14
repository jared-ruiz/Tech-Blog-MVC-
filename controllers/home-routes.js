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
        res.render('homepage', {
            //posts will be used in the partial alongside the handlebars info
            posts,
            loggedIn: req.session.loggedIn
        });
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

//gets single post and redirects to single-post handlebars layout
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
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
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with that id' });
            return;
        }

        //serialize the data after successful query
        const post = dbPostData.get({ plain: true });

        //pass data into template // pass in session data to use in single-post handlebars
        res.render('single-post', { 
            post, 
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    
})

module.exports = router;