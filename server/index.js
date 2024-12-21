import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const ACTIONS = {
    JOIN: "join",
    JOINED: "joined",
    DISCONNECTED: "disconnected",
    CODE_CHANGE: "code-change",
    SYNC_CODE: "sync-code",
    LEAVE: "leave",
};
const app = express();
const httpServer = http.createServer(app);
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
console.log(__filename)

const dir = __dirname.split('server').join('');
console.log('dir', dir);
console.error('**********************process.env.ENVIRONMENT', process.env.ENVIRONMENT);
console.log('process.env.ENVIRONMENT', process.env.ENVIRONMENT);

app.use(express.static(path.join(dir, "../client/build")));

// Handle requests by serving index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(dir, "client", "build", "index.html"))
});

//if (process.env.ENVIRONMENT === "production") {
// if ("production") {
//   app.use(express.static(path.join(dir, "../client/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(dir, "client", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }


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