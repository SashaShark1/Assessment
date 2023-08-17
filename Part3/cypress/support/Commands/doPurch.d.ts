declare global {
  namespace Cypress {
    interface Chainable {
      // filterBrand (num: number): Cypress.Chainable<JQuery<HTMLElement>>;
      filterByBrand(brand: string): void;
      setRange(position: number, value: number): void;
      checkRange(spl1: string, spl2: string, min: number, max: number): void;
      checkOrigin(position: number): void;
      showAllFilters(): void;
      searchByAllFilters(cathegory: string): void;
      applyAllFilters(type: string): void;   
      sortBy(text: string);  
    }
  }
}

export {};
