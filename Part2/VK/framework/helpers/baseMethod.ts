import { BaseRequest } from "./baseRequest";
import {TItem} from '../../types/friendsInfo'


export class BaseMethod{

   public static checkEvery(arr: object[], value: string) {
      return arr
      .map((item) => item.hasOwnProperty(value))
      .every((elem) => elem === true);
    }

    public static checkSome(arr: object[], value: string) {
      return arr
      .map((item) => item.hasOwnProperty(value))
      .some((elem) => elem === true);
    }

    public static useRandom() {
      return Math.floor(Math.random() * 999)
    }

}