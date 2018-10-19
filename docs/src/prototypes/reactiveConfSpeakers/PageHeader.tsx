import * as React from 'react'
import { Text } from '@stardust-ui/react'
import Divider from './Divider'
import { mainContent } from './styles'
import Slot from '../../../../src/components/Slot/Slot'
import { pxToRem } from '../../../../src/lib'

export default () => {
  return (
    <Slot styles={mainContent}>
      <Text content="MEET OUR STELLAR" as="div" />
      <Text
        content="SPEAKERES"
        weight="bold"
        styles={{ color: '#56b36d', fontSize: pxToRem(84), marginTop: `-${pxToRem(20)}` }}
        as="div"
      />
      <Divider styles={{ marginTop: `-${pxToRem(35)}` }} />
    </Slot>
  )
}
