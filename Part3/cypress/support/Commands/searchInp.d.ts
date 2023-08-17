declare global{
    namespace Cypress {
        interface Chainable {
            // filterBrand (num: number): Cypress.Chainable<JQuery<HTMLElement>>;          
        
            searchItem(itemToSearch: string, count: number): void;
            checkPurchaseTitle(array: string[], count: number): void;
            setSearchRestriction (text: string): void;
            checkSearchRestriction (text: string): void;
                    
        }
    }
}

export {};