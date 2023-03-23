'use strict'

module.exports = {
  rules: {
    'no-external-tooltips': require('./rules/no-external-tooltips'),
  },
  configs: {
    'base': require('./configs/base'),
    'essential': require('./configs/essential'),
    'no-layout-rules': require('./configs/no-layout-rules'),
    'recommended': require('./configs/recommended'),
    'strongly-recommended': require('./configs/strongly-recommended')
  },
}
