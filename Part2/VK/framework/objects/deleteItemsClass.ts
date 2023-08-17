import superagent from "superagent";
import { admin } from "../../data/credentials";
import { BaseRequest } from "../helpers/baseRequest";
import {TPutError } from "../../types/wallEditInfo";


export class DeleteItem extends BaseRequest {
    constructor(protected readonly method: string, protected readonly params: object) {
       super(method, params)
    }

    public async deleteObj() {
        return  await superagent.post(`https://api.vk.com/method/${this.method}?access_token=${admin.token}&v=${admin.version} HTTP/1.1`).query(this.params)                
    }

    public async getDelBody() {
        const item = await this.deleteObj()
        return item.body
    }

    public async getErrorCode() {
        return(await this.getDelBody() as  TPutError).error.error_code       
    }
    public async getErrorMessage() {
        return(await this.getDelBody() as  TPutError).error.error_msg     
    }
}