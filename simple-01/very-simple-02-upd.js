const dgram = require('node:dgram');  // Import the 'dgram' module to work with UDP sockets in Node.js

const message = process.argv[2] || 'Hello from Node.js UDP client'; // Get the message from command-line arguments or use a default message if none is provided
const host = process.argv[3] || '127.0.0.1';
const port = Number(process.argv[4] || 41234);

// Validate the port number to ensure it's within the valid range (1-65535)
if (Number.isNaN(port) || port <= 0 || port > 65535) {
	console.error('Invalid port. Use a number between 1 and 65535.');
	process.exit(1);
}

const client = dgram.createSocket('udp4');    // Create a UDP socket using IPv4
const payload = Buffer.from(message, 'utf8'); // Convert the message string into a Buffer using UTF-8 encoding

client.send(payload, port, host, (error) => { // Send the UDP message to the specified host and port, and handle the callback for success or error
	if (error) {  // Handle any errors that occur during the send operation
		console.error('Failed to send UDP message:', error.message);
		client.close();
		process.exit(1);
	}

	console.log(`Sent "${message}" to ${host}:${port}`); // Log a success message indicating the message was sent
	client.close(); // Close the UDP socket
});
