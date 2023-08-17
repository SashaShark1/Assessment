import superagent from "superagent";
import { admin } from "../../data/credentials";
import {TPostEditData, TPutError } from "../../types/wallEditInfo";
import { BaseRequest } from "../helpers/baseRequest";


export class WallEdit extends BaseRequest {
    constructor( protected readonly data: TPostEditData) {
        super('wall.edit')
    }

    public async editComment() {
        return  await superagent.post(`https://api.vk.com/method/${this.method}?access_token=${admin.token}&v=${admin.version} HTTP/1.1`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(this.data)                
    }

    public async getEditBody() {
        const edit = await this.editComment()
        return edit.body
    }

    public async getEditStatus() {
        const edit = await this.editComment()
        return edit.statusCode
    }

    public async getErrorCode() {
        return(await this.getEditBody() as  TPutError).error.error_code       
    }
    public async getErrorMessage() {
        return(await this.getEditBody() as  TPutError).error.error_msg     
    }
}