import * as React from 'react'
import { Indicator, Flex } from '@stardust-ui/react'

const IndicatorExampleRtl = () => (
  <Flex gap="gap.smaller">
    <Indicator direction="end" />
    <Indicator direction="bottom" />
    <Indicator direction="start" />
    <Indicator direction="top" />
  </Flex>
)

export default IndicatorExampleRtl
