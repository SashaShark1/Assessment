import { RegisterForm } from "../../testClass/registration";

// const validData: string[] = ['Ukraine', 'ukraine', 'congo, the democratic republic of the'];
const invalidData: string[] = ["Ukrae", "", "Ukraine1234567890"];

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

  invalidData.forEach((country) => {
    test("Valid country name", () => {
      const actual = RegisterForm.checkCountry(country);

      expect(actual).toBe(`Please, check entered value`);
    });
  });
});
