const dgram = require('node:dgram');
const net = require('node:net');

const messageParam = process.argv[2] || 'Hello from Node.js UDP client';
const hostParam = process.argv[3] || '127.0.0.1';
const portParam = Number(process.argv[4] || 41234);

if (Number.isNaN(portParam) || portParam <= 0 || portParam > 65535) {
	console.error('Invalid parameter port. Use a number between 1 and 65535.');
	process.exit(1);
}

function isValidHostname(hostname) {
	if (!hostname || hostname.length > 253) {
		return false;
	}

	const labels = hostname.split('.');    // Split the hostname into labels "." is the separator for labels in a hostname
	return labels.every((label) => {
		if (!/^[a-zA-Z0-9-]{1,63}$/.test(label)) {
			return false;
		}

		return !label.startsWith('-') && !label.endsWith('-');
	});
}

const hostIsIp = net.isIP(hostParam) !== 0;
const hostIsName = isValidHostname(hostParam);
if (!hostIsIp && !hostIsName) {
	console.error('Invalid parameter host. Use a valid hostname or IP address.');
	process.exit(1);
}


const message = messageParam;
const host = hostParam;
const port = portParam;

console.log(`parameter message: "${message}" parameter host: "${host}" parameter port: ${port}`);

function sendMessageTcp(hostname, portNumber, payload) {
	return new Promise((resolve, reject) => {
		const client = net.createConnection({ host: hostname, port: portNumber }, () => {
			client.write(payload, (writeError) => {
				if (writeError) {
					reject(writeError);
					client.destroy();
					return;
				}

				client.end();
				resolve();
			});
		});

		client.on('error', (connectionError) => {
			reject(connectionError);
		});
	});
}

async function runTcpClient() {
	try {
		await sendMessageTcp(host, port, message);
		console.log(`TCP message sent to ${host}:${port}`);
	} catch (error) {
		console.error(`TCP send failed: ${error.message}`);
		process.exit(1);
	}
}

runTcpClient();



