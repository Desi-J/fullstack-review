const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      massive = require('massive'),
      // axios = require('axios'), // Dont need this because we are using axios in the controller
      dotenv = require('dotenv');
      authController = require('./controllers/authController')
      quotesController = require('./controllers/quotesController')

      console.log('Hi! ^_^')
dotenv.config();

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db',db);
}).catch(error => {
  console.log('error connecting to db', error);
});

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2  //two weeks
  }
}));

  // ROUTING
//AUTHCONTROLLER ENDPOINTS
app.get('/auth/callback', authController.login);
app.get('/auth/user-data', authController.getUser);
app.post('/auth/logout', authController.logout);

//QUOTESCONTROLLER ENDPOINTS
app.get('/api/quotes', quotesController.getQuotes);

const PORT = 4000;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`);})
