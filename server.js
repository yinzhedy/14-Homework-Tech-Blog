const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const sequelize = require('./config/connection')
// const helpers = require('./utils/helpers')

const session = require('express-session')
const routes = require('./controllers')
const sequelizeSessionStore = require('connect-session-sequelize')(session.Store)

const app = express();
const PORT = process.env.PORT || 3005;

const sess = {
    secret: 'secretofallsecrets',
    cookie: {},
    resave: true,
    saveUninitialized: true,
    store: new sequelizeSessionStore({
        db: sequelize,
    })
};

app.use(session(sess));

const hbs = expressHandlebars.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  });