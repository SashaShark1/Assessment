import { RegisterForm } from "../../testClass/registration";

const invalidLength: string[] = [
  "t@g.r",
  "testTesttestTesttestTesttestTestt@gmail.ru",
  "",
];
const invalidCharacters: string[] = [
  "testTest",
  "test123@.ru",
  "test123@mail",
  "test*+/=?^_`@mail.ru",
  "12345@mail.ru",
  "test@12.ru",
  "test@ya.12",
];
const validCharacters: string[] = [
  "test@gmail.com",
  "test*@ya.ru",
  "test123@mail.ru",
  "test.Test@tut.by",
];

describe(`User's email validation`, () => {
  validCharacters.forEach((email) => {
    test("Valid email", () => {
      const actual = RegisterForm.checkEmail(email);

      expect(actual).toBe(email);
      expect(actual.length).toBeGreaterThan(5);
      expect(actual.length).toBeLessThan(41);
    });
  });

  invalidCharacters.forEach((email) => {
    test("Invalid email format or characters", () => {
      const actual = RegisterForm.checkEmail(email);

      expect(actual).toBe(`Please, type email address like example@gmail.com`);
    });
  });

  invalidLength.forEach((email) => {
    test("Valid email", () => {
      const actual = RegisterForm.checkEmail(email);

      expect(actual).toBe(`Email should contain 6-40 symbols`);
    });
  });
});
