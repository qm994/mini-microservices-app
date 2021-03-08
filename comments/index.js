const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();

// middlewares
app.use(bodyParser.json())
app.use(cors())


const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const comments = commentsByPostId[req.params.id];
    if(!comments) {
        return res.status(404).send('The comment/post not exitsed')
    };
    return res.status(200).send(comments || []);
});

// post a comment for specific post
app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    if(!content) {
        return res.status(405).send('The body is wrong!')
    };

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[req.params.id] = comments;

    // Send event to event bus(the event bus will send the event to query and moderation serivce)
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: "pending"
        }
    });

    return res.status(201).send(comments);
});


app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    // Once receive the CommentModerated from event bus
    // update the comment and send CommentUpdated to event bus(which will redirect to query )
    if(type === 'CommentModerated') {
        const { id, content, postId, status } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id
        });
        comment.status = status;

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                content,
                postId,
                status
            }
        });
    };
    res.send({})
});

const PORT = 4001;

app.listen(PORT, () => {
    console.log(`Post service listening on port ${PORT}`)
});