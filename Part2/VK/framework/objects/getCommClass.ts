import { CommentData } from "../../types/commentsInfo";
import { BaseRequest } from "../helpers/baseRequest";


export class CommentGet extends BaseRequest {
    constructor( protected readonly params?: object) {
        super('wall.getComment', params)
    }

    public async getResponse() {
        return (await this.getBody() as CommentData).response
    }

    public async getItems() {
        return (await this.getResponse()).items[0]
    }

    public async getText() {
        return (await this.getItems()).text
    }

    public async getParents() {
        return (await this.getItems()).parents_stack
    }

    public async getAttachments() {
        return (await this.getItems()).attachments[0].type
    }

    public async getAuthor() {
        return (await this.getItems()).from_id
    }

}