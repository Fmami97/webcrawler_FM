"use strict"
import {JSDOM} from "jsdom";



/**
 * normalize the given url in order to use it
 * @param {string} url  
 */
function normalizeURL(url){
   return url.replace(/^https*:\/\//,"").replace(/\/$/,"");
}

/**
 *  uses JSDOM to return un-normalized url from the given html body
 *  @param {string} htmlBody may contain <a> anchors with relative paths ex: /posts
 *  @param {string} baseUrl allows us to convert relative paths to absolute paths  ex: with https://mygame.org we would get https://mygame.org/posts 
 */
function getURLsFromHTML(htmlBody,baseUrl){
    const dom = new JSDOM(htmlBody,{url:baseUrl,contentType:"text/html"})
    const links = dom.window.document.querySelectorAll("a");
    
    let urls = [];
    links.forEach((a)=>{
        urls.push(a.href)
    })
    return urls;
} 


/**
 * fetches the html page as a text by using the provided url
 * @param {string} url 
 * @returns {string} the html page as text/html 
 * @throws {Error} in case the response status is an error. 
 */
async function getHTMLFromURL(url){
    const params = { method: 'GET',
               mode: 'cors',
               Headers:{'contentType':"text/html"},
               cache: 'default' };

    return fetch(url,params).then((response)=>{
        if(response.status >= 400 || !response.ok){
            throw new Error(response.statusText);
        }
        return response.text()
    }).then((htmlBody)=>{return htmlBody});
}

/**
 * 
 * @param {string} baseURL root of the url we are looking into
 * @param {string} currentURL  the same as baseURL, then changes on recursivity
 * @param {object} pages keeps track of all pages, must always return an updated version of this object 
 * @returns {object} pages
 */
 async function crawlPage(baseURL,currentURL=baseURL,pages={}){

    
    const baseNormalized = normalizeURL(baseURL);
    const currentNormalized = normalizeURL(currentURL);
    if(!currentNormalized.includes(baseNormalized)){
        return pages
    }
    
    if(pages[currentNormalized] !== undefined){
        pages[currentNormalized]+=1;
        return pages;
    }

    pages[currentNormalized] = 1;

    try{
        let htmlBody = await getHTMLFromURL(currentURL);
        
        const urls = getURLsFromHTML(htmlBody,baseURL);
        urls.forEach( async url=>{
            
            let newPages = await crawlPage(baseURL,url,pages);
            pages = newPages;
            
        });
    }
    catch(error){
        console.log(error);
    }
    return pages
}

/**
 * gives a human readable output of the results obtained with the crawlPage function
 * @param {object} pages 
 */
function printReport(pages){
    Object.entries(pages).forEach(entry=>{
        const url = entry[0];
        const count = entry[1];
        const pluralCondition = count>1?'s':'';
        console.log("Found %d internal link%s to %s",count,pluralCondition,url);
    });
}

export { normalizeURL,getURLsFromHTML ,crawlPage,printReport};