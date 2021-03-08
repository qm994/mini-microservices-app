const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

// middlewares
app.use(bodyParser.json())
app.use(cors())

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts); 
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    if(!title) {
        res.status(405).send('The body is wrong!')
    }
    posts[id] = {
        id, title
    };

    // emit the event local event-bus service: http://localhost:4005/events
    // emit the event minikube event-bus pod: http://event-bus-srv:4005/events
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: posts[id]
    });

    res.status(201).send(posts[id]);

});


//
app.post('/events', (req, res) => {
    console.log('Received Event!', req.body.type);
    res.send({})
});


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Post service listening on port ${PORT}`)
});