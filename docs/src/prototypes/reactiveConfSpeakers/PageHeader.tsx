import * as React from 'react'
import { Divider, Text } from '@stardust-ui/react'
import { mainContentStyles, pageHeaderSpeakersStyles, pageHeaderDividerStyles } from './styles'
import Slot from '../../../../src/components/Slot/Slot'

export default () => {
  return (
    <Slot styles={mainContentStyles}>
      <Text content="MEET OUR STELLAR" as="div" />
      <Text content="SPEAKERES" weight="bold" styles={pageHeaderSpeakersStyles} as="div" />
      <Divider styles={pageHeaderDividerStyles} />
    </Slot>
  )
}
