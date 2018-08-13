import { pxToRem } from '../../../../lib'
import { ICSSInJSStyle } from '../../../../../types/theme'

const labelStyles = {
  root: ({ props: { image, imagePosition, circular }, variables }): ICSSInJSStyle => ({
    padding: variables.padding,
    ...(image &&
      imagePosition === 'start' && {
        paddingLeft: variables.startPaddingLeft,
      }),
    ...(image &&
      imagePosition === 'end' && {
        paddingRight: variables.endPaddingRight,
      }),
    display: 'inline-flex',
    alignItems: 'center',
    height: variables.height,
    margin: `${pxToRem(4)} 0 0 ${pxToRem(4)}`,
    fontSize: pxToRem(14),
    lineHeight: variables.height,
    backgroundColor: variables.backgroundColor,
    color: variables.color,
    borderRadius: pxToRem(3),
    ...(circular && {
      borderRadius: variables.circularRadius,
    }),
    overflow: 'hidden',
  }),
  image: ({ variables }): ICSSInJSStyle => ({
    height: variables.height,
    width: variables.height,
  }),
}

export default labelStyles
