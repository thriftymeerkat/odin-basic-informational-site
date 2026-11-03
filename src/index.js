const http = require('http');
const fs = require('fs');

const port = 8080;

const server = http.createServer(function(req, res) {

    let path = new URL(req.url, `http://${req.headers.host}`).pathname;

    if (path === '/') {
        path = '/index.html';
    }

    switch (path) {
        case '/index.html':
        case '/about.html':
        case '/contact-me.html':
        case '/404.html':
            
            fs.readFile('src' + path, function(error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 - File Not Found!');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            break;
        
        case '/styles.css':

            fs.readFile('src/styles.css', function(error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 - File Not Found!');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
            break;

        default:
            fs.readFile('src/404.html', function(error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 - File Not Found!');
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            break;
    }
});

server.listen(port, function(error) {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
});