module.exports = {
  rules: {
    'no-visibility-modifiers': require('./no-visibility-modifiers'),
  },
  configs: {
    all: {
      rules: {
        '@stardust-ui/no-visibility-modifiers': 'error',
      },
    },
  },
}
