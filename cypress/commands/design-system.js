// Importing dsEnvironment from the specified path
import dsEnvironment from '../.env/env.ds.json';

/**
 * Retrieves and checks the styling of headings within a section.
 * @returns {void}
 */
export function headings() {
  cy.get(dsEnvironment.PARENT).then(($section) => {
    const headings = $section.find('h1, h2, h3, h4, h5, h6');

    if (headings.length === 0) {
      cy.log('No <h1> to <h6> elements found.');
    } else {
      headings.each((index, heading) => {
        const tagName = heading.tagName.toLowerCase();
        const fontSize = `${dsEnvironment.HEADING[tagName.toUpperCase()].FONT_SIZE}px`;
        const fontFamily = dsEnvironment.HEADING.FONT_FAMILY;

        cy.wrap(heading)
          .should('have.css', 'font-size', fontSize)
          .and('have.css', 'font-family')
          .and('include', fontFamily);
      });
    }
  });
}

// Adding the 'headings' command to Cypress
Cypress.Commands.add('headings', headings);

/**
 * Retrieves and checks the styling of body text elements within a section.
 * @returns {void}
 */
export function body() {
  cy.get(dsEnvironment.PARENT)
    .find(':not(h1, h2, h3, h4, h5, h6)')
    .filter(function () {
      return this.textContent.trim().length > 0 && Cypress.$(this).parents('div').length <= 4
    })
    .each(($el) => {
      if ($el.is('a, span, em, p, strong, li') && $el.text().trim().length > 0) {
        cy.wrap($el)
          .should('have.css', 'font-size', `${dsEnvironment.BODY.FONT_SIZE}px`)
          .and('have.css', 'font-family')
          .and('include', dsEnvironment.BODY.FONT_FAMILY)
      }
    })
}

// Adding the 'body' command to Cypress
Cypress.Commands.add('body', body);

/**
 * Retrieves and checks the styling of specified buttons within a section.
 * @returns {void}
 */
export function buttons() {
  const buttons = [
    dsEnvironment.BUTTONS.BTN1,
    dsEnvironment.BUTTONS.BTN2
  ];

  const buttonStyles = {
    'font-size': `${dsEnvironment.BUTTONS.STYLES.FONT_SIZE}px`,
    'font-family': dsEnvironment.BUTTONS.STYLES.FONT_FAMILY,
    'padding-top': `${dsEnvironment.BUTTONS.STYLES.PADDING_TOP_BOTTOM}px`,
    'padding-right': `${dsEnvironment.BUTTONS.STYLES.PADDING_SIDES}px`,
  };

  cy.get(dsEnvironment.PARENT).then(($section) => {
    const $buttons = buttons.map(button => $section.find(button));

    const foundButtons = $buttons.filter($button => $button.length > 0);

    if (foundButtons.length > 0) {
      foundButtons.forEach($button => {
        Object.entries(buttonStyles).forEach(([styleProperty, expectedValue]) => {
          cy.wrap($button).should('have.css', styleProperty, expectedValue);
        });
      });
    } else {
      cy.log('The section does not have any of the specified buttons');
    }
  });
}

// Adding the 'buttons' command to Cypress
Cypress.Commands.add('buttons', buttons);
