import * as fs from 'fs';
import * as path from 'path';

export class Utils {

    /**
	 * Constructor
	 */
    constructor() {
    }

    /**
	 * Small description...
	 * @returns {string}
	 */
    static getDateTime(): string {
        const i = new Date();
        return ('00' + (i.getMonth() + 1)).slice(-2) + '-' +
            ('00' + i.getDate()).slice(-2) + '-' +
            i.getFullYear() + ' ' +
            ('00' + i.getHours()).slice(-2) + ':' +
            ('00' + i.getMinutes()).slice(-2) + ':' +
            ('00' + i.getSeconds()).slice(-2);
    }

    /**
	 * Small description...
	 * @returns {string}
	 */
    static getTimeStamp(): string {
        const d = new Date();
        return ('00' + (d.getMonth() + 1)).slice(-2) +
            ('00' + d.getDate()).slice(-2) + d.getFullYear() +
            ('00' + d.getHours()).slice(-2) +
            ('00' + d.getMinutes()).slice(-2) +
            ('00' + d.getSeconds()).slice(-2);
    }

    /**
	 * Small description...
	 * @param {any} data
     * @param {string} dir
     * @param {string} fileName
     * @param {string} type
	 * @returns {void}
	 */
    static writeFileByType(data: any, dir: string, fileName: string, type: string): void {
        fs.writeFileSync(`${dir.concat(fileName)}.${type}`, data, 'utf-8');
    }

    /**
	 * Small description...
	 * @param {strng} downloadFolder
	 * @returns {string}
	 */
    static createDownloadDirectory(downloadFolder: string): string {
        const downloadDirectory = path.join(__dirname, downloadFolder);
        if (!fs.existsSync(downloadDirectory)) {
            fs.mkdirSync(downloadDirectory);
        }
        const processDir: string = `${downloadDirectory.concat(this.getTimeStamp())}`;
        if (!fs.existsSync(processDir)) {
            fs.mkdirSync(processDir);
        }
        return processDir.concat('/');
    }
}