const http = require('http');
const fs = require('fs');
const port = 8080;

const server = http.createServer(function(req, res) {
    fs.readFile('src/index.html', function(error, data) {
        if (error) {
            fs.readFile('src/404.html', function(error, data) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                if (error) {
                    res.write('Error: File Not Found');
                } else {
                    res.write(data);
                }
                res.end();
            })
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    })
})

server.listen(port, function(error) {
    if (error) {
        console.log('Error: ', error);
    } else {
        console.log('Server is listening on port ' + port);
    }
})