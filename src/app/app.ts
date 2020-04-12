// app/app.ts
import 'module-alias/register';
import express from 'express';
import bodyParser from 'body-parser';
import { Routes } from './routes';

class App {
    // -----------------------------------------------------------------------------------------------------
    // @ Public variables
    // -----------------------------------------------------------------------------------------------------
    app: express.Application;

    // -----------------------------------------------------------------------------------------------------
    // @ Private variables
    // -----------------------------------------------------------------------------------------------------
    private routePrv: Routes = new Routes();

    /**
     * Constructor
     */
    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private config(): void {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next();
        });
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}

export default new App().app;