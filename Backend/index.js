//importing express
const http = require("http")
const express = require("express");
const { Server } = require("socket.io");
// const UserRouter =require('./Routers/userRouter');
const cors = require('cors');

const UserRouter = require('./routers/UserRouter')
const RoomRouter = require('./routers/RoomRouter')

//initialising express
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});
const port = 5000;


app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use('/user', UserRouter);

app.use(express.json());
app.use('/room', RoomRouter);


io.on("connection", (socket) => {
    console.log("A New User Connected", socket.id);

    socket.on("message", (data) => {
        console.log(data);
        io.emit("recieve-message", data);


    });

    socket.on('join-room', (room) => {
        socket.join(room);
    })

    socket.on('disconnect', () => {
        console.log("user disconnected", socket.id);

    })

    socket.on('set-question', ({ room, question }) => {
        console.log(question + ' in room ' + room);

        socket.in(room).emit('get-question', question);
    })

    socket.on('submit-poll', ({ room, poll }) => {
        console.log(poll, room);
        
        socket.in(room).emit('rec-poll', poll);
    })


});
//middleware
app.use(cors({
    origin: '*'
}

));
app.use(express.json());
// app.use('/user', UserRouter);

//socket.io


//route or endpoint 
app.get('/', (req, res) => {
    res.send('Response from express');
});


server.listen(port, '0.0.0.0', () => { console.log('server started') });