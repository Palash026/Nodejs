import { createServer } from 'node:http';
import { URL } from 'node:url';

// Helper function to parse request body
const parseJSONBody = async (req) => {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        resolve(null);
      }
    });
  });
};

// Create server with multiple APIs
const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Set default headers
  res.setHeader('Content-Type', 'application/json');

  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
  
  } else if (url.pathname === '/api/time') {
    res.end(JSON.stringify({ time: new Date().toISOString() }));

  } else if (url.pathname === '/api/greet') {
    const name = url.searchParams.get('name') || 'Guest';
    res.end(JSON.stringify({ message: `Hello, ${name}!` }));

  } else if (url.pathname === '/api/echo' && req.method === 'POST') {
    const body = await parseJSONBody(req);
    if (body) {
      res.end(JSON.stringify({ echo: body }));
    } else {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
    }

  } else if (url.pathname === '/api/random') {
    res.end(JSON.stringify({ random: Math.random() }));

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

// Start server
server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000');
});
