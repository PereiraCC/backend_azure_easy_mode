import express, { Application } from 'express';
import cors from 'cors';

import categoriesRoute from '../routes/categories';

class Server {

    private app : Application;
    private port : string;
    private apiPaths = {
        categories: '/api/categories'
    };

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8083';

        // Middlewares
        this.middlewares();

        // Set Routes
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Reader body
        this.app.use( express.json() );

        // Share folder
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.apiPaths.categories, categoriesRoute );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }

}

export default Server;