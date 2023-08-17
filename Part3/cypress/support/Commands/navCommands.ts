import { mainPage } from "../PageObject/mainPage";
import { navPage } from "../PageObject/navPage";

Cypress.Commands.add("checkHeaderNav", (section: string) => {
    cy.get(mainPage.headerMenu).children().contains(section).click()
    cy.get(navPage.resultHeader).should('contain', section)
});

Cypress.Commands.add("checkNestedNav", (section: string, cathegory: string) => {
    cy.get(navPage.subNavtitle).contains(section).trigger('mouseover')
    cy.get(navPage.cathegoryTitle).contains(cathegory).click()
    const sliceCath = cathegory.slice(1, cathegory.length)
    cy.get(navPage.resultHeader).should('contain', sliceCath)
});

Cypress.Commands.add("openAllOzonMenu", (cathegory: string) => {
    cy.get(navPage.catalogBtn).click()
    cy.get(navPage.allOzonBtn).click() 
    cy.get(navPage.asideNavItem).contains(cathegory).click()
});

Cypress.Commands.add("checkDiscountedTitle", (cathegory: string) => {  
    cy.openAllOzonMenu(cathegory)
    cy.get(mainPage.searchRestrict).should('contain', cathegory)
    cy.get(navPage.resultHeader).should('contain', cathegory)
});