import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'

import Attachment from 'src/components/Attachment/Attachment'
import Text from 'src/components/Text/Text'
import Icon from 'src/components/Icon/Icon'
import Button from 'src/components/Button/Button'

const attachmentImplementsShorthandProp = implementsShorthandProp(Attachment)

describe('Attachment', () => {
  isConformant(Attachment, 'Attachment')
  attachmentImplementsShorthandProp('header', Text)
  attachmentImplementsShorthandProp('description', Text)
  attachmentImplementsShorthandProp('icon', Icon, { mapsValueToProp: 'name' })
  attachmentImplementsShorthandProp('action', Button)
})
