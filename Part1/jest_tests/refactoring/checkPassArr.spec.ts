import { RegisterForm } from "../../testClass/registration";

const validData: string[] = [
  "12356rGg",
  "BG356rGg12356rGgHN4",
  "aAsSdDfFgG123",
];
const invalidData: string[] = [
  "12dfJK2",
  "12dfJ  K2",
  "12234g4444412234g444K",
  "",
];

describe(`User's password validation`, () => {
  validData.forEach((pass) => {
    test("Valid password", () => {
      const actual = RegisterForm.checkPassword(pass);

      expect(actual).toBe(pass);
      expect(actual.length).toBeGreaterThanOrEqual(8);
      expect(actual.length).toBeLessThanOrEqual(20);
    });
  });

  invalidData.forEach((pass) => {
    test(`Invalid password's length`, () => {
      const actual = RegisterForm.checkPassword(pass);

      expect(actual).toBe("Password must have 8-20 symbols");
    });
  });
});
