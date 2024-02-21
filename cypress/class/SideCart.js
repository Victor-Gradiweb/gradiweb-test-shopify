export class SideCart {
  constructor() {
    const sideCartConfig = Cypress.env("side_cart");
    const globalConfig = Cypress.env("global");
    // Properties
    this.section = sideCartConfig.section;
    this.open = sideCartConfig.open;
    this.close = sideCartConfig.close;
    this.item = sideCartConfig.item_cart;
    this.input_quantity = sideCartConfig.input_quantity;
    this.delete = sideCartConfig.delete_product;

    this.next = globalConfig.slider_next;
    this.prev = globalConfig.slider_prev;
    this.cta = globalConfig.cta;
  }
  // Method to open the SideCart
  openSideCart() {
    cy.get(this.open)
      .click()
      .then(() => {
        cy.get(this.section).should("have.attr", "data-active", "true");
      });
  }
  // Method to close the SideCart
  closeSideCart() {
    cy.get(this.close)
      .click()
      .then(() => {
        cy.get(this.section).should("have.attr", "data-active", "false");
      });
  }
  // Method to next upsell
  upsellNext() {
    cy.get(this.section)
      .find(this.next)
      .click()
      .then(() => {
        cy.get(this.prev).should("not.have.attr", "aria-disabled", "false");
      });
  }
  // Method to prev upsell
  upsellPrev() {
    cy.get(this.section)
      .find(this.prev)
      .click()
      .then(() => {
        cy.get(this.prev).should("not.have.attr", "aria-disabled", "true");
      });
  }

  // Method to add product
  addProduct() {
    //let totalAmount = 0; // Variable to store the total amount
    for (let i = 0; i < 3; i++) {
      cy.get(this.section).find(this.cta).first().click();
      cy.get(this.item).should("have.length", i + 1);
      //     .find('span[data-quantity="1"]')
      //     .invoke("text")
      //     .then((text) => {
      //       const matches = text.match(/(\d+(\.\d{1,2})?)/); // Match numbers and decimals
      //       if (matches) {
      //         const amount = parseFloat(matches[0]);
      //         totalAmount += amount; // Add the amount to the total
      //       }
      //     });
      // }
      // // Display the total after ensuring the sum is completed
      // cy.then(() => {
      //   const formattedTotal = totalAmount.toFixed(2);
      //   cy.log(`Total Amount: $${formattedTotal}`);
      // });
    }
  } //<========= delete this bracket when enabling the price addition script

  // Method to add quantity product
  plusQuantity() {
    cy.get(this.section)
      .find('[data-action="plus"]')
      .first()
      .click()
      .then(() => {
        cy.get(this.section)
          .find(this.input_quantity)
          .first()
          .should("have.attr", "data-quantity", "2");
      });
  }
  // Method to remove quantity product
  removeQuantity() {
    cy.get(this.section)
      .find('[data-action="subtr"]')
      .first()
      .click()
      .then(() => {
        cy.get(this.section)
          .find(this.input_quantity)
          .first()
          .should("have.attr", "data-quantity", "1");
      });
  }
  // Method to Delete product
  deleteProduct() {
    cy.get(this.section)
      .find(this.delete)
      .first()
      .click()
      .then(() => {
        cy.get(this.item).should("have.length", 2);
      });
  }
  // Method GO Checkout
  goCheckout() {
    cy.get(this.section)
      .find(this.cta)
      .eq(6) // modify the index
      .click()
      .then(() => {
        cy.wait(500)
        cy.url().should("include", "checkout");
      });
  }
}

export const sideCart = new SideCart();
