import { implementsShorthandProp, isConformant } from 'test/specs/commonTests'

import Text from 'src/components/Text'
import Icon from 'src/components/Icon'
import ChatAction from '../../../../src/components/Chat/ChatAction'

describe('ChatAction', () => {
  isConformant(ChatAction)
  implementsShorthandProp(ChatAction)('icon', Icon, { mapsValueToProp: 'name' })
  implementsShorthandProp(ChatAction)('timestamp', Text)
})
