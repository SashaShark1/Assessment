import { RegisterForm } from "../testClass/registration";

describe(`User's email validation`, () => {
  test(`Valid email: letters only`, () => {
    const actual = RegisterForm.checkEmail("test@gmail.com");

    expect(actual).toBe("test@gmail.com");
    expect(actual.length).toBeGreaterThan(5);
    expect(actual.length).toBeLessThan(41);
  });

  test(`Valid email: with special symbols`, () => {
    const actual = RegisterForm.checkEmail("test*@ya.ru");

    expect(actual).toBe("test*@ya.ru");
    expect(actual.length).toBeGreaterThan(5);
    expect(actual.length).toBeLessThan(41);
  });

  test(`Valid email: with numbers`, () => {
    const actual = RegisterForm.checkEmail("test123@mail.ru");

    expect(actual).toBe("test123@mail.ru");
    expect(actual.length).toBeGreaterThan(5);
    expect(actual.length).toBeLessThan(41);
  });

  test(`Valid email: lower and uppercase`, () => {
    const actual = RegisterForm.checkEmail("test.Test@tut.by");

    expect(actual).toBe("test.Test@tut.by");
    expect(actual.length).toBeGreaterThan(5);
    expect(actual.length).toBeLessThan(41);
  });

  test(`Invalid email: without domain name`, () => {
    const actual = RegisterForm.checkEmail("testTest");

    expect(actual).toBe(`Please, type email address like example@gmail.com`);
  });

  test(`Invalid email: without domain name`, () => {
    const actual = RegisterForm.checkEmail("test123@.ru");

    expect(actual).toBe(`Please, type email address like example@gmail.com`);
  });

  test(`Invalid email: without domain`, () => {
    const actual = RegisterForm.checkEmail("test123@mail");

    expect(actual).toBe(`Please, type email address like example@gmail.com`);
  });

  test(`Invalid email: use several special symbols`, () => {
    const actual = RegisterForm.checkEmail("test*+/=?^_`@mail.ru");

    expect(actual).toBe(`Please, type email address like example@gmail.com`);
  });

  test(`Invalid email: use numbers only as name`, () => {
    const actual = RegisterForm.checkEmail("12345@mail.ru");

    expect(actual).toBe(`Please, type email address like example@gmail.com`);
  });

  test(`Invalid email: use numbers only as domain name`, () => {
    const actual = RegisterForm.checkEmail("test@12.ru");

    expect(actual).toBe(`Please, type email address like example@gmail.com`);
  });

  test(`Invalid email: use numbers as domain`, () => {
    const actual = RegisterForm.checkEmail("test@ya.12");

    expect(actual).toBe(`Please, type email address like example@gmail.com`);
  });

  test(`Invalid email: 5 symbols`, () => {
    const actual = RegisterForm.checkEmail("t@g.r");

    expect(actual).toBe(`Email should contain 6-40 symbols`);
  });

  test(`Invalid email: 41 symbols`, () => {
    const actual = RegisterForm.checkEmail(
      "testTesttestTesttestTesttestTestt@gmail.ru"
    );

    expect(actual).toBe(`Email should contain 6-40 symbols`);
  });

  test(`Invalid email: empty string`, () => {
    const actual = RegisterForm.checkEmail("");

    expect(actual).toBe(`Email should contain 6-40 symbols`);
  });
});
