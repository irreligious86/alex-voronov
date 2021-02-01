const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {
    res.render('home', {title:'home'});
})
app.get('/about', (req, res) => {
    res.render('about',{title:'about'});
})
app.get('/portfolio', (req, res) => {
    res.render('portfolio',{title:'portfolio'});
})
app.get('/contact', (req, res) => {
    res.render('contact', {title:'contact'});
})
app.get('/resume', (req, res) => {
    res.render('resume',{title:'resume'});
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})