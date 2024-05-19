// const express = require('express');
// const routes = require('./controllers');
// const sequelize = require('sequelize');
// const myDb = require('./config/connection')
// // import sequelize connection
// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(routes);

// // sync sequelize models to the database, then turn on the server
// myDb.sync({force: false}).then(() => {
//     app.listen(PORT, () => {
//       console.log(`App listening on port ${PORT}!`);
//     });
// })


const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const hbs = exphbs.create({});

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SECRET_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
})
