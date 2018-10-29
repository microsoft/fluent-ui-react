import * as React from 'react'
import { Text, Divider } from '@stardust-ui/react'
import { header, headerDivider } from './styles'
import * as Dusty from './dusties'

export default () => {
  return (
    <Dusty.div>
      <Text content="MEET OUR STELLAR" as="div" />
      <Text content="SPEAKERES" weight="bold" styles={header} as="div" />
      <Divider styles={headerDivider} />
    </Dusty.div>
  )
}
