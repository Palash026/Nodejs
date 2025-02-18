import { createServer } from 'node:http';
import { URL } from 'node:url';

const width = 20;
const height = 10;
let canvas = Array.from({ length: height }, () => Array(width).fill('.'));

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  res.setHeader('Content-Type', 'text/plain');

  if (url.pathname === '/') {
    res.end('🎨 Welcome to Pixel Art! Use /draw and /canvas to play!');

  } else if (url.pathname === '/draw') {
    const x = parseInt(url.searchParams.get('x'), 10);
    const y = parseInt(url.searchParams.get('y'), 10);
    const color = url.searchParams.get('color') || 'X';

    if (isNaN(x) || isNaN(y) || x < 0 || y < 0 || x >= width || y >= height) {
      res.end('❌ Invalid coordinates! Use /draw?x=5&y=3&color=O');
    } else {
      canvas[y][x] = color[0].toUpperCase();
      res.end(`✅ Pixel placed at (${x},${y}) with color '${color[0].toUpperCase()}'`);
    }

  } else if (url.pathname === '/canvas') {
    const canvasStr = canvas.map(row => row.join(' ')).join('\n');
    res.end(`🖼️ Pixel Canvas:\n${canvasStr}`);

  } else if (url.pathname === '/reset') {
    canvas = Array.from({ length: height }, () => Array(width).fill('.'));
    res.end('🔄 Canvas reset!');

  } else {
    res.end('❌ Unknown command! Try /draw or /canvas.');
  }
});

// Start server
server.listen(3000, '0.0.0.0', () => {
  console.log('🎨 Pixel Art Server running at http://127.0.0.1:3000');
});
