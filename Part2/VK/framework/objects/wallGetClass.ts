import { TPostGetData } from "../../types/wallEditInfo";
import { BaseRequest } from "../helpers/baseRequest";


export class WallGet extends BaseRequest {
    constructor( protected readonly params?: object) {
        super('wall.get', params)
    }

    public async getResponse() {
        return (await this.getBody() as TPostGetData).response
    }

    public async getItems() {
        return (await this.getResponse()).items[0]
    }

    public async getText() {
        return (await this.getItems()).text
    }
    public async getAttachments() {
        return (await this.getItems()).attachments[0].type
    }
}