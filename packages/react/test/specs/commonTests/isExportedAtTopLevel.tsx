import * as _ from 'lodash'
import * as FluentUI from '@fluentui/react'

// ----------------------------------------
// Is exported or private
// ----------------------------------------

export default (constructorName: string, displayName: string) => {
  const isTopLevelAPIProp = _.has(FluentUI, constructorName)

  // require all components to be exported at the top level
  test('is exported at the top level', () => {
    const message = [
      `'${displayName}' must be exported at top level.`,
      "Export it in 'src/index.ts'.",
    ].join(' ')

    expect({ isTopLevelAPIProp, message }).toEqual({
      message,
      isTopLevelAPIProp: true,
    })
  })
}
