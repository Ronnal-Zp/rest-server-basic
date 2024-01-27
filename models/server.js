const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./../database/config')

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT ?? 8080;
        this.paths = {
            authPath: '/api/auth',
            usuariosPath: '/api/users',
            categoriesPath: '/api/categories'
        }

        // Conectar a DB
        this.connectionToDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectionToDB () {
        await dbConnection()
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.paths.usuariosPath, require('../routes/users'));
        this.app.use( this.paths.authPath, require('../routes/auth'));
        this.app.use( this.paths.categoriesPath, require('../routes/categories'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
