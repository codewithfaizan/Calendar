import http from 'http';
import fs from 'fs';
import config  from "config"

const server = http.createServer((req, res) => {
  const filePath = path.join(config.get('staticFilesDirectory'), req.url);
  const stream = fs.createReadStream(filePath);

  stream.on('error', (err) => {
    if (err.code === 'ENOENT') {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(500);
      res.end('Server Error');
    }
  });

  stream.pipe(res);
});

const PORT = config.get("PORT") || 80;
console.group(PORT)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
