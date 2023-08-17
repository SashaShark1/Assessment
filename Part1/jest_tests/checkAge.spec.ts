import { RegisterForm } from "../testClass/registration";

describe(`User's age validation`, () => {
  test('Valid data in format "Month Day, full Year"', () => {
    const actual = RegisterForm.checkAge("August 19, 1975");

    expect(actual).toBeGreaterThanOrEqual(18);
    expect(actual).toBeLessThan(125);
  });

  test('Valid data in format "Month Day, two last Year digits"', () => {
    const actual = RegisterForm.checkAge("May 27, 57");

    expect(actual).toBeGreaterThanOrEqual(18);
    expect(actual).toBeLessThan(125);
  });

  test('Valid data in format "YYYY/MM/DD"', () => {
    const actual = RegisterForm.checkAge("1991/03/14");

    expect(actual).toBeGreaterThanOrEqual(18);
    expect(actual).toBeLessThan(125);
  });

  test('Valid data in format "YYYY/MM"', () => {
    const actual = RegisterForm.checkAge("1988/09");

    expect(actual).toBeGreaterThanOrEqual(18);
    expect(actual).toBeLessThan(125);
  });

  test("Invalid data: empty string", () => {
    const actual = RegisterForm.checkAge("");
    const expected = `Please, type date in format 'YYYY/MM/DD'`;
    expect(actual).toBe(expected);
  });

  test("Invalid data: words", () => {
    const actual = RegisterForm.checkAge("new Date()");
    const expected = `Please, type date in format 'YYYY/MM/DD'`;
    expect(actual).toBe(expected);
  });

  test("Invalid data: numbers set", () => {
    const actual = RegisterForm.checkAge("19751908");
    const expected = `Please, type date in format 'YYYY/MM/DD'`;
    expect(actual).toBe(expected);
  });

  test("Age less 18", () => {
    const actual = RegisterForm.checkAge("2020/08/19");
    const expected = `Registration is possible for adult users only (18 and older)`;
    expect(actual).toBe(expected);
  });

  test("Border value: less 18", () => {
    const actual = RegisterForm.checkAge("2005/08/19");
    const expected = `Registration is possible for adult users only (18 and older)`;
    expect(actual).toBe(expected);
  });

  test("Border value: more 125", () => {
    const actual = RegisterForm.checkAge("1896/08/19");
    const expected = `Please, check entered value`;
    expect(actual).toBe(expected);
  });

  test("Future data", () => {
    const actual = RegisterForm.checkAge("2023/08/19");
    const expected = `Please, check entered value`;
    expect(actual).toBe(expected);
  });
});
