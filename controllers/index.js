//creates the path from /useres back to /api then sends that to server.js
//to serve the full api routes needed for functionality (ex: /api/users/1)
const router = require('express').Router();

//require api routes folder for all api routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

//use all bundled api routes created in /api folder
router.use('/api', apiRoutes);
//handlebars home routes
router.use('/', homeRoutes);
//dashboard routes
router.use('/dashboard', dashboardRoutes);

//if call to route endpoint doedsnt exist
//error out
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;