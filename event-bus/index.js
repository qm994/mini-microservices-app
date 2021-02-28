const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();


// middlewares
app.use(bodyParser.json());

const events = [];


app.post('/events', async (req, res) => {
    const event = req.body;

    events.push(event);

    // Post Service
    await axios.post('http://localhost:4000/events', event);
    // Comment Service
    await axios.post('http://localhost:4001/events', event);
    // Query service
    await axios.post('http://localhost:4002/events', event);
    // Moderation service
    await axios.post('http://localhost:4003/events', event);


    res.send({ status: 'OK' });
});


app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005,() => {
    console.log('Listening on port 4005!')
});