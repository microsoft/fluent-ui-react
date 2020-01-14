import * as React from 'react'

import {
  isConformant,
  implementsShorthandProp,
  handlesAccessibility,
  htmlIsAccessibilityCompliant,
} from '../../commonTests'

import { Alert, Box, Button } from '@fluentui/react'

const alertImplementsShorthandProp = implementsShorthandProp(Alert)

describe('Alert', () => {
  isConformant(Alert)
  handlesAccessibility(Alert, { defaultRootRole: undefined, requiredProps: { content: 'test' } })
  handlesAccessibility(Alert, {
    defaultRootRole: undefined,
    partSelector: `.${Alert.slotClassNames.body}`,
    requiredProps: { content: 'test' },
  })
  handlesAccessibility(Alert, {
    defaultRootRole: 'alert',
    partSelector: `.${Alert.slotClassNames.body}`,
    requiredProps: { content: 'test', warning: true },
  })

  alertImplementsShorthandProp('dismissAction', Button, {
    mapsValueToProp: 'content',
    requiredProps: { dismissible: true },
  })
  alertImplementsShorthandProp('content', Box, { mapsValueToProp: 'children' })

  describe('compliance', () => {
    test('default', async () => await htmlIsAccessibilityCompliant(<Alert content="Test" />))

    test('danger', async () => await htmlIsAccessibilityCompliant(<Alert danger content="Test" />))
  })
})
