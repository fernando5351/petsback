const express = require('express');
const cors = require('cors');
const routesHandler = require('./routes/routes');
const { isBoomError } = require('../middleware/errorHandler');
const app = express();
const server = require('http').Server(app);
const WebSocketServer = require('websocket').server;
const port = process.env.PORT || 3000;
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

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
    if(origin === "http://localhost:3000"){
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

//swagger documentation
const yamlFilePath = path.join(__dirname, '../doc/swagger.yaml');
let yamlObject;
try {
    const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');
    yamlObject = yaml.load(yamlContent);
} catch (error) {
    console.error('Error al leer el archivo YAML:', error);
}
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(yamlObject));


routesHandler(app);
require('./auth');

app.use(isBoomError);

module.exports = {
    server,
    app
};
