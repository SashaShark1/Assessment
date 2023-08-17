import { mainPage } from "../PageObject/mainPage";
import { purchasePage } from "../PageObject/purchasePage";

Cypress.Commands.add("searchItem", (itemToSearch: string, count: number) => {
  itemToSearch = itemToSearch.toLowerCase();
  itemToSearch =
    itemToSearch[0].toUpperCase() + itemToSearch.slice(1, itemToSearch.length);
  cy.get(mainPage.searchInput).type(`${itemToSearch}{enter}`);
  cy.get(purchasePage.itemTitle).as("purchase");
  cy.get("@purchase").should("contain.text", itemToSearch);
  cy.get("@purchase").should("have.length", count);
});

Cypress.Commands.add("checkPurchaseTitle", (array: string[], count: number) => {
  array.forEach((item: string) => {
    cy.searchItem(item, count);
    cy.get(mainPage.searchInput).clear();
  });
});

Cypress.Commands.add("setSearchRestriction", (text: string) => {
  cy.get(mainPage.searchRestrict).click();
  cy.get(mainPage.searchPopUp)
    .should("be.visible")
    .find("div")
    .contains(text)
    .click();
  cy.get(mainPage.searchRestrict).should("contain.text", text);
});

Cypress.Commands.add("checkSearchRestriction", (text: string) => {
  cy.get('aside').find('a').contains(text)
  .should('be.visible')
  .should('have.css', 'background-color', 'rgb(235, 247, 255)')

});
