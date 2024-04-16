// Importing dsEnvironment from the specified path
import dsEnvironment from '../.env/env.ds.json';

/**
 * Retrieves and checks the font styles of headings within a specified parent element.
 * @param {string} parent - The selector for the parent element containing headings.
 * @returns {void}
 */
export function headings(parent) {
  cy.get(parent).then(($section) => {
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
Cypress.Commands.add('headings', (parent) => headings(parent));

/**
 * Retrieves and checks the font styles of non-heading elements within a specified parent element.
 * @param {string} parent - The selector for the parent element containing body text.
 * @returns {void}
 */
export function body(parent) {
  cy.get(parent)
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
Cypress.Commands.add('body', (parent) => body(parent));

/**
 * Applies specified button styles to found buttons within a section.
 * @param {Object} $button - The jQuery object representing the button element.
 * @param {Object} buttonStyles - The styles to be applied to the button.
 * @returns {void}
 */
function applyButtonStyles($button, buttonStyles) {
  Object.entries(buttonStyles).forEach(([styleProperty, expectedValue]) => {
    cy.wrap($button).should('have.css', styleProperty, expectedValue);
  });
}

/**
 * Finds buttons specified in the dsEnvironment within a given section.
 * @param {Object} $section - The jQuery object representing the section element.
 * @param {Array} buttons - The array of button selectors from dsEnvironment.
 * @returns {Array} - An array of jQuery objects representing the found buttons.
 */
function findButtonsInSection($section, buttons) {
  return buttons.map(button => $section.find(button));
}

/**
 * Checks the styles of found buttons against specified button styles.
 * @param {Array} foundButtons - Array of jQuery objects representing found buttons.
 * @param {Object} buttonStyles - The styles to be checked against.
 * @returns {void}
 */
function checkButtonStyles(foundButtons, buttonStyles) {
  foundButtons.forEach($button => {
    applyButtonStyles($button, buttonStyles);
  });
}

/**
 * Handles the case where no buttons are found within a section.
 * @returns {void}
 */
function handleNoButtonsFound() {
  cy.log('The section does not have any of the specified buttons');
}

/**
 * Retrieves and checks the styles of specified buttons within a section.
 * @param {string} parent - The selector for the parent element containing the section.
 * @returns {void}
 */
export function buttons(parent) {
  const buttons = Object.values(dsEnvironment.BUTTONS);

  const buttonStyles = {
    'font-size': `${dsEnvironment.BUTTONS.STYLES.FONT_SIZE}px`,
    'font-family': dsEnvironment.BUTTONS.STYLES.FONT_FAMILY,
    'padding-top': `${dsEnvironment.BUTTONS.STYLES.PADDING_TOP_BOTTOM}px`,
    'padding-right': `${dsEnvironment.BUTTONS.STYLES.PADDING_SIDES}px`,
  };

  cy.get(parent).then(($section) => {
    const $buttons = findButtonsInSection($section, buttons);

    const foundButtons = $buttons.filter($button => $button.length > 0);

    if (foundButtons.length > 0) {
      checkButtonStyles(foundButtons, buttonStyles);
    } else {
      handleNoButtonsFound();
    }
  });
}

Cypress.Commands.add('buttons', (parent) => buttons(parent));
