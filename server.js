const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const helpers = require('./utils/helpers');
require('dotenv').config();

//express
const app = express();
const PORT = process.env.PORT || 3001;

//handlebars + helpers passed into handlebars instance
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// sessions and sequelize
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    //.env reference to secret
    secret: process.env.sess_secret,
    cookies: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}

//use sessions
app.use(session(sess));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//activate routes
app.use(routes);

//switch to true when updated table relationships, reseed afterward
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))
})