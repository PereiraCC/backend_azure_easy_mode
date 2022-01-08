import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import categoriesRoute from '../routes/categories';
import modulesRoute    from '../routes/modules';
import unitsRoute      from '../routes/units';

class Server {

    private app : Application;
    private port : string;
    private apiPaths = {
        categories : '/api/categories',
        modules    : '/api/modules',
        units      : '/api/units',
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

        // Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    routes() {
        this.app.use( this.apiPaths.categories, categoriesRoute );
        this.app.use( this.apiPaths.modules, modulesRoute );
        this.app.use( this.apiPaths.units, unitsRoute );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }

}

export default Server;