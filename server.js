require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash');
const { json } = require('express');
const MongoDbStore = require('connect-mongo')(session)


// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology : true, useFindAndModify : true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Connection failed...')
});

// Session store
let mongoStore = new MongoDbStore({
            mongooseConnection: connection,
            collection: 'sessions'
        })

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}))

app.use(flash())

// Assets
app.use(express.static('public'))
app.use(express.json())

// Set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web.js')(app)



app.listen(PORT, () => {
    console.log(`Listening on http://127.0.0.1:${PORT}`);
}); 