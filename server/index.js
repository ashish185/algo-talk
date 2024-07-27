import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const ACTIONS = {
    JOIN: "join",
    JOINED: "joined",
    DISCONNECTED: "disconnected",
    CODE_CHANGE: "code-change",
    SYNC_CODE: "sync-code",
    LEAVE: "leave",
  };

const httpServer = http.createServer(express());
const io = new Server(httpServer);

const socketIdUserNameMap = {};

const getAllConnectedUserName = (roomId) => {
    const setOfSocketsId = io.sockets.adapter.rooms.get(roomId); //It will set of socket Ids Ex {'lRNNZxMVTdQ37dd7AAAI',}
    console.log('setOfSocketsId', setOfSocketsId);
    const mappedArr = [...setOfSocketsId].map(socketId => ({
        socketId,
        userName: socketIdUserNameMap[socketId]
    }));
    return mappedArr;
}

io.on('connection', (socket) => {
    socket.on('join', ({ roomId, userName }) => {
        socket.join(roomId); //If same id exists it joins with rooms, otherwise not exists then create it.
        console.log('connection socket id', socket.id);
        socketIdUserNameMap[socket.id] = userName;
        const clients = getAllConnectedUserName(roomId);
        clients.forEach(({ socketId }) => io.to(socketId).emit('joined', {
            clients,
            userName,
            socketId
        }));
        console.log('clients', clients);
    })

    // sync the code
    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        console.log('sync code at server', code);
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('disconnected', {
                socketId: socket.id,
                userName: socketIdUserNameMap[socket.id]
            })
        });
        delete socketIdUserNameMap[socket.id];
        socket.leave();
    });
})

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log('Server is running');
})