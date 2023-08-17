import { mainPage } from "../support/PageObject/mainPage";
import { navPage } from "../support/PageObject/navPage";
import { purchasePage } from "../support/PageObject/purchasePage";

describe("Check aside navigation section:", () => {
    // before(function () {
    //   cy.fixture("navData").then(function (data) {
    //     this.data = data;
    //   });
    // });
  
    beforeEach(() => {
      cy.visit(Cypress.env("mainPage"));
    });
  
    it("Discounted product", () => {        
     cy.checkDiscountedTitle('Уценённые товары')
    });

    it("Hot offer product has discount sign", () => {        
     cy.openAllOzonMenu('Уценённые товары')
     cy.get(purchasePage.hotOffer).children().eq(1).find('.ne').should('have.descendants', 'svg')    
    });

    it.only("Hot offer product has discount sign", () => {        
     cy.openAllOzonMenu('Уценённые товары')
     cy.get(purchasePage.hotOffer).children().eq(1).find('.ne').should('have.descendants', 'svg')    
    });

})