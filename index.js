const express = require('express')
const exphbs  = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const axios = require('axios');

app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const links = name => {
    return {
        title:name,
        [name]: true
    }
}

app.get('/', (req, res) => {
    res.render('home', links('home'));
})
const nFormatter = (num) => {
    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
};
app.get('/about',async (req, res) => {
    const userName = 'irreligious86';
    const data = await axios.get(`https://www.instagram.com/${userName}/?__a=1`);
    const response = data.data;
    const graphql = response.graphql;
    let user = graphql.user;
    user = {
        ...user,
        cover: user.profile_pic_url_hd,
    }
    let posts = user.edge_owner_to_timeline_media.edges;
    posts = posts.map(post=>({
        count:nFormatter(post.node.edge_media_to_comment.count),
        likes:nFormatter(post.node.edge_liked_by.count),
        cover: post.node.display_url
    }));
    res.render('about',{
        ...links('about'),
        user,
        posts
    });
})
app.get('/portfolio', (req, res) => {
    res.render('portfolio',links('portfolio'));
})
app.get('/contact', (req, res) => {
    res.render('contact', links('contact'));
})
app.get('/resume', (req, res) => {
    res.render('resume',links('resume'));
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

