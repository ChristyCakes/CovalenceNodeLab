var rp = require('request-promise');
const path = require('path');
const fs = require('fs');

let dataPath = path.join(__dirname, './popular-articles.json')

rp('https://reddit.com/r/popular.json')
    .then(res => {

        // first show all reddit data to see how to parse
        // fs.writeFile(dataPath, res, err => { if (err) console.log(err) })

        // iterate over reddit data; map the data we want (article information) to a new array of objects
        let articles = JSON.parse(res).data.children.map(item => item.data)     // (JSON.parse() converts JSON string/text to JS object)

        // iterate again, destructure objects; map each article object's title, url, and author to a new array
        let articleInfo = articles.map(article => (({title, url, author}) => ({title, url, author}))(article))

        // write to file
        fs.writeFileSync(dataPath, JSON.stringify(articleInfo, null, 2), err => {if (err) console.log(err) })

    }).catch(function (err) {
        console.log(err)
    })