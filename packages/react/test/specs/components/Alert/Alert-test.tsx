import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'

import Alert from 'src/components/Alert/Alert'
import Box from 'src/components/Box/Box'
import Button from 'src/components/Button/Button'

const alertImplementsShorthandProp = implementsShorthandProp(Alert)

describe('Alert', () => {
  isConformant(Alert)

  alertImplementsShorthandProp('action', Button, { mapsValueToProp: 'content' })
  alertImplementsShorthandProp('content', Box, { mapsValueToProp: 'children' })
})
