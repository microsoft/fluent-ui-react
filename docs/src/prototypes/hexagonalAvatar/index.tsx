import * as React from 'react'
import { Provider, Flex, StatusProps, WithAsProp, Extendable } from '@stardust-ui/react'
import Avatar from './CustomAvatar'
import themeOverrides from './themeOverrides'

const statusProps: Extendable<WithAsProp<StatusProps>> = {
  icon: 'stardust-checkmark',
  state: 'success',
  title: 'Available',
}

const AvatarExampleSizeShorthand = () => (
  <Provider theme={themeOverrides}>
    <Flex padding="padding.medium" gap="gap.medium">
      <Avatar hexagonal={true} image={'public/images/avatar/small/matt.jpg'} status={statusProps} />
      <Avatar hexagonal={true} name="John Doe" status={statusProps} />
    </Flex>
  </Provider>
)

export default AvatarExampleSizeShorthand
