'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const utils = require('eslint-plugin-vue/lib/utils')

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * These strings wil be displayed in error messages.
 */
const ELEMENT_TYPE = Object.freeze({
  NORMAL: 'HTML elements',
  VOID: 'HTML void elements',
  COMPONENT: 'Vue.js custom components',
  SVG: 'SVG elements',
  MATH: 'MathML elements'
})

/**
 * Normalize the given options.
 * @param {Object|undefined} options The raw options object.
 * @returns {Object} Normalized options.
 */
function parseOptions (options) {
  return {
    [ELEMENT_TYPE.NORMAL]: (options && options.html && options.html.normal) || 'always',
    [ELEMENT_TYPE.COMPONENT]: (options && options.html && options.html.component) || 'always',
  }
}

/**
 * Get the elementType of the given element.
 * @param {VElement} node The element node to get.
 * @returns {string} The elementType of the element.
 */
function getElementType (node) {
  if (utils.isCustomComponent(node)) {
    return ELEMENT_TYPE.COMPONENT
  }
  if (utils.isHtmlElementNode(node)) {
    if (utils.isHtmlVoidElementName(node.name)) {
      return ELEMENT_TYPE.VOID
    }
    return ELEMENT_TYPE.NORMAL
  }
  if (utils.isSvgElementNode(node)) {
    return ELEMENT_TYPE.SVG
  }
  if (utils.isMathMLElementNode(node)) {
    return ELEMENT_TYPE.MATH
  }
  return 'unknown elements'
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Require label-position for el-form component',
      category: 'recommended',
      url: ''
    },
    fixable: 'whitespace',
    schema: {
      definitions: {
        optionValue: {}
      },
      type: 'array',
      items: [{
        type: 'object',
        properties: {
          html: {
            type: 'object',
            properties: {
              normal: { $ref: '#/definitions/optionValue' },
              void: { $ref: '#/definitions/optionValue' },
              component: { $ref: '#/definitions/optionValue' }
            },
            additionalProperties: false
          },
          svg: { $ref: '#/definitions/optionValue' },
          math: { $ref: '#/definitions/optionValue' }
        },
        additionalProperties: false
      }],
      maxItems: 1
    }
  },

  create (context) {
    const options = parseOptions(context.options[0])
    let hasInvalidEOF = false

    return utils.defineTemplateBodyVisitor(context, {
      'VElement' (node) {
        if (hasInvalidEOF) {
          return
        }

        const elementType = getElementType(node)
        if (node.name === 'el-form') {
          const labelPosition = !!node.startTag.attributes.filter((attr) => attr.key.name === 'bind' && attr.key.argument === 'label-position').length;
          if (!labelPosition) {
            context.report({
              node,
              loc: node.loc,
              message: 'Require [:label-position] attribute on {{elementType}} (<{{name}}>).',
              data: { elementType, name: node.rawName }
            })
          }
        }
      }
    }, {
      Program (node) {
        hasInvalidEOF = utils.hasInvalidEOF(node)
      }
    })
  }
}
