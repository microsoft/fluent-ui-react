import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { disabledStyle, truncateStyle } from '../../../../styles/customCSS'

const buttonStyles: IComponentPartStylesInput = {
  root: ({ props, variables }: { props: any; variables: any }): ICSSInJSStyle => {
    const { circular, disabled, fluid, type, iconOnly } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      height,
      minWidth,
      maxWidth,
      color,
      backgroundColor,
      backgroundColorHover,
      circularRadius,
      paddingLeftRightValue,
      typePrimaryColor,
      typePrimaryBackgroundColor,
      typePrimaryBackgroundColorActive,
      typePrimaryBackgroundColorHover,
      typePrimaryBackgroundColorFocus,
      typePrimaryBorderColor,
      typePrimaryBorderColorFocus,
      typePrimaryBorderColorInsetFocus,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorActive,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBackgroundColorFocus,
      typeSecondaryBorderColor,
      typeSecondaryBorderColorActive,
      typeSecondaryBorderColorHover,
      typeSecondaryBorderColorFocus,
      typeSecondaryBorderColorInsetFocus,
    } = variables

    return {
      cursor: 'pointer',
      outline: 0,
      height,
      minWidth,
      maxWidth,
      color,
      backgroundColor,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      margin: `0 ${pxToRem(8)} 0 0`,
      verticalAlign: 'middle',
      borderRadius: pxToRem(2),
      borderWidth: `${secondary ? (circular ? 1 : 2) : 0}px`,
      ':hover': {
        backgroundColor: backgroundColorHover,
      },

      ...(primary && {
        color: typePrimaryColor,
        backgroundColor: typePrimaryBackgroundColor,
        border: `${pxToRem(1)} solid ${typePrimaryBorderColor}`,
        ':active': {
          backgroundColor: typePrimaryBackgroundColorActive,
        },
        ':hover': {
          backgroundColor: typePrimaryBackgroundColorHover,
        },
        ':focus': {
          backgroundColor: typePrimaryBackgroundColorFocus,
          borderColor: typePrimaryBorderColorFocus,
          '::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            border: `${pxToRem(1)} solid ${typePrimaryBorderColorInsetFocus}`,
            borderRadius: `${pxToRem(2)}`,
          },
        },
      }),

      ...(secondary && {
        color: typeSecondaryColor,
        backgroundColor: typeSecondaryBackgroundColor,
        borderColor: typeSecondaryBorderColor,
        borderWidth: pxToRem(1),
        ':active': {
          backgroundColor: typeSecondaryBackgroundColorActive,
          borderColor: typeSecondaryBorderColorActive,
        },
        ':hover': {
          backgroundColor: typeSecondaryBackgroundColorHover,
          borderColor: typeSecondaryBorderColorHover,
        },
        ':focus': {
          backgroundColor: typeSecondaryBackgroundColorFocus,
          borderColor: typeSecondaryBorderColorFocus,
          '::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            border: `${pxToRem(1)} solid ${typeSecondaryBorderColorInsetFocus}`,
            borderRadius: `${pxToRem(2)}`,
          },
        },
      }),

      ...(circular && {
        minWidth: height,
        padding: 0,
        borderRadius: circularRadius,
      }),

      ...(fluid && {
        width: '100%',
        maxWidth: '100%',
      }),

      ...(disabled && {
        ...disabledStyle,
        ':hover': {
          borderColor: undefined,
          backgroundColor: undefined,
        },
      }),

      ...(iconOnly && {
        minWidth: height,
        padding: 0,
      }),
    }
  },

  content: ({ props }) => ({
    overflow: 'hidden',
    ...(typeof props.content === 'string' && truncateStyle),
  }),
}

export default buttonStyles
