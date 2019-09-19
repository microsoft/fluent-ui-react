import { mergeThemeVariables } from 'src/lib/mergeThemes'
import * as _ from 'lodash'
import { withDebugId } from 'src/lib'

describe('mergeThemeVariables', () => {
  test('component variables are merged', () => {
    const target = { Button: {} }
    const source = { Icon: {} }

    const merged = mergeThemeVariables(target, source)

    expect(merged).toHaveProperty('Button')
    expect(merged).toHaveProperty('Icon')
  })

  test('component variable objects are converted to functions', () => {
    const target = { Button: {} }
    const source = { Button: {} }

    const merged = mergeThemeVariables(target, source)

    expect(merged.Button).toBeInstanceOf(Function)
    expect(merged.Button).toBeInstanceOf(Function)
  })

  xtest('component variable objects are deeply merged', () => {
    const target = { Button: { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' } }
    const source1 = withDebugId(
      {
        Button: siteVariables => ({ b: siteVariables.colors.colorForB }),
      },
      's1',
    )
    const source2 = { Button: { c: 'cS2' } }
    const source3 = { Button: { d: 'dS3' } }

    const siteVariables = {
      fontSizes: {},
      colors: {
        colorForB: 'b_color',
        colorForC: 'c_color',
      },
    }
    const merged = mergeThemeVariables(target, mergeThemeVariables(source1, source2), source3)
    const resolved = _.mapValues(merged, cv => cv(siteVariables))
    console.log(JSON.stringify(resolved, null, 2))
  })
})
