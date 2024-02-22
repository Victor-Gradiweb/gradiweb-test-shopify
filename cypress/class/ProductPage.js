export class ProductPage {
  constructor() {
    const productPageConfig = Cypress.env("product_page")
    this.section_product = productPageConfig.section_product;
  }
}
export const productPage = new ProductPage();
