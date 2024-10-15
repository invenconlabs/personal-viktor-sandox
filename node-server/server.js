
const WebSocket = require('ws');

const PORT = 8080; // You can change this port if needed
const INTERVAL = process.argv[2]; // Interval in milliseconds (N milliseconds)
console.log('interval: ', INTERVAL);
if (!INTERVAL) {
    throw Error('No interval specified')
}
const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`WebSocket server is listening on ws://localhost:${PORT}`);
});

wss.on('connection', (ws) => {
    console.log('New client connected');

    // Send data every N milliseconds
    const intervalId = setInterval(() => {
        const data = {
            timestamp: new Date().getTime(),
            value: Math.random(),
        };

        const json = JSON.stringify(data);
        ws.send(json);
        console.log('sent: ', json)
    }, INTERVAL);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(intervalId); // Stop sending data when the client disconnects
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});
