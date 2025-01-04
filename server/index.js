import express from 'express';
import 'dotenv/config';
import { Server } from 'socket.io';
import { createServer } from 'http';
import * as path from 'path';
import cors from 'cors';

const port =process.env.PORT || 4000;

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));

const server = createServer(app);

//---
const __dirname1=path.resolve();
console.log(toString(__dirname1));
if(process.env.NODE_ENV==="production")
{
    app.use(express.static(path.join(__dirname1,"../chat-web/web-chat/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname1, "../chat-web/web-chat/dist/index.html"))
    })
}else
{
    app.get("/",(req,res)=>{
        res.send("API is running successfully");
    })
}
//---
const io = new Server(server, {
    cors: {
        origin:["http://localhost:5173", "http://localhost:5173/chat"],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
    },
});

io.on("connection", (socket) => {
    console.log("user connected", socket.id)

    // Chat room events
    socket.on("message", ({ room, message="Join a room", username }) => {
        console.log(`Message in room ${room} from ${username}: ${message}`);
        if (room) {
            socket.to(room).emit("receive-message", { message, username });
        }
    });

    socket.on("join-room", ({ room, username }) => {
        socket.join(room);
        console.log(`User ${username} (${socket.id}) joined ${room}`);
        socket.emit('room-joined', room);
        
        socket.to(room).emit("receive-message", { message: `${username} has joined the room.`, username: "Server" });
    });

    // Video room events
    // socket.on("room:join", (data) => {
    //     const { email, room } = data;
    //     socket.join(room);
    //     socket.to(room).emit("user:joined", { email, id: socket.id });
    //     socket.emit("room:join", data);
    // });

    // socket.on("user:call", ({ to, offer }) => {
    //     socket.to(to).emit("incomming:call", { from: socket.id, offer });
    // });

    // socket.on("call:accepted", ({ to, ans }) => {
    //     socket.to(to).emit("call:accepted", { from: socket.id, ans });
    // });

    // socket.on("peer:nego:needed", ({ to, offer }) => {
    //     socket.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    // });

    // socket.on("peer:nego:done", ({ to, ans }) => {
    //     socket.to(to).emit("peer:nego:final", { from: socket.id, ans });
    // });

    socket.on("disconnect", () => {
        console.log("User disconnected ", socket.id);
        
        socket.rooms.forEach(room => {
            if (room !== socket.id) {
                io.to(room).emit("receive-message", { message: `A user has left the room.`, username: "Server" });
            }
        });
    });
});

// Add basic health check route
app.get('/', (req, res) => {
    res.send('Server is running');
});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
