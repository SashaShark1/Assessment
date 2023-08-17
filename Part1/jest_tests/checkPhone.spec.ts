import { RegisterForm } from "../testClass/registration";

describe(`User's phone number validation`, () => {
  test("Valid phone number: with +", () => {
    const actual = RegisterForm.checkPhone("+34569707909");

    expect(actual).toBe("+34569707909");
    expect(actual.length).toBeGreaterThan(6);
    expect(actual.length).toBeLessThan(16);
  });

  test("Valid phone number: 15 symbols", () => {
    const actual = RegisterForm.checkPhone("+375(44)6970790");

    expect(actual).toBe("+375(44)6970790");
    expect(actual.length).toBeGreaterThan(6);
    expect(actual.length).toBeLessThan(16);
  });

  test("Valid phone number: 11 digits only", () => {
    const actual = RegisterForm.checkPhone("80449707909");

    expect(actual).toBe("80449707909");
    expect(actual.length).toBeGreaterThan(6);
    expect(actual.length).toBeLessThan(16);
  });

  test("Valid phone number: 7 digits only", () => {
    const actual = RegisterForm.checkPhone("6970790");

    expect(actual).toBe("6970790");
    expect(actual.length).toBeGreaterThan(6);
    expect(actual.length).toBeLessThan(16);
  });

  test("Invalid phone number: 16 symbols", () => {
    const actual = RegisterForm.checkPhone("+1(8009)99900787");

    expect(actual).toBe(`Phone number must have 7-15 digits`);
  });

  test("Invalid symbols quantity: 6 symbols", () => {
    const actual = RegisterForm.checkPhone("123456");

    expect(actual).toBe(`Phone number must have 7-15 digits`);
  });

  test("Invalid symbols quantity: 16 symbols", () => {
    const actual = RegisterForm.checkPhone("+375(44)12345678");

    expect(actual).toBe(`Phone number must have 7-15 digits`);
  });

  test("Invalid phone number: empty string", () => {
    const actual = RegisterForm.checkPhone("");

    expect(actual).toBe(`Phone number must have 7-15 digits`);
  });

  test("Invalid phone number: letters existing", () => {
    const actual = RegisterForm.checkPhone("697asdfffgg");

    expect(actual).toBe(`Please, use '+' and number characters only`);
  });
});
