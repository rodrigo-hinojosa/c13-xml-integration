import { Request, Response } from 'express';
import { ConsumeRemoteAPIController, ConnectSSHRemoteController } from '../controllers';

export class Routes {
    // -----------------------------------------------------------------------------------------------------
    // @ Private variables
    // -----------------------------------------------------------------------------------------------------
    private consumeRemoteAPIController: ConsumeRemoteAPIController = new ConsumeRemoteAPIController();
    private connectSSHRemoteController: ConnectSSHRemoteController = new ConnectSSHRemoteController();

    /**
	 * Constructor
	 */
    constructor() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
	 * Small description...
	 * @param {any} app
	 * @returns {void}
	 */
    routes(app: any): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send('Hello World');
            });
        app.route('/getXmlDataByType')
            .post((req: Request, res: Response, next: any) => {
                this.consumeRemoteAPIController.getData(req.body.url, req.body.user, req.body.password)
                    .then((response: any) => {
                        res.status(200).json(response);
                    })
                    .catch((err: any) => next(err));
            });
        app.route('/connectSSH')
            .post((req: Request, res: Response, next: any) => {
                this.connectSSHRemoteController.getFiles(req.body.moveFrom, req.body.moveTo)
                    .then((response: any) => {
                        res.status(200).json(response);
                    })
                    .catch((err: any) => next(err));
            });
    }
}