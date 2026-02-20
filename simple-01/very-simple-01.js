const dgram = require('node:dgram');

const messageParam = process.argv[2] || 'Hello from Node.js UDP client';
const hostParam = process.argv[3] || '127.0.0.1';
const portParam = Number(process.argv[4] || 41234);

if (Number.isNaN(portParam) || portParam <= 0 || portParam > 65535) {
	console.error('Invalid parameter port. Use a number between 1 and 65535.');
	process.exit(1);
}

const message = messageParam;
const host = hostParam;
const port = portParam;

console.log(`parameter message: "${message}" parameter host: "${host}" parameter port: ${port}`);



