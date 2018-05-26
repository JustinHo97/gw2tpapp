const request = require("request");
const fs = require("fs");

const scrape = () => {
    const max_page = 125;
    let count = 0;
    let data = [];
    for (let page = 0; page < max_page; page++) {
        request(`https://api.guildwars2.com/v2/commerce/prices?page=${page}&page_size=200`, (error, response, body) => {
            console.log("scrape page " + page);
            let newdata = data.concat(body);
            count++
            if (count = max_page){
                save(newdata);
            }
        });
    }
    console.log(data);
}
const save = (data) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
    let hr = today.getHours();


    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = yyyy + '-' + mm + '-' + dd + '-' +  hr;
    fs.writeFile("./scrapes/" + today + '.json', data, (err) => {
        if (err) throw err;
        console.log("scraped data");
    });
}
scrape();