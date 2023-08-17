import { RegisterForm } from "../testClass/registration";

describe(`User's name(surname) validation`, () => {
  test("Name has alphabet characters and valid symbols quantity: 5", () => {
    const actual = RegisterForm.checkName("Masha");

    expect(actual).toBe("Masha");
    expect(actual.length).toBeGreaterThan(1);
    expect(actual.length).toBeLessThan(33);
  });

  test("Name has lowercase letters and valid symbols quantity: 9", () => {
    const actual = RegisterForm.checkName("aleksandr");

    expect(actual).toBe("aleksandr");
    expect(actual.length).toBeGreaterThan(1);
    expect(actual.length).toBeLessThan(33);
  });

  test("Name has maximum valid symbols quantity: 32", () => {
    const actual = RegisterForm.checkName("MashaMashaMashaMashaMashaMashaMa");

    expect(actual).toBe("MashaMashaMashaMashaMashaMashaMa");
    expect(actual.length).toBeGreaterThan(1);
    expect(actual.length).toBeLessThan(33);
  });

  test("Name has minimum valid symbols quantity: 2", () => {
    const actual = RegisterForm.checkName("Li");

    expect(actual).toBe("Li");
    expect(actual.length).toBeGreaterThan(1);
    expect(actual.length).toBeLessThan(33);
  });

  test("Name has invalid count symbols: 1", () => {
    const actual = RegisterForm.checkName("M");
    const expected = `Name should consist of 2-32 letters`;

    expect(actual).toBe(expected);
  });

  test("Name has invalid count symbols: 33", () => {
    const actual = RegisterForm.checkName("MashaMashaMashaMashaMashaMashaMas");
    const expected = `Name should consist of 2-32 letters`;

    expect(actual).toBe(expected);
  });

  test("Name has several spaces", () => {
    const actual = RegisterForm.checkName("   M    ");
    const expected = `Name should consist of 2-32 letters`;

    expect(actual).toBe(expected);
  });

  test("Name consist of empty string", () => {
    const actual = RegisterForm.checkName("");
    const expected = `Please, use alphabet characters only(letters a-z)`;

    expect(actual).toBe(expected);
  });

  test("Name contains digits", () => {
    const actual = RegisterForm.checkName("Masha123");
    const expected = `Please, use alphabet characters only(letters a-z)`;

    expect(actual).toBe(expected);
  });

  test("Name consist of digits", () => {
    const actual = RegisterForm.checkName("2345123");
    const expected = `Please, use alphabet characters only(letters a-z)`;

    expect(actual).toBe(expected);
  });

  test("Name contains special symbol", () => {
    const actual = RegisterForm.checkName("Masha$");
    const expected = `Please, use alphabet characters only(letters a-z)`;

    expect(actual).toBe(expected);
  });
});
