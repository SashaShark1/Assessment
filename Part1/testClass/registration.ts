import { countriesList } from "./data/country";
import fetch from "node-fetch";
import url from "node:url";

export class RegisterForm {

  public static checkName(name: string) {
    name = name.replace(/\s/g, "");
    const regExp: RegExp = /^[A-Z]+$/gi;
    const length: number = name.length;

    if (!name.match(regExp)) {
      return `Please, use alphabet characters only(letters a-z)`;
    } else {
      if (length < 2 || length > 32) {
        return `Name should consist of 2-32 letters`;
      } else {
        return name;
      }
    }
  }

  public static checkAge(date: string) {
    const birth: number = new Date(date).getTime();
    if (isNaN(birth)) {
      return `Please, type date in format 'YYYY/MM/DD'`;
    } else {
      const current: number = new Date().getTime();
      const different = current - birth;
      const age = Math.floor(different / 31557600000);
      if (age >= 125 || age < 0) {
        return `Please, check entered value`;
      } else if (age < 18) {
        return `Registration is possible for adult users only (18 and older)`;
      } else {
        return age;
      }
    }
  }

  public static checkCountry(country: string) {
    // const url = new URL('file:///./countries.json' )
    // const url = "file:///countries.json"
    // const res = await fetch(url)
    // const data = await res.json()
    // return data   
    const result = countriesList.filter((item) => item.name.toLowerCase() == country.toLowerCase());
    return result.length > 0 ? result[0].name : `Please, check entered value`;
  }

  public static checkPhone(phone: string) {
    phone = phone.replace(/\s/g, "");
    const regExp: RegExp = /^[\+]?[0-9]{0,4}[(]?[0-9]{0,6}[)]?[0-9]{7,15}$/gi;
    const length: number = phone.length;
    if (length < 7 || length > 15) {
      return `Phone number must have 7-15 digits`;
    } else {
      if (!phone.match(regExp)) {
        return `Please, use '+' and number characters only`;
      } else {
        return phone;
      }
    }
  }

  public static checkEmail(email: string) {
    email = email.replace(/\s/g, "");
    const regExp =
      /^[a-z]+[0-9]?[_.'*+/=?^_`{|}-]?[a-z0-9]{0,}@[a-z]+\.[a-z]+$/gi;
    const length: number = email.length;
    if (length < 6 || length > 41) {
      return `Email should contain 6-40 symbols`;
    } else {
      if (!email.match(regExp)) {
        return `Please, type email address like example@gmail.com`;
      } else {
        return email;
      }
    }
  }

  public static checkPassword(pass: string) {
    // const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/g
    pass = pass.replace(/\s/g, "");
    const regExpL = /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{8,20}$/g;
    const regExpU = /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,20}$/g;
    const regExpN = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{8,20}$/g;
    const regExpJN = /^(?=.*\d)[\d]{8,20}$/g;
    const length: number = pass.length;

    if (length < 8 || length > 20) {
      return `Password must have 8-20 symbols`;
    } else {
      if (pass.match(regExpL)) {
        return `Password must include at least 1 lowercase letter`;
      } else if (pass.match(regExpU)) {
        return `Password must include at least 1 uppercase letter`;
      } else if (pass.match(regExpN)) {
        return `Password must include at least 1 digit`;
      } else if (pass.match(regExpJN)) {
        return `Password must include at least 1 lowercase and 1 uppercase letter`;
      } else {
        return pass;
      }
    }
  }

  public static confirmPassword(pass: string, confirm: string) {
    return typeof pass == "string" && pass === confirm  ? pass  : `Password are not matching`;
  }
}

