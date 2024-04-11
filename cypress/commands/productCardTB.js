import productCardEnvironment from "../.env/env.product_card_tb.json";
import sideCartEnvironment from "../.env/env.side_cart.json";

export function checkImageVisibilityAndSrc(productCard, index) {
  try {
    cy.wrap(productCard)
      .find("img")
      .should("be.visible")
      .should("have.attr", "src")
      .then((src) => {
        cy.log(`Image ${index + 1}: ${productCard}`);
        cy.log(`Image source URL: ${src}`);
      });
  } catch (error) {
    cy.log(`Error in Image ${index + 1}: ${error.message}`);
  }
}

export function clickAddToCartButton(productCard) {
  cy.wrap(productCard).find("button").click();
  handleProductModal();
}

export function handleProductModal() {
  cy.get("body").then(($body) => {
    const $modal = $body.find(productCardEnvironment.PRODUCT_MODAL);
    const $sidecart = $body.find(sideCartEnvironment.GLOBAL.SIDECART_SECTION);

    const isModalActive = $modal.attr("data-active") === "true";

    if (isModalActive) {
      cy.get($modal).should("be.visible").find("button").click();
      cy.get($sidecart).should("have.attr", "data-active", "true");
    }
  });
}

export function checkProductCardExistence(productCards) {
  if (productCards.length === 0) {
    throw new Error(
      `Product cards not found. Check the environment variable: ${productCardEnvironment.PRODUCT_CARD} or ensure the DOM section exists.`
    );
  }
}

export function handleAddToCart(productCards) {
  if (productCards.length === 0) {
    throw new Error("No product cards found.");
  }

  const randomIndex = Cypress._.random(productCards.length - 1);
  const randomProductCard = Cypress.$(productCards[randomIndex]);

  if (randomProductCard.find("button").length > 0) {
    clickAddToCartButton(randomProductCard);
  } else {
    randomProductCard.click();
  }
}

Cypress.Commands.add("checkImageWithoutHover", () => {
  cy.get(productCardEnvironment.PRODUCT_CARD).then((productCards) => {
    checkProductCardExistence(productCards);
    productCards.each((index, productCard) => {
      checkImageVisibilityAndSrc(productCard, index);
    });
  });
});

Cypress.Commands.add("addToCartProductCard", () => {
  cy.get(productCardEnvironment.PRODUCT_CARD).then((productCards) => {
    checkProductCardExistence(productCards);
    handleAddToCart(productCards);
  });
});
