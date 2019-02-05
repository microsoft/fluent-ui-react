import * as _ from 'lodash'
import * as stardust from 'src/index'

// ----------------------------------------
// Is exported or private
// ----------------------------------------
// detect components like: stardust.H1
export default (constructorName: string, displayName: string) => {
  const isTopLevelAPIProp = _.has(stardust, constructorName)

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
