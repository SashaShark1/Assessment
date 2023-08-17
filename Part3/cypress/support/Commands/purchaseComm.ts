import { mainPage } from "../PageObject/mainPage";
import { purchasePage } from "../PageObject/purchasePage";

Cypress.Commands.add("filterByBrand", (brand: string) => {
    cy.get(purchasePage.filterBlock).eq(4).find('a').contains(brand).click()
    cy.get(purchasePage.itemTitle).should('contain', brand)  
});

Cypress.Commands.add("setRange", (position: number, value: number) => {
    cy.get(purchasePage.filterBlock)
    .eq(2)
    .find("input")
    .eq(position)
    .clear()
    .type(`${value}{enter}`)
    .should("have.value", value);
});

Cypress.Commands.add("checkRange", (spl1: string, spl2: string, min: number, max: number) => {
    cy.get(purchasePage.purchaseName)      
    .next("span")
    .then(($el) => {
      const text = $el.text();
      const splArr1 = text.split(spl1);
      const splArr2 = splArr1.map((item) => {
        return item.split(spl2);
      });
      const splArr3 = splArr2.map((item) => {
        return parseFloat(item[1]);
      });
      splArr3.pop();
      splArr3.forEach((item) => {
        expect(item).to.be.greaterThan(min);
        expect(item).to.be.lessThan(max);
      });
    });
});

Cypress.Commands.add("checkOrigin", (position: number) => {
    cy.get(purchasePage.itemTitle).eq(position).click()
    cy.get(purchasePage.textOrigin).find('span').eq(1).should('have.text', 'Оригинальный товар')
    cy.go('back')  
});

Cypress.Commands.add("showAllFilters", () => {
    cy.get(purchasePage.allfiltersBtn).scrollIntoView().click()
    cy.get(purchasePage.filtersContainer).should('be.visible')
});

Cypress.Commands.add("searchByAllFilters", (cathegory: string) => {
    cy.get(purchasePage.filtersContainer).children().eq(2).find('div').contains(cathegory).click() 
});

Cypress.Commands.add("applyAllFilters", (type: string) => {
    cy.get('button').contains('Применить').click()
    cy.get(purchasePage.filterResult).should('contain', type)
});

Cypress.Commands.add("sortBy", (text: string) => {
  cy.get(`[title="${text}"]`).click()
  cy.get(purchasePage.resultSort).should('contain', text)
});




