const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require('./config/db') // Connecting the MongoDB database
const morgan = require('morgan') // for log in
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
require('./config/passport')(passport);

//load config 
dotenv.config({path: './config/config.env'})

myfunction1(passport)
myfunction(passport)

// passport config

connectDB()
const app = express()

// Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
 app.use(morgan('dev'))
}

// static folder
app.use(express.static(path.join(__dirname, 'public')))

//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main',extname:'hbs'}))
app.set('view engine', '.hbs')


// sessions

app.use(session({
 secret: 'keyboard cat',
 resave: true,
 saveUninitialized: true,
 store: new MongoStore({mongooseConnection: mongoose.connection})
 
}))
//passport middleware 
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Surver running in ${process.env.NODE_ENV} mode on port ${PORT}`))
