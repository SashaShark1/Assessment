import { RegisterForm } from "../../testClass/registration";

const invalidCountSymb: string[] = [
  "M",
  "MashaMashaMashaMashaMashaMashaMas",
  "   M    ",
];
const invalidCharacters: string[] = ["", "Masha123", "2345123", "Masha$"];
const validCharacters: string[] = [
  "Masha",
  "aleksandr",
  "MashaMashaMashaMashaMashaMashaMa",
  "Li",
];

describe(`User's name(surname) validation`, () => {
  validCharacters.forEach((name) => {
    test("Name has alphabet characters and valid symbols quantity", () => {
      const actual = RegisterForm.checkName(name);

      expect(actual).toBe(name);
      expect(actual.length).toBeGreaterThan(1);
      expect(actual.length).toBeLessThan(33);
    });
  });

  invalidCountSymb.forEach((name) => {
    test("Name has invalid count symbols", () => {
      const actual = RegisterForm.checkName(name);
      const expected = `Name should consist of 2-32 letters`;

      expect(actual).toBe(expected);
    });
  });

  invalidCharacters.forEach((name) => {
    test("Name consist of empty string", () => {
      const actual = RegisterForm.checkName(name);
      const expected = `Please, use alphabet characters only(letters a-z)`;

      expect(actual).toBe(expected);
    });
  });
});
