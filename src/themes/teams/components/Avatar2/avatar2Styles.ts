import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { avatarSizes, avatarTypes, avatarStates, IAvatar2Variables } from './avatar2Variables'

const getAvatarDimension = (size: string) => {
  return avatarSizes[size].size
  return 32
}

const getAvatarActualDimension = (size: string) => {
  return avatarSizes[size].actualSize
  return 32
}

const avatar2Styles: IComponentPartStylesInput = {
  root: ({ props: { size } }): ICSSInJSStyle => ({
    // backgroundColor: 'inherit',
    display: 'inline-block',
    verticalAlign: 'top',
    height: getAvatarActualDimension(size),
    width: getAvatarActualDimension(size),
  }),
  svgAvatar: ({ props: { avatarSize } }): ICSSInJSStyle => ({
    height: getAvatarDimension('medium'),
    width: getAvatarDimension('medium'),
  }),
}

export default avatar2Styles
