import * as React from 'react'
import { Indicator, Flex } from '@stardust-ui/react'

const IndicatorExampleIcon = () => (
  <Flex gap="gap.smaller">
    <Indicator icon="chevron down" direction="end" />
    <Indicator icon="chevron down" direction="bottom" />
    <Indicator icon="chevron down" direction="start" />
    <Indicator icon="chevron down" direction="top" />
  </Flex>
)
export default IndicatorExampleIcon
