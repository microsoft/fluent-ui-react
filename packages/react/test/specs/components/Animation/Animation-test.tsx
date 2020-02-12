import * as React from 'react'
import { isConformant } from 'test/specs/commonTests'

import Animation from 'src/components/Animation/Animation'
import { consoleUtil, mountWithProvider } from 'test/utils'

describe('Animation', () => {
  isConformant(Animation, {
    hasAccessibilityProp: false,
    requiredProps: { children: <div /> },
    handlesAsProp: false,
  })

  test('does not throw if children is not passed', () => {
    consoleUtil.disableOnce()
    // @ts-ignore
    expect(() => mountWithProvider(<Animation />)).not.toThrowError()

    consoleUtil.disableOnce()
    // @ts-ignore
    expect(() => mountWithProvider(<Animation children={() => undefined} />)).not.toThrowError()
  })
})
