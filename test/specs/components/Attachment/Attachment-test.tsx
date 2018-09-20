import { isConformant, implementsShorthandProp } from 'test/specs/commonTests'

import Attachment from 'src/components/Attachment'
import Text from 'src/components/Text'
import Icon from 'src/components/Icon'

const attachmentImplementsShorthandProp = implementsShorthandProp(Attachment)

describe('Attachment', () => {
  isConformant(Attachment)
  attachmentImplementsShorthandProp('header', Text)
  attachmentImplementsShorthandProp('description', Text)
  attachmentImplementsShorthandProp('icon', Icon, { mapsValueToProp: 'name' })
})
