// Part 1

const path = require('path');
const fs = require('fs');

let chirps = [
    { "Nov 30": "Happy 95th Birthday to my Grandma Joan" },
    { "Dec 31" : "Who wants to meet me at the ridge for midnight fireworks?" },
    { "Feb 28" : "Ready for winter to be over"},
    { "Sept 7" : "The ocean was so warm at Redondo Beach today; didn't need a wetsuit!"},
    { "Oct 31" : "For the 80s theme, should I dress up as Pat Benatar or Cyndi Lauper?"}
]

// create a path 
let filePath = path.join(__dirname, '../chirps.json')

// option1: write contents of chirps array to empty chirps json file or nonexistant json file
fs.writeFileSync(filePath, JSON.stringify(chirps, null, 2), 'utf-8', err => console.log(err))

// option 2: append contents of chirps array to end of existing json file
//fs.appendFileSync(filePath, JSON.stringify(chirps), 'utf-8', err => console.log(err))

//option 3: add contents of chirps array here to existing chirps array in json
 fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) console.log(err)
    
  //  a. convert contents to js
    let chirpsJS = JSON.parse(data)

    //b. push new contents --- but results in nested array !!
    chirpsJS.chirps.push(chirps)

    //c. convert data back to JSON, write to file
    fs.writeFile(filePath, JSON.stringify(chirpsJS, null, 2), 'utf-8', (err) => {
        if (err) console.log(err)
    })
})



// read file, output chirps to console
fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) console.log(err)
    console.log(data)
})