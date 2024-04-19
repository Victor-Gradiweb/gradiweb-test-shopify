// Importing dsEnvironment from the specified path
import dsEnvironment from '../.env/env.ds.json'

export function bodyDocument() {
    cy.get("body *")
      .filter(function () {
        const textContentLength = this.textContent.trim().length
        const parentDivCount = Cypress.$(this).parents("div").length
        return textContentLength > 0 && parentDivCount <= 4
      })
      .each(($el) => {
        const tagName = $el[0].tagName
        const text = $el.text().trim()
        if ($el.is("a, span, em, p, strong, li") && text.length > 0) {
          cy.log("Elemento:", tagName)
          cy.log("Texto:", text)
          cy.wrap($el)
            .should("have.css", "font-size", `${dsEnvironment.BODY.FONT_SIZE}px`)
            .and("have.css", "font-family")
            .and("include", dsEnvironment.BODY.FONT_FAMILY)
        }
      })
  }
  
  Cypress.Commands.add("bodyDocument", bodyDocument)