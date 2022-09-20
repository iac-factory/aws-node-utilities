import { AWS } from ".";
import { Credential } from ".";

/***
 * API Client
 */

class Service extends Credential {
    /*** AWS S3 API Client */
    service?: AWS.Types["Client"]["S3"];

    credentials?: AWS.INI;

    override profile: string;

    /***
     * Given AWS-V3 Change(s), `await Client.initialize()` must be called
     * after classful initialization.
     *
     * @param {string} profile
     *
     * @private
     * @constructor
     *
     */

    private constructor(profile: string = "default") {
        super(profile);

        this.profile = profile;
    }

    /***
     * Populate the instance `$.service`, and return a callable, functional S3 API Client
     *
     * @returns {Promise<Types.Client>}
     *
     */

    static async initialize(profile: string = "default") {
        const client = new Service(profile);
        const credentials = await client.settings();

        client.id = credentials.accessKeyId;
        client.key = credentials.secretAccessKey;

        client.credentials = {
            profile: client.profile,
            accessKeyId: client.id,
            secretAccessKey: client.key
        };

        client.service = new AWS.Interface.Client.S3( { ... client.credentials }  );

        return client.service;
    }
}

export const Client = Service.initialize;

export default Client;