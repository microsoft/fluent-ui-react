/**
 * Get the Webpack Context for all src component variables.
 */
const variablesContext = require.context('src/themes/teams', true, /\w+Variables\.ts$/)

export default variablesContext
