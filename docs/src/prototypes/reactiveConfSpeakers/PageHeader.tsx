import * as React from 'react'
import { Text, Divider } from '@stardust-ui/react'
import { mainContent, header, headerDivider } from './styles'
import Dusty from './dusties'

export default () => {
  return (
    <Dusty.div styles={mainContent}>
      <Text content="MEET OUR STELLAR" as="div" />
      <Text content="SPEAKERES" weight="bold" styles={header} as="div" />
      <Divider styles={headerDivider} />
    </Dusty.div>
  )
}
