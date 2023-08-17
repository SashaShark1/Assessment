import superagent from "superagent";
import { admin } from "../../data/credentials";
import {CommentData, CommentDataGet, CommentDataSend, CommentInfo } from "../../types/commentsInfo";
import { BaseRequest } from "../helpers/baseRequest";


export class CommentPost extends BaseRequest {
    constructor( protected readonly data: CommentDataSend) {
        super('wall.createComment')
    }

    public async postComment() {
        return  await superagent.post(`https://api.vk.com/method/${this.method}?access_token=${admin.token}&v=${admin.version} HTTP/1.1`)
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(this.data)
                
    }

    public async getReqBody() {
        const comm = await this.postComment()
        return comm.body as CommentInfo
    }

    public async getReqStatus() {
        const comm = await this.postComment()
        return comm.statusCode
    }

    public async getID() {
        return (await this.getReqBody()).response.comment_id
    }

}