import * as _ from 'lodash'

import { pxToRem, SizeValue } from '../../../../lib'
import { IconVariables } from './iconVariables'

import { sizeToPxValue as avatarSizeToPxValue } from '../Avatar/avatarStyles'

const sizeToIconPaddingInPx: Record<SizeValue, number> = {
  smallest: 4,
  smaller: 4,
  small: 4,
  medium: 6,
  large: 8,
  larger: 8,
  largest: 10,
}

export const getAvatarFontIconStyles = (size: SizeValue, v: IconVariables) => {
  const slotSizeInPx = avatarSizeToPxValue[size]
  const iconBorderWidthInPx = v.avatarBorderWidth || 0
  const iconPaddingSizeInPx = sizeToIconPaddingInPx[size]

  const iconSizeInRems = pxToRem(slotSizeInPx - 2 * iconPaddingSizeInPx - 2 * iconBorderWidthInPx)

  return {
    fontSize: iconSizeInRems,
    padding: pxToRem(iconPaddingSizeInPx),

    '::before': {
      width: iconSizeInRems,
      height: iconSizeInRems,
    },
  }
}
