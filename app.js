const express = require('express');
const app = express();
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }));
app.use(express.json())
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"secret"
}))

app.use('/', require('./routes/routes'))
app.use('/',require('./routes/auth'))


app.listen(3000)