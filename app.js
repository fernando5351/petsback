const { server, app } = require('./src/index');
const { isDevelopment } = require('./config')

server.listen(app.get('port'), () =>{
    try {
        !isDevelopment ? '' : console.log('Servidor iniciado en http://localhost:' + app.get('port'));
    } catch (error) {
        console.log(error);
    }
})
