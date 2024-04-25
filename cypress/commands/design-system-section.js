import designSystemEnv from '../e2e/.env/design-system.json'

/**
 * Retrieves headings within a parent element.
 * @param {string} parent - Selector of the parent element.
 * @returns {Cypress.Chainable<JQuery<HTMLElement>>} - Headings found within the parent element.
 */
function getHeadings(parent) {
  return cy.get(parent).then(($section) => {
    const headings = $section.find('h1, h2, h3, h4, h5, h6');
    return headings;
  });
}

/**
 * Verifies the styles of a heading.
 * @param {HTMLElement} heading - Heading element to verify.
 */
function verifyHeadingStyles(heading) {
  const tagName = heading.tagName.toLowerCase();
  const fontSize = `${designSystemEnv.headding[tagName].font_size}px`;
  const fontFamily = designSystemEnv.headding.font_family;

  cy.wrap(heading)
    .should('have.css', 'font-size', fontSize)
    .and('have.css', 'font-family')
}

/**
 * Exports headings within a parent element and verifies their styles.
 * @param {string} parent - Selector of the parent element.
 */
export function headings(parent) {
  getHeadings(parent).then((headings) => {
    if (headings.length === 0) {
      cy.log('No <h1> to <h6> elements found.');
    } else {
      headings.each((index, heading) => {
        verifyHeadingStyles(heading);
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
          .should('have.css', 'font-size', `${designSystemEnv.body_text.font_size}px`)
          .and('have.css', 'font-family')
          .and('include', designSystemEnv.body_text.font_family)
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
  const buttons = Object.values(designSystemEnv.buttons);

  const buttonStyles = {
    'font-size': `${designSystemEnv.styles_buttons.font_size}px`,
    'font-family': designSystemEnv.styles_buttons.font_family,
    'padding-top': `${designSystemEnv.styles_buttons.padding_top}px`,
    'padding-right': `${designSystemEnv.styles_buttons.padding_right}px`,
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
