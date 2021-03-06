import { ConsumeRemoteAPIService } from '../services';

export class ConsumeRemoteAPIController {
    // -----------------------------------------------------------------------------------------------------
    // @ Private variables
    // -----------------------------------------------------------------------------------------------------
    private consumeRemoteAPIService: ConsumeRemoteAPIService = new ConsumeRemoteAPIService();

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
	 * @param {string} user
     * @param {string} password
	 * @returns {Promise<any>}
	 */
    async getData(uri: string, user: string, password: string): Promise<any> {
        return this.consumeRemoteAPIService.getData(uri, user, password);
    }
}