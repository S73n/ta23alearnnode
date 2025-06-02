import axios from "axios";
import * as cheerio from 'cheerio';
import fs from 'fs';

function cacheGet(name){
    if(fs.existsSync(`./cache/${name}.html`)) {
        return fs.readFileSync(`./cache/${name}.html`);
    }
    return false;
}

function cacheSet(name, value){
    if(!fs.existsSync('./cache')){
        fs.mkdirSync('./cache');
    }
    fs.writeFileSync(`./cache/${name}.html`, value);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let baseUrl = 'https://poorlydrawnlines.com';
let url = baseUrl + '/comic';

for(let i = 0; i<10; i++){
    let name = url.replaceAll('/', '').replaceAll(':', '').replaceAll('-', '') + i;
    let data = cacheGet(name);
    
    if(!data) {
        console.log('LIVE REQUEST!!!!!!');
        await sleep(1000);
        try {
            let res = await axios.get(url);
            data = res.data;
            cacheSet(name, data);
        } catch (error) {
            console.log(`Error: ${error.message}`);
            break;
        }
    }
    
    const $ = cheerio.load(data);
    let src = $('.comic img').attr('src') || $('#comic img').attr('src') || $('.entry-content img').attr('src');
    let title = $('.comic img').attr('title') || $('.comic img').attr('alt') || $('h1').text().trim();
    
    if(src && !src.startsWith('http')) {
        src = baseUrl + src;
    }
    
    console.log(src);
    console.log(`Poorly Drawn Lines - ${title}`);
    
    // Search previous link
    let nextUrl = $('.nav-previous a').attr('href') || 
                  $('a[rel="prev"]').attr('href') ||
                  $('.prev-post a').attr('href');
                  
    if(nextUrl) {
        url = nextUrl;
        console.log(url);
    } else {
        console.log('No previous link found');
        break;
    }
}