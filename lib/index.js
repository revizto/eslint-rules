'use strict'

module.exports = {
  rules: {
    'elform-label-position': require('./rules/elform-label-position'),
  },
  configs: {
    'base': require('./configs/base'),
    'essential': require('./configs/essential'),
    'no-layout-rules': require('./configs/no-layout-rules'),
    'recommended': require('./configs/recommended'),
    'strongly-recommended': require('./configs/strongly-recommended')
  },
}
