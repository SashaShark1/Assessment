import { RegisterForm } from "../testClass/registration";

describe(`User's password validation`, () => {
  test(`Valid password: 8 symbols`, () => {
    const actual = RegisterForm.checkPassword("12356rGg");

    expect(actual).toBe("12356rGg");
    expect(actual.length).toBeGreaterThanOrEqual(8);
    expect(actual.length).toBeLessThanOrEqual(20);
  });

  test(`Valid password: 20 symbols`, () => {
    const actual = RegisterForm.checkPassword("BG356rGg12356rGgHN4");

    expect(actual).toBe("BG356rGg12356rGgHN4");
    expect(actual.length).toBeGreaterThanOrEqual(8);
    expect(actual.length).toBeLessThanOrEqual(20);
  });

  test(`Valid password: 13 symbols`, () => {
    const actual = RegisterForm.checkPassword("aAsSdDfFgG123");

    expect(actual).toBe("aAsSdDfFgG123");
    expect(actual.length).toBeGreaterThanOrEqual(8);
    expect(actual.length).toBeLessThanOrEqual(20);
  });

  test(`Invalid password: without number`, () => {
    const actual = RegisterForm.checkPassword("Gclikhhlhkv");

    expect(actual).toBe("Password must include at least 1 digit");
  });

  test(`Invalid password: without letters`, () => {
    const actual = RegisterForm.checkPassword("1223344455");

    expect(actual).toBe(
      "Password must include at least 1 lowercase and 1 uppercase letter"
    );
  });

  test(`Invalid password: without lowercase letters`, () => {
    const actual = RegisterForm.checkPassword("1223444444G");

    expect(actual).toBe("Password must include at least 1 lowercase letter");
  });

  test(`Invalid password: without uppercase letters`, () => {
    const actual = RegisterForm.checkPassword("12234g44444");

    expect(actual).toBe("Password must include at least 1 uppercase letter");
  });

  test(`Invalid password's length: 7 symbols`, () => {
    const actual = RegisterForm.checkPassword("12dfJK2");

    expect(actual).toBe("Password must have 8-20 symbols");
  });

  test(`Invalid password: spaces inside password`, () => {
    const actual = RegisterForm.checkPassword("12dfJ  K2");

    expect(actual).toBe("Password must have 8-20 symbols");
  });

  test(`Invalid password's length: 21 symbols`, () => {
    const actual = RegisterForm.checkPassword("12234g4444412234g444K");

    expect(actual).toBe("Password must have 8-20 symbols");
  });

  test(`Invalid password's length: empty string`, () => {
    const actual = RegisterForm.checkPassword("");

    expect(actual).toBe("Password must have 8-20 symbols");
  });
});
