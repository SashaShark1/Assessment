declare global {
    namespace Cypress {
      interface Chainable {        
        checkHeaderNav(section: string): void;
        checkNestedNav(section: string, cathegory: string): void;
        openAllOzonMenu(cathegory: string): void;
        checkDiscountedTitle(cathegory: string): void;
      }
    }
  }
  
  export {};