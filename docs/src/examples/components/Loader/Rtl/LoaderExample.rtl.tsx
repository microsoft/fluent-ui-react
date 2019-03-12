import * as React from 'react'
import { Flex, Loader } from '@stardust-ui/react'

const LoaderExampleRtl = () => (
  <Flex column gap="gap.medium">
    <Loader label="في البداية" labelPosition="start" />
    <Loader label="في النهاية" labelPosition="end" />
  </Flex>
)

export default LoaderExampleRtl
