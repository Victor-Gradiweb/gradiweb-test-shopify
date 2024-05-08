import designSystem from '../e2e/.env/design-system.json'

/**
 * Calculates the expected font size for a heading element based on the heading level and optionally provided size parameter.
 * @param {jQuery} $heading - The jQuery object representing the heading element.
 * @param {string} headingLevel - The level of the heading (e.g., "h1", "h2", etc.).
 * @param {number} size - Optional parameter specifying the font size. If not provided, it defaults to the size defined in the system design.
 * @returns {number} The expected font size for the heading.
 */
function getExpectedFontSize($heading, headingLevel, size) {
  let expectedFontSize = size
  // If no specific font size is provided, use the one in the system design.
  if (!expectedFontSize) {
    expectedFontSize = designSystem.headdings[`headdingH${headingLevel.charAt(1)}`]
  }
  return expectedFontSize
}

/**
 * Verifies that the font size of a heading matches the expected font size.
 * @param {jQuery} $heading - The jQuery object representing the heading element.
 * @param {number} expectedFontSize - The expected font size for the heading.
 */
function verifyHeadingFontSize($heading, expectedFontSize) {
  cy.wrap($heading)
    .should('have.css', 'font-size', `${expectedFontSize}px`)
    .and('have.css', 'font-family')
    .and('include', designSystem.headdings.font_family)
}

/**
 * Iterates over all heading elements within a specified section and verifies their font size and font family.
 * @param {string} sectionSelector - The selector for the section containing the headings.
 * @param {string} headingSelector - The selector for the heading elements within the section.
 * @param {Object} [options={}] - An object containing additional options.
 * @param {number} [options.size] - Optional parameter specifying the font size to override the system design font size.
 */
function verifyHeadings(sectionSelector, headingSelector, options = {}) {
  const { size } = options

  cy.get(sectionSelector)
    .find(headingSelector)
    .each(($heading) => {
      const headingLevel = $heading.prop('tagName').toLowerCase()
      const expectedFontSize = getExpectedFontSize($heading, headingLevel, size)
      verifyHeadingFontSize($heading, expectedFontSize)
    })
}

/**
 * Custom Cypress command to verify the font size and font family of headings on a web page.
 * @param {string} sectionSelector - The selector for the section containing the headings.
 * @param {string} headingSelector - The selector for the heading elements within the section.
 * @param {Object} [options={}] - An object containing additional options.
 * @param {number} [options.size] - Optional parameter specifying the font size to override the system design font size.
 */
Cypress.Commands.add('verifyHeadings', { prevSubject: false }, verifyHeadings)

/**
 * Finds the class name of a button element based on the design system.
 * @param {jQuery} $button - jQuery object representing the button element.
 * @returns {string|null} - The class name of the button without the 'button_' prefix, or null if not found.
 */
function findButtonClass($button) {
  const buttonClasses = Object.keys(designSystem.buttons).filter(key => key.startsWith('button_'))
  const foundClass = buttonClasses.find(cls => $button.hasClass(designSystem.buttons[cls].class.substring(1)))
  return foundClass ? foundClass.replace('button_', '') : null
}

/**
 * Verifies the styles of a button element.
 * @param {jQuery} $button - jQuery object representing the button element.
 * @param {Object} buttonSize - Object containing button size properties.
 * @param {number} buttonSize.font_size - Font size of the button.
 * @param {number} buttonSize.pd_right - Padding right of the button.
 * @param {number} buttonSize.pd_top - Padding top of the button.
 */
function verifyButtonStyles($button, buttonSize) {
  cy.wrap($button).should('have.css', 'font-family').and('include', designSystem.buttons.font_family)
  cy.wrap($button).should('have.css', 'font-size', `${buttonSize.font_size}px`)
  cy.wrap($button).should('have.css', 'padding-right', `${buttonSize.pd_right}px`)
  cy.wrap($button).should('have.css', 'padding-top', `${buttonSize.pd_top}px`)
}

/**
 * Verifies the styles of all buttons of a specified type within a given section.
 * @param {string} section - CSS selector for the section containing the buttons.
 * @param {string} buttonType - Type of button to verify.
 * @throws {Error} - Throws an error if no buttons of the specified type are found.
 */
function verifyButtons(section, buttonType) {
  let buttonFound = false

  cy.get(section)
    .find('a')
    .each(($button) => {
      const buttonClass = findButtonClass($button)
      if (buttonClass && buttonClass === buttonType) {
        const buttonSize = designSystem.buttons[`button_${buttonClass}`]
        verifyButtonStyles($button, buttonSize)
        buttonFound = true
      }
    })
    .then(() => {
      if (!buttonFound) {
        throw new Error('No buttons of the specified type were found in the section provided.')
      }
    })
}

/**
 * Adds a custom Cypress command to verify the styles of buttons within a specified section.
 * @param {string} section - CSS selector for the section containing the buttons.
 * @param {string} buttonType - Type of button to verify.
 * @throws {Error} - Throws an error if no buttons of the specified type are found.
 */
Cypress.Commands.add('verifyButtons', verifyButtons)
/**
 * Iterates through paragraphs and spans within the specified section and asserts their font properties.
 * @param {string} sectionSelector - The CSS selector for the section to search within.
 * @param {Object} [options={}] - Additional options.
 * @param {Object} [options.fontSize] - Font size options.
 * @param {number} [options.fontSize.p] - Font size for paragraphs.
 * @param {number} [options.fontSize.span] - Font size for spans.
 * @returns {void}
 */
function body(sectionSelector, options = {}) {
  const { fontSize } = options;
  cy.get(sectionSelector)
    .find('p, span')
    .each(($el) => {
      if ($el.text().length > 30) {
        let expectedFontSize;
        if ($el.is('span')) {
          expectedFontSize = fontSize?.span || designSystem.paragraph.body.span;
        } else if ($el.is('p')) {
          expectedFontSize = fontSize?.p || designSystem.paragraph.body.p;
        } else {
          return;
        }
        cy.wrap($el).should('have.css', 'font-family').and('include', designSystem.paragraph.font_family);
        cy.wrap($el).should('have.css', 'font-size', `${expectedFontSize}px`);
      }
    });
}

Cypress.Commands.add('paragraphText', (sectionSelector, options) => { body(sectionSelector, options); });
