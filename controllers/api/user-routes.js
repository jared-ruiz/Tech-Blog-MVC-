const router = require('express').Router();
//import user model from models file
const { User, Post, Comment } = require('../../models');

//GET all users
router.get('/', (req, res) => {
    //accesses User model and runs .findAll() method (method from sequelize)
    User.findAll({
        //prevents password info from returning with query for privacy
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//GET single user by id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with that id' })
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//CREATE a new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    //sessions accessing id and username + boolean for log in
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//api/users/login
router.post('/login', (req, res) => {
    //expect email and password
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    //sessions accessing user data when logging in
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email '});
            return;
        }

        const validatePassword = dbUserData.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in!' });
        })
    })
})

router.post('/logout', (req, res) => {
    //destroys session when logging out
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }
    else {
        res.status(404).end();
    }
})

//PUT update user info by id
router.put('/:id', (req, res) => {
    //pass in req.body instead to only update what's passed through
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No user found with that id' })
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//DELETE user by id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with that id' })
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//api/users
module.exports = router;