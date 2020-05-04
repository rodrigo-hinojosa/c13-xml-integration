import { ConnectSSHRemoteService } from '../services';

export class ConnectSSHRemoteController {
    // -----------------------------------------------------------------------------------------------------
    // @ Private variables
    // -----------------------------------------------------------------------------------------------------
    private connectSSHRemoteService: ConnectSSHRemoteService = new ConnectSSHRemoteService();

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
	 * @param {string} moveFrom
     * @param {string} moveTo
	 * @returns {Promise<any>}
	 */
    async getFiles(moveFrom: string, moveTo: string): Promise<any> {
        return this.connectSSHRemoteService.getFiles(moveFrom, moveTo);
    }
}