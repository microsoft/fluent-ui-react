import * as React from 'react'
import { isConformant, implementsShorthandProp, handlesAccessibility } from 'test/specs/commonTests'
import { mountWithProvider } from 'test/utils'
import * as keyboardKey from 'keyboard-key'

import Attachment from 'src/components/Attachment/Attachment'
import Text from 'src/components/Text/Text'
import Icon from 'src/components/Icon/Icon'
import Button from 'src/components/Button/Button'

const attachmentImplementsShorthandProp = implementsShorthandProp(Attachment)

describe('Attachment', () => {
  isConformant(Attachment)
  attachmentImplementsShorthandProp('header', Text)
  attachmentImplementsShorthandProp('description', Text)
  attachmentImplementsShorthandProp('icon', Icon, { mapsValueToProp: 'name' })
  attachmentImplementsShorthandProp('action', Button)

  describe('accessibility', () => {
    handlesAccessibility(Attachment, {
      defaultRootRole: undefined,
    })

    test('handleClick is executed when Enter is pressed for attachment, not for more option button', () => {
      const onClickAttachment = jest.fn()
      const onClickButton = jest.fn()
      const attachement = mountWithProvider(
        <Attachment
          actionable
          action={{
            icon: 'more',
            onClick: () => onClickButton(),
          }}
          onClick={onClickAttachment}
        />,
      )
      const moreOptionButton = attachement.find('button')

      attachement.simulate('keydown', { keyCode: keyboardKey.Enter })
      expect(onClickAttachment).toHaveBeenCalledTimes(1)

      onClickAttachment.mockClear()
      moreOptionButton.simulate('keydown', { keyCode: keyboardKey.Enter })
      expect(onClickAttachment).not.toBeCalled()

      // simulate the similar behavior as browser does when Enter key is pressed on button element
      moreOptionButton.simulate('click')
      expect(onClickButton).toHaveBeenCalledTimes(1)
    })
  })
})
