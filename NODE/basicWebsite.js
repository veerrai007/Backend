import http, { createServer } from "http";
import fs from 'fs';

const server = createServer((req,res)=>{
    res.setHeader=('Content-Type','text/html')
    if (req.url=="/about") {     
        res.statusCode=200;
        res.end("<h1>Home</h1>")
    }
    else if (req.url=="/sample"){
        const data = fs.readFileSync("sample.html")
        res.end(data)
    }
    else{
        res.statusCode=404
        res.end("<h1>Not Found</h1>")
    }
})

server.listen('8000',()=>{
    console.log('listening');
})
