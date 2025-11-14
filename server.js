// Simple local development server
// Run with: node server.js

const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Import the API handler
const allDataHandler = require('./api/all-data.js');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.otf': 'font/otf',
    '.ttf': 'font/ttf',
    '.webp': 'image/webp'
};

const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Handle API endpoint
    if (req.url === '/api/all-data' || req.url === '/api/all-data/') {
        try {
            // Create a Vercel-compatible response wrapper
            const vercelRes = {
                status: (code) => {
                    vercelRes._statusCode = code;
                    return vercelRes;
                },
                json: (data) => {
                    res.writeHead(vercelRes._statusCode || 200, { 
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    });
                    res.end(JSON.stringify(data));
                },
                end: () => {
                    res.end();
                },
                setHeader: (name, value) => {
                    res.setHeader(name, value);
                },
                writeHead: (code, headers) => {
                    res.writeHead(code, headers);
                },
                _statusCode: 200
            };
            
            await allDataHandler(req, vercelRes);
            return;
        } catch (error) {
            console.error('API Error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: error.message }));
            return;
        }
    }

    // Serve static files from public/
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, 'public', filePath);

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, try serving index.html for SPA routing
                fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1>', 'utf-8');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🎵 Ditto X Schedule App - Local Development Server');
    console.log('================================================');
    console.log(`✅ Server running at http://localhost:${PORT}/`);
    console.log(`✅ API available at http://localhost:${PORT}/api/all-data`);
    console.log('');
    console.log('Press Ctrl+C to stop');
});
