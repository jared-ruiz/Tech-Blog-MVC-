//creates the path from /useres back to /api then sends that to server.js
//to serve the full api routes needed for functionality (ex: /api/users/1)
const router = require('express').Router();

//require api routes folder for all api routes
const apiRoutes = require('./api');

//use all bundled api routes created in /api folder
router.use('/api', apiRoutes);

//if call to route endpoint doedsnt exist
//error out
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;