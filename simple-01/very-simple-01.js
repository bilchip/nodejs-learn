const dgram = require('node:dgram');

const message = process.argv[2] || 'Hello from Node.js UDP client';
const host = process.argv[3] || '127.0.0.1';
const port = Number(process.argv[4] || 41234);

if (Number.isNaN(port) || port <= 0 || port > 65535) {
	console.error('Invalid port. Use a number between 1 and 65535.');
	process.exit(1);
}

const client = dgram.createSocket('udp4');
const payload = Buffer.from(message, 'utf8');

client.send(payload, port, host, (error) => {
	if (error) {
		console.error('Failed to send UDP message:', error.message);
		client.close();
		process.exit(1);
	}

	console.log(`Sent "${message}" to ${host}:${port}`);
	client.close();
});
