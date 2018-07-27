import { pxToRem } from '../../lib'
import { IButtonVariables } from './buttonVariables'
import { IButtonProps } from './Button'

export default {
  root: ({ props, variables }: { props: IButtonProps; variables: IButtonVariables }) => {
    const { children, circular, content, fluid, type } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      backgroundColor,
      backgroundColorHover,
      circularRadius,
      circularWidth,
      typePrimaryColor,
      typePrimaryBackgroundColor,
      typePrimaryBackgroundColorHover,
      typePrimaryBorderColor,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBorderColor,
    }: IButtonVariables = variables

    return {
      backgroundColor,
      display: 'inline-block',
      margin: `0 ${pxToRem(8)} 0 0`,
      height: pxToRem(32),
      width: pxToRem(96),
      verticalAlign: 'middle',
      cursor: 'pointer',
      borderWidth: 0,
      borderRadius: pxToRem(4),
      ':hover': {
        backgroundColor: backgroundColorHover,
      },
      ...(circular && { borderRadius: circularRadius, width: circularWidth }),

      ...(fluid && { display: 'block', width: '100%' }),

      ...(type === 'primary' && {
        color: typePrimaryColor,
        backgroundColor: typePrimaryBackgroundColor,
        borderColor: typePrimaryBorderColor,
        ':hover': {
          backgroundColor: typePrimaryBackgroundColorHover,
        },
      }),

      ...(type === 'secondary' && {
        color: typeSecondaryColor,
        backgroundColor: typeSecondaryBackgroundColor,
        borderColor: typeSecondaryBorderColor,
        borderWidth: '2px',
        ':hover': {
          borderColor: 'transparent',
          backgroundColor: typeSecondaryBackgroundColorHover,
        },
      }),
    }
  },
}
