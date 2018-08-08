import { pxToRem } from '../../../../lib'
import { disabledStyle, truncateStyle } from '../../../../styles/customCSS'
import { IButtonVariables } from './buttonVariables'

export default {
  root: ({ props, variables }: { props: any; variables: IButtonVariables }) => {
    const { circular, disabled, fluid, icon, iconPosition, type } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      height,
      minWidth,
      maxWidth,
      backgroundColor,
      backgroundColorHover,
      circularRadius,
      paddingLeftRightValue,
      typePrimaryColor,
      typePrimaryBackgroundColor,
      typePrimaryBackgroundColorHover,
      typePrimaryBorderColor,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBorderColor,
    } = variables

    const styles = {
      height,
      minWidth,
      maxWidth,
      backgroundColor,
      display: 'inline-block',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      margin: `0 ${pxToRem(8)} 0 0`,
      verticalAlign: 'middle',
      borderRadius: pxToRem(2),
      borderWidth: 0,

      ...truncateStyle,

      ...(icon &&
        (iconPosition
          ? {
              display: 'inline-flex',
              justifyContent: 'center',
            }
          : {
              minWidth: height,
              padding: 0,
            })),

      ...(circular && {
        minWidth: height,
        padding: 0,
        borderRadius: circularRadius,
      }),

      ...(fluid && {
        width: '100%',
        maxWidth: '100%',
      }),
    }

    if (disabled) {
      return {
        ...styles,
        ...disabledStyle,
      }
    }

    return {
      ...styles,

      borderWidth: `${secondary ? (circular ? 1 : 2) : 0}px`,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: backgroundColorHover,
      },

      ...(primary && {
        color: typePrimaryColor,
        backgroundColor: typePrimaryBackgroundColor,
        borderColor: typePrimaryBorderColor,
        ':hover': {
          backgroundColor: typePrimaryBackgroundColorHover,
        },
      }),

      ...(secondary && {
        color: typeSecondaryColor,
        backgroundColor: typeSecondaryBackgroundColor,
        borderColor: typeSecondaryBorderColor,
        ':hover': {
          borderColor: 'transparent',
          backgroundColor: typeSecondaryBackgroundColorHover,
        },
      }),
    }
  },
}
