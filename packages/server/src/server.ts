import http from 'node:http';
import dns from 'node:dns';
import app from './app.js';

// Workaround from https://stackoverflow.com/a/72416352/599991
dns.setDefaultResultOrder('ipv4first');

const port = process.env.PORT || '3000';
const server = http.createServer(app);

server.listen(port, () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
  console.info('Listening on ' + bind);
});

export default server;
