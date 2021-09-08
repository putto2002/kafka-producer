const WebSocket = require('ws');
const Kafka = require('node-rdkafka');
require('dotenv').config();


// Instantiate the producer object
const producer = new Kafka.Producer({
    'bootstrap.servers': process.env.BOOTSTRAP_SERVER,
    'sasl.username': process.env.SASL_USERNAME,
    'sasl.password': process.env.SASL_PASSWORD,
    'security.protocol': process.env.SECURITY_PROTOCOL,
    'sasl.mechanisms': process.env.SASL_MECHANISMS,
    'dr_msg_cb': true
});

// Connect tteh producer to the broker 
producer.connect();

// Wait for the ready event before proceeding
producer.on('ready', () => {
    console.log('Producer is ready');

    // Initalise WebSocket
    const ws = new WebSocket(process.env.WEBSOCKET_SERVER);
    ws.on('open', () => {
        console.log('Connected to socket server');
        // Perform a websocket handshake
        ws.send(JSON.stringify({ 'type': 'subscribe', 'symbol': process.env.CRYPTO_SYMBOL }), () => {
            console.log('Handshake Performed');
        });
        ws.on('message', (message) => {
            message = JSON.parse(message);
            if (message.data !== undefined) {
                try {
                    const key = 'ADAUSDT';
                    const value = Buffer.from(JSON.stringify(message.data[0]));
                    producer.produce(process.env.TOPIC, -1, value, key);
                    console.log(`Producing record with key: ${key}, value: ${value}`)
                } catch (err) {
                    console.error('Something wnet wrong');
                    console.error(err);
                }
            }
        })
    })
})

producer.setPollInterval(100);