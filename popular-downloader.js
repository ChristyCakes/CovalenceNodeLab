// Part 3

var rp = require('request-promise');
const path = require('path');
const fs = require('fs');

rp('https://reddit.com/r/popular.json')
    .then(res => {

        // iterate over reddit data; create array of objects for 'data' level
        let articles = JSON.parse(res).data.children.map(item => item.data)

        // map over articles, find videos, images, and gifs; is_video marked true for videos, post_hint marked image for images &
        // gifs have reddit_video_preview prop
        articles.map(article => {
            if (article.is_video || article.post_hint == "image" || (article.preview && article.preview.reddit_video_preview)) {
                rp(article.url).pipe(fs.createWriteStream(`./downloads/${article.id}`))
            }
        })

    }).catch(err => console.log(err))