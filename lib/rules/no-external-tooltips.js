'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  create (context) {
    return {
      ExpressionStatement(node) {
        const originalTagName = node.expression.openingElement.name.name;
        const nameWithoutDashes = originalTagName.toLowerCase().replace("-", "");
        const isTooltip = nameWithoutDashes.includes("tooltip");
        const isWsTooltip = nameWithoutDashes.includes("wstooltip");
        if (isTooltip && !isWsTooltip) {
          context.report({
            node,
            message: "Do not use external tooltips: {{name}}. Use WsTooltip instead.",
            data: { name: originalTagName }
          });
        }
      }
    };
  }
}
