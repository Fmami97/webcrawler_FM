"use strict";
import { normalizeURL,getURLsFromHTML,crawlPage,printReport } from "./crawl.js";
import {env} from "node:process"

function main(){
    if(process.argv.length < 3) {
        throw new Error("ERROR: must specify a base url as argument before proceeding")
    }
    if(process.argv.length > 3) {
        throw new Error("ERROR: too many arguments given \nspecify only one base url as argument before proceeding")
    }
    const myUrl = process.argv[2]
    crawlPage(myUrl).then(pages=>{
        printReport(pages);
    });
}

main();