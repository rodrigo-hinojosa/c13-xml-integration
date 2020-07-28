import SSH2Promise = require('ssh2-promise');
import * as fs from 'fs';
import * as path from 'path';
import { Utils as utils } from '../utils';

export class ConnectSSHRemoteService {
    // -----------------------------------------------------------------------------------------------------
    // @ Private variables
    // -----------------------------------------------------------------------------------------------------
    // private sshClient: any = new SSH2Promise({
    //     host: process.env.SSH_REMOTE_HOST,
    //     port: process.env.SSH_REMOTE_PORT,
    //     username: process.env.SSH_REMOTE_USERNAME,
    //     privateKey: fs.readFileSync(process.env.SSH_PRIVATE_KEY || '')
    // });
    private sshClient: any = new SSH2Promise({
        host: 'xx',
        port: 'xx',
        username: 'xx',
        privateKey: fs.readFileSync(path.resolve(__dirname, '../../../keys/key.ppk'))
    });
    private downloadOptions: object = {
        concurrency: 640,
        chunkSize: 1024,
        step: async (chunk: any) => {
            const chunkSize: number = (chunk / 1024) / 1024;
            //console.log(`reading = ${chunkSize.toFixed(1)} MegaBytes`);
        }
    };

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
        const processStartTimeStamp = utils.getDateTime();
        const sftpConnection: any = await this.sftpConnection();
        const fileList: any = await sftpConnection.readdir(moveFrom);
        const fileListFiltered = fileList.filter((file: any) => file.filename.includes('.'));
        await this.getFilesFromRemoteUsingMultiplesThreads(sftpConnection, fileListFiltered, {
            moveFrom: moveFrom,
            moveTo: utils.createDownloadDirectory(moveTo)
        });
        // await this.getFilesFromRemoteUsingOneThread(sftpConnection, fileListFiltered, {
        //     moveFrom,
        //     moveTo: utils.createDownloadDirectory(moveTo)
        // });
        const processFinishTimeStamp = utils.getDateTime();
        return {
            status: 'OK',
            data: {
                processStartTimeStamp,
                processFinishTimeStamp,
                fileList,
                fileListFiltered
            },
            message: `Connection established and ${fileListFiltered.length} files was copied`
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
	 * Small description...
	 * @param {any} sftpConnection
     * @param {any[]} fileListFiltered
     * @param {any} paths
	 * @returns {Promise<any>}
	 */
    private async getFilesFromRemoteUsingMultiplesThreads(sftpConnection: any, fileListFiltered: any[], paths: any): Promise<any> {
        const multiplesConnections: Promise<any>[] = [];
        fileListFiltered.forEach((file: any) => {
            multiplesConnections.push(
                sftpConnection.fastGet(
                    paths.moveFrom.concat(file.filename),
                    paths.moveTo.concat(file.filename),
                    this.downloadOptions)
                    .catch((err: any) => console.log(`fastGet failed in file ${file.filename}, error: ${err}`))
            );
        });
        return Promise.all(multiplesConnections)
            .then(async () => {
                this.sshClient.close();
            })
            .catch((err: any) => console.log(`getFilesFromRemoteUsingMultiplesThreads failed, error: ${err}`));
    }

    /**
	 * Small description...
	 * @param {any} sftpConnection
     * @param {any[]} fileListFiltered
     * @param {any} paths
	 * @returns {Promise<any>}
	 */
    private async getFilesFromRemoteUsingOneThread(sftpConnection: any, fileListFiltered: any[], paths: any): Promise<any> {
        for (const file of fileListFiltered) {
            await sftpConnection.fastGet(
                sftpConnection.fastGet(
                    paths.moveFrom.concat(file.filename),
                    paths.moveTo.concat(file.filename),
                    this.downloadOptions)
                    .catch((err: any) => console.log(`fastGet failed in file ${file.filename}, error: ${err}`))
            );
        }
        return await this.sshClient.close();
    }

    /**
	 * Small description...
	 * @returns {Promise<any>}
	 */
    private async sftpConnection(): Promise<any> {
        return await this.sshClient.sftp();
    }
}