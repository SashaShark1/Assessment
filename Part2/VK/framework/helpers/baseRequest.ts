import superagent from "superagent";
import { admin } from "../../data/credentials";
import { TFriendsInfo } from "../../types/friendsInfo"

export class BaseRequest {

    constructor(protected readonly method: string, protected readonly params?: object) {
    }

      public getUrl() {
        return `https://api.vk.com/method/${this.method}?access_token=${admin.token}&v=${admin.version} HTTP/1.1`      
     }

     public async getData() {
        return await superagent.get(this.getUrl()).query(this.params)
     }

     public async getStatus() {
      const data = await this.getData()
      return  data.statusCode
     }

     public async getBody() {
      const data =await this.getData()
      return  data.body
     }
}