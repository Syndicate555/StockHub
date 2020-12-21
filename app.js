const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const connectDB = require('./config/db') // connecting the MongoDB database
const morgan = require('morgan') // for log in
const exphbs = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
//load config 
dotenv.config({path: './config/config.env'})


// passport config
require('./config/passport')(passport)
connectDB()
const app = express()

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
 resave: false,
 saveUninitialized: false,
 store: new MongoStore({mongooseConnection: mongoose.connection})
 
}))
//passport middleware 
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


const PORT = process.env.PORT || 4545
app.listen(PORT, console.log(`Surver running in ${process.env.NODE_ENV} mode on port ${PORT}`))
