import { RegisterForm } from "../testClass/registration";

describe(`Country validation`, () => {
  test("Valid country name", () => {
    const actual = RegisterForm.checkCountry("Ukraine");

    expect(actual).toBe("Ukraine");
  });

  test("Valid country name in lowercase", () => {
    const actual = RegisterForm.checkCountry("ukraine");

    expect(actual).toBe("Ukraine");
  });

  test("Valid country name with 2 words in lowercase", () => {
    const actual = RegisterForm.checkCountry(
      "congo, the democratic republic of the"
    );

    expect(actual).toBe("Congo, The Democratic Republic of the");
  });

  test("Invalid country name with missing letters", () => {
    const actual = RegisterForm.checkCountry("Ukrae");
    const expected = `Please, check entered value`;

    expect(actual).toBe(expected);
  });

  test("Empty string", () => {
    const actual = RegisterForm.checkCountry("");
    const expected = `Please, check entered value`;

    expect(actual).toBe(expected);
  });

  test("Country name with numbers", () => {
    const actual = RegisterForm.checkCountry("Ukraine1234567890");
    const expected = `Please, check entered value`;

    expect(actual).toBe(expected);
  });
});
