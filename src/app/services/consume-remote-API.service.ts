import axios from 'axios';
import xml2JsonParser from 'xml2json';

export class ConsumeRemoteAPIService {

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
	 * @param {string} uri
     * @param {string} password
	 * @returns {Promise<any>}
	 */
    async getData(uri: string, user: string, password: string): Promise<any> {
        const credentialsEncoding: string = `Basic ${Buffer.from(user.concat(':').concat(password)).toString('base64')}`;
        const xmlData = await this.getXMLData(uri, credentialsEncoding);
        // documentation https://www.npmjs.com/package/xml2json
        const xml2JsonParserOptions: any = {
            object: true,
            reversible: false,
            coerce: true,
            sanitize: true,
            trim: true,
            arrayNotation: false,
            alternateTextNode: false
        };
        return xml2JsonParser.toJson(xmlData.data, xml2JsonParserOptions);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
	 * Small description...
	 * @param {string} uri
     * @param {string} credentialsEncoding
	 * @returns {Promise<any>}
	 */
    private async getXMLData(uri: string, credentialsEncoding: string): Promise<any> {
        return await axios.get(uri, {
            headers: { Authorization: credentialsEncoding }
        });
    }
}