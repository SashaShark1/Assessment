import { TFriendsInfo } from "../../types/friendsInfo";
import { BaseRequest } from "../helpers/baseRequest";


export class FriendsList extends BaseRequest {
    constructor(protected readonly params?: object) {
        super('friends.get', params)
    }


    public async getResponse() {
        return (await this.getBody()  as TFriendsInfo).response
    }

    public async getItems() {
        return (await this.getResponse()).items
    }

    public async getItemsLength() {
        return (await this.getResponse()).items.length
    }

    public async getPhoto() {
        return (await this.getItems()).map(item => item.photo_50)
    }

    public async getCount() {
        return (await this.getResponse()).count
    }

    public async getGender() {
        return (await this.getItems()).map(item => item.sex)
    }

    public async getFirstName() {
        return (await this.getItems()).map(item => item.first_name)
    }
}

