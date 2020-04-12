import { ConsumeRemoteAPIService } from '@services';

export class ConsumeRemoteAPIController {
    // -----------------------------------------------------------------------------------------------------
    // @ Private variables
    // -----------------------------------------------------------------------------------------------------
    private consumeRemoteAPIService: ConsumeRemoteAPIService = new ConsumeRemoteAPIService();

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    async getData(uri: string, user: string, password: string): Promise<any> {
        return this.consumeRemoteAPIService.getData(uri, user, password);
    }
}