import { RegisterForm } from "../../testClass/registration";

const validData: string[] = [
  "+34569707909",
  "+375(44)6970790",
  "80449707909",
  "6970790",
];
const incorLengthData: string[] = [
  "+1(8009)99900787",
  "123456",
  "+375(44)12345678",
  "",
];

describe(`User's phone number validation`, () => {
  validData.forEach((phone) => {
    test("Valid phone number", () => {
      const actual = RegisterForm.checkPhone(phone);

      expect(actual).toBe(phone);
      expect(actual.length).toBeGreaterThan(6);
      expect(actual.length).toBeLessThan(16);
    });
  });

  incorLengthData.forEach((phone) => {
    test("Invalid phone number length", () => {
      const actual = RegisterForm.checkPhone(phone);

      expect(actual).toBe(`Phone number must have 7-15 digits`);
    });
  });

  test("Invalid phone number: letters existing", () => {
    const actual = RegisterForm.checkPhone("697asdfffgg");

    expect(actual).toBe(`Please, use '+' and number characters only`);
  });
});
