import { RegisterForm } from "../../testClass/registration";

const validData: string[] = [  "August 19, 1975",  "May 27, 57",  "1991/03/14",  "1988/09"];
const incorTypedData: string[] = ["", "new Date()", "19751908"];
const restrictionData: string[] = ["2020/08/19", "2005/08/19"];
const invalidData: string[] = ["1896/08/19", "2023/08/19"];

describe(`User's age validation`, () => {
  validData.forEach((data) => {
    test("Valid date", () => {
      const actual = RegisterForm.checkAge(data);

      expect(actual).toBeGreaterThanOrEqual(18);
      expect(actual).toBeLessThan(125);
    });
  });

  incorTypedData.forEach((data) => {
    test("Incorrect typing date", () => {
      const actual = RegisterForm.checkAge(data);
      const expected = `Please, type date in format 'YYYY/MM/DD'`;
      expect(actual).toBe(expected);
    });
  });

  restrictionData.forEach((data) => {
    test("Age less 18", () => {
      const actual = RegisterForm.checkAge(data);
      const expected = `Registration is possible for adult users only (18 and older)`;
      expect(actual).toBe(expected);
    });
  });

  invalidData.forEach((data) => {
    test("Invalid data", () => {
      const actual = RegisterForm.checkAge(data);
      const expected = `Please, check entered value`;
      expect(actual).toBe(expected);
    });
  });
});
