"use strict";
import { test, expect } from "@jest/globals";
import { normalizeURL,getURLsFromHTML } from "./crawl.js";


test("normalize http url",()=>{
    const listUrl= ["http://blog.boot.dev/path/","http://blog.boot.dev/path"];
    const expectedOutput = "blog.boot.dev/path";
    listUrl.forEach(url=>{
        expect(normalizeURL(url)).toBe(expectedOutput);
    });
});


test("normalize https url ",()=>{
    const listUrl= ["https://blog.boot.dev/path/","https://blog.boot.dev/path"];
    const expectedOutput = "blog.boot.dev/path";
    listUrl.forEach(url=>{
        expect(normalizeURL(url)).toBe(expectedOutput);
    });
});


test("get URL from HTML",()=>{
    const htmlBody = `<!DOCTYPE html>
    <body>
        <a href="posts"><span>Go to Boot.dev</span></a>
        <a href="help"><span>Get help</span></a>
        <a href="https://google.com/"><span>google</span></a>
        </body>
    </html>`;

    const expectedOutput = ["http://blog.boot.dev/posts","http://blog.boot.dev/help","https://google.com/"];
    const baseUrl = "http://blog.boot.dev";
    expect(getURLsFromHTML(htmlBody,baseUrl)).toStrictEqual(expectedOutput);
});