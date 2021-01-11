const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const myFunctions = require('./config/passport')
const app = express();
const dotenv = require('dotenv')
require('./config/passport1')(passport)
// Passport Config
myFunctions.myFunction1(passport)
// myFunctions.myFunction2(passport)
// DB Config
const db = require('./config/keys').mongoURI;
dotenv.config({path:'./config/config.env'})


// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

  // Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

  //handlebars
  app.engine(
    '.hbs',
    exphbs({
      helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        // select,
      },
      defaultLayout: 'main',
      extname: '.hbs',
    })
  )
  app.set('view engine', '.hbs')


// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/stories', require('./routes/stories.js'));
app.use('/auth', require('./routes/auth.js'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on  port ${PORT}`));
