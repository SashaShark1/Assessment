import { mainPage } from "../support/PageObject/mainPage";
import { purchasePage } from "../support/PageObject/purchasePage";

describe("Check searching ability on the main page:", () => {
  before(function () {
    cy.fixture("searchPurchName").then(function (data) {
      this.data = data;
    });
  });
  beforeEach(() => {
    cy.visit(Cypress.env("mainPage"));
  });

  it("With valid data", () => {
    cy.searchItem("Шуба", 36);
  });

  it("With different cases of valid data", function () {
    cy.checkPurchaseTitle(this.data.name, 36);
  });

  it("With different cases of valid data", function () {
    cy.checkPurchaseTitle(this.data.purchase, 36);
  });

  it("With invalid data(letters set)", () => {
    cy.get(mainPage.searchInput).type(`sgsgsgsgsgsgsgsgsgsgsgsggg{enter}`);
    cy.get(purchasePage.errMessage).should(
      "contain.text",
      "Простите, по вашему запросу товаров сейчас нет."
    );
  });

  it("With invalid data(letters set)", () => {
    cy.setSearchRestriction("Автотовары");
  });

  it("Set cathegory for searching", () => {
    cy.setSearchRestriction("Спорт и отдых");
    cy.searchItem("Насос", 36);
    cy.checkSearchRestriction("Спорт и отдых");
  });
});
