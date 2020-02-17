import { compose } from '@fluentui/react-bindings'

import { createShorthandFactory } from '../../utils'
import Status, { StatusProps } from '../Status/Status'

export interface AvatarStatusProps extends StatusProps {}

const AvatarStatus = compose(Status, {
  displayName: 'AvatarStatus',
})

// @ts-ignore
AvatarStatus.create = createShorthandFactory({
  // @ts-ignore
  Component: AvatarStatus,
  mappedProp: 'state',
})

export default AvatarStatus
