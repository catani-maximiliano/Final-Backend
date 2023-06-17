const express = require("express");
const morgan = require('morgan');
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const router = require("../router");
const cors = require('cors');
const loggerMiddleware = require("../middlewares/logger.middlewares");

const { MongoChatManager } = require('../dao/mongoClassManagers/chatClass/chatMongoManager');
const chatMongo = new MongoChatManager();



app.use(express.json());
app.use(cors())
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../public"));

app.use(loggerMiddleware)

global.io = io;

router;

io.on('connection', socket => {
    console.log(`New client with id ${socket.id}`);

    /**Este código utiliza la biblioteca Socket.IO para escuchar el evento 'newUser' y luego emitir un evento 
     * 'bienvenida' con el objeto del usuario como argumento. Luego, obtiene todos los mensajes almacenados en 
     * la base de datos mediante la función 'getMesagges' y emite el evento 'messageLogs' con los mensajes a través 
     * del objeto 'io' que representa a todos los clientes conectados al servidor.

En resumen, cada vez que un nuevo usuario se conecta al servidor, se le envía un mensaje de bienvenida y se le muestran 
todos los mensajes almacenados en la base de datos a través del evento 'messageLogs'. */
    socket.on('newUser', async user => {
        socket.emit('bienvenida', user);
        const mesagges = await chatMongo.getMesagges()
        io.emit("messageLogs", mesagges)

      })

      /**Este código utiliza el objeto socket de Socket.IO para manejar eventos de comunicación en tiempo real entre el
       *  servidor y los clientes.

El evento "newUser" se emite cuando un nuevo usuario se une al chat. Cuando se recibe este evento, el servidor emite un 
evento "bienvenida" al mismo socket y luego recupera todos los mensajes existentes desde una base de datos (usando la función
   getMesagges del objeto chatMongo) y los emite a todos los clientes conectados a través del evento "messageLogs".

El evento "message" se emite cuando un cliente envía un mensaje. Cuando se recibe este evento, el servidor guarda el 
mensaje en la base de datos (usando la función saveMesagge del objeto chatMongo), recupera todos los mensajes actualizados 
y los emite a todos los clientes conectados a través del evento "messageLogs". */
    socket.on('message', async data => {
        const saveMessageDB = await chatMongo.saveMesagge(data)
        const mesagges = await chatMongo.getMesagges()
        io.emit("messageLogs", mesagges)
      })

      /**Este es un manejador de eventos para cuando un cliente se desconecta del socket.  */
    socket.on('disconnect', () => {
        console.log('socket disconnected');
      });
});

module.exports = { server, io, app };