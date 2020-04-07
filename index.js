const express = require('express');
const server = express();
const shortId = require('shortid');

server.use(express.json());

const userList = [];

server.get('/', (req, res) => {
    res.status(200).json({api: 'running...'})
});


//userList endpoint
server.get('/api/userList', (req, res) => {
    res.status(200).json(userList)
});

server.post('/api/userList', (req, res) => {
    const userData = req.body;
    userData.id = shortId.generate();
    userList.push(userData);

    res.status(201).json(userData);
});


//user:id endpoint
server.get('/api/userList/:id', (req, res) => {
    const id = req.params.id;
    const userData = userList.find((item) => item.id == id);

    userData
    ? res.status(200).json(userData)
    : res.status(400).json({ message: "could not find that user."})
});

server.delete('/api/userList/:id', (req, res) => {
    const id = req.params.id;
    const removedUser = userList.filter((item) => item.id === id);

    removedUser
    ?res.status(200).json('user removed')
    :res.status(400).json({ message: "could not find user to remove."})
});

server.put('/api/userList/:id', (req, res) => {
    
})

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`\n *** http://localhost:${PORT} says, "waddup" *** \n`)
});