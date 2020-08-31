const express = require('express');
const app = express();
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000

//Assets
app.use(express.static('public'))



//set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//root
app.get('/', (req, res) => {
    res.render('home');
});

//cart
app.get('/cart', (req, res) => {
     res.render('customers/cart');
});

//login
app.get('/login', (req, res) => {
    res.render('auth/login');
});

//register
app.get('/register', (req, res) => {
    res.render('auth/register');
});




app.listen(PORT, () => {
    console.log(`Listening on http://127.0.0.1:${PORT}`);
}); 