import dsEnvironment from "../.env/env.ds.json";
export function headings() {
  const { PARENT, HEADING, FONT_FAMILY } = dsEnvironment;
  cy.get(PARENT)
    .find('h1, h2, h3, h4, h5, h6')
    .each((heading) => {
      const tagName = heading.prop('tagName').toLowerCase()
      const {FONT_SIZE} = HEADING[tagName.toUpperCase()]
      cy.wrap(heading)
        .should('have.css', 'font-size', FONT_SIZE)
        .should('have.css', 'font-family')
        .and('contains', FONT_FAMILY)
    })
}

Cypress.Commands.add('headings', headings);