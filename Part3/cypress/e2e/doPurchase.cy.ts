import { mainPage } from "../support/PageObject/mainPage";
import { purchasePage } from "../support/PageObject/purchasePage";

describe("Check filter:", () => {
  before(function () {
    cy.fixture("searchPurchName").then(function (data) {
      this.data = data;
    });
  });

  beforeEach(() => {
    cy.visit(Cypress.env("mainPage"));
  });

  it("Brand", () => {
    cy.searchItem("Тепловентилятор", 36);
    cy.filterByBrand("Eurolux");
  });

  it("Range", () => {
    cy.searchItem("Монитор", 36);
    cy.setRange(2, 10);
    cy.setRange(3, 40);
    cy.checkRange("Разрешение: ", "дюймы: ", 9, 41);
  });

  it("Original", function () {
    cy.searchItem("Монитор", 36);
    cy.get(purchasePage.original).click();
    this.data.position.forEach((item: number) => {
      cy.checkOrigin(item);
    });
  });

  it("All filters are displayed", () => {
    cy.searchItem("Погружной блендер", 36);
    cy.showAllFilters();
  });

  it("with all filters section", () => {
    cy.searchItem("Машинка", 36);
    cy.showAllFilters();
    cy.searchByAllFilters("Вид транспорта");
    cy.get(purchasePage.filterInput).eq(1).click();
    cy.applyAllFilters("Спецтехника");
  });

  it("sort by price", () => {
    cy.searchItem("Краска", 36);
    cy.get(purchasePage.resultSort).click();
    cy.sortBy("Сначала дешёвые");
    //  let arr: (number)[] = []
    //   cy.get('[data-widget="searchResultsV2"] [data-prerender="true"]').next('div').each($el => {
    //     const text = $el.text()
    //     const price =text.slice(0, 6)
    //     const newPrice = price.replace(',', '.')
    //     const numPrice = parseFloat(newPrice)
    //      arr.push(numPrice)
    //      })
    //   cy.wrap(arr).as('arr')
    //   const arr2 = arr.sort((a: number, b: number) => a - b)
    //   cy.wrap(arr2).as('arr2')
  });

  it("select currency", () => {
    cy.get(mainPage.currency).click();
    cy.get(mainPage.currSection).find('[name="filter"]').click();
    cy.get(`[title="Доллар США"]`).click();
    cy.get(mainPage.currency).should("contain", "USD");
    cy.get(".ne").each(($el) => {
      const text = $el.text();
      cy.wrap(text).as("text");
      cy.get("@text").should("contain", "$");
    });    
  });
});
