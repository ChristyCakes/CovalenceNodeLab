// Part 3 -- Advanced

var rp = require('request-promise');
const fs = require('fs');

// request json data for popular reddit articles
rp('https://reddit.com/r/popular.json')
    .then(res => {

        // map over reddit data; create array of data objects found in 'data.children' array
        let articles = JSON.parse(res).data.children.map(item => item.data)

        // map again, find images, videos, or gifs (url begins with i or v, or contains gif in each article's main url)
        articles.map(article => {
            let img = /\/\/i/
            let vid = /\/\/v/
            let gifv = /gifv/
            let gif = /gif/

            if (gifv.test(article.url)) {
                // set readable url for gifvs & videos (main url does not open them)
                let url =article.preview.reddit_video_preview.fallback_url
                rp(url).pipe(fs.createWriteStream(`./downloads/${article.id}.gifv`))
            } else if (gif.test(article.url)) {
                rp(article.url).pipe(fs.createWriteStream(`./downloads/${article.id}.gif`))
            } else if (vid.test(article.url)) {
                let url =article.media.reddit_video.fallback_url
                rp(url).pipe(fs.createWriteStream(`./downloads/${article.id}.mp4`))
            } else if (img.test(article.url)) {
                rp(article.url).pipe(fs.createWriteStream(`./downloads/${article.id}.jpg`))
            }          
        })
    }).catch(err => console.log(err))