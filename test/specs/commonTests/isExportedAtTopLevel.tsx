import * as _ from 'lodash'
import * as stardust from 'src/'

// ----------------------------------------
// Is exported or private
// ----------------------------------------
// detect components like: stardust.H1
export default (componentName: string, displayName: string) => {
  const isTopLevelAPIProp = _.has(stardust, componentName)

  // require all components to be exported at the top level
  test('is exported at the top level', () => {
    const message = [
      `'${displayName}' must be exported at top level.`,
      "Export it in 'src/index.js'.",
    ].join(' ')

    expect({ isTopLevelAPIProp, message }).toEqual({
      message,
      isTopLevelAPIProp: true,
    })
  })
}
