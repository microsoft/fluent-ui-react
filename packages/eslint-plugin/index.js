module.exports = {
  rules: {
    'no-visibility-modifiers': require('./rules/no-visibility-modifiers'),
  },
  configs: {
    all: {
      rules: {
        '@stardust-ui/no-visibility-modifiers': 'error',
      },
    },
  },
}
