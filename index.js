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
    let user = {
        username:'irreligious86',
        cover:'https://instagram.fiev19-1.fna.fbcdn.net/v/t51.2885-19/s320x320/137558605_121470649757844_2758978820028729241_n.jpg?_nc_ht=instagram.fiev19-1.fna.fbcdn.net&_nc_ohc=SiRtcGirFk8AX8Oc34F&tp=1&oh=9036ed74c92911c8d412c8d1c9171a8a&oe=60419DCC'
    }
    let posts = [];
    let errors = {}
    try {
        const userName = 'irreligious86';
        const data = await axios.get(`https://www.instagram.com/${userName}/?__a=1`);
        const response = data.data;
        const graphql = response.graphql;
        user = graphql.user;
        user = {
            ...user,
            cover: user.profile_pic_url_hd,
        }
        posts = user.edge_owner_to_timeline_media.edges;
        posts = posts.map(post=>({
            count:nFormatter(post.node.edge_media_to_comment.count),
            likes:nFormatter(post.node.edge_liked_by.count),
            cover: post.node.display_url
        }));
    }catch (err){
        console.log(err)
        errors = err;
    }

    res.render('about',{
        ...links('about'),
        user,
        posts,
        errors:JSON.stringify(errors, null, 2)
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

