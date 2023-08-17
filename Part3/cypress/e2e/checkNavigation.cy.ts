import { mainPage } from "../support/PageObject/mainPage";
import { navPage } from "../support/PageObject/navPage";

describe("Check navigation section:", () => {
  before(function () {
    cy.fixture("navData").then(function (data) {
      this.data = data;
    });
  });

  beforeEach(() => {
    cy.visit(Cypress.env("mainPage"));
  });

  it("Last link from header nav", () => {
    cy.checkHeaderNav("Строительство и ремонт");
  });

  it("All links", function () {
    this.data.sections.forEach((item: string) => {
      cy.checkHeaderNav(item);
    });
  });

  it("with 2 nested level", () => {
    cy.checkHeaderNav("Бытовая техника");
    cy.checkNestedNav("Встраиваемая бытовая техника", "Кофемашины");
  });

  it("several devices with 2 nested level", function () {
    this.data.devices.forEach((item: string) => {
      cy.checkHeaderNav("Бытовая техника");
      cy.checkNestedNav("Встраиваемая бытовая техника", item);
    });
  });

  it("check navigation path", () => {
    cy.checkHeaderNav("Детские товары");
    cy.checkNestedNav("Детское питание", "Пюре");
    cy.get(navPage.navWay).should("contain", "Детские товары");
    cy.get(navPage.navWay).should("contain", "Детское питание");
  });

  
});
