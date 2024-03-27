const path = require('path');
const express = require('express');
const cors = require('cors');
const routesHandler = require('./routes/routes');
const { isBoomError } = require('../middleware/errorHandler');
const app = express();
const server = require('http').Server(app);
const WebSocketServer = require('websocket').server;
const port = process.env.PORT || 3000;

// Creamos el servidor de sockets y lo incorporamos al servidor de la aplicación
const wsServer= new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

app.set('port', port);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

function originIsAllowed(origin) {
    if(origin=== "http://localhost:3000"){
        return true;
    }
    return false;
}

wsServer.on("request", (request) =>{
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Conexión del origen ' + request.origin+ ' rechazada.');
        return;
    }
    const connection = request.accept(null,request.origin);
    connection.on("message", (message) => {
        console.log("Mensaje recibido: " + message.utf8Data);
        connection.sendUTF("Recibido: " + message.utf8Data);
    });
    connection.on("close", (reasonCode, description) => {
        console.log("El cliente se desconecto");
    });
});

routesHandler(app);
require('./auth');

app.use(isBoomError);

module.exports = {
    server,
    app
};
