import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IButtonProps } from '../../../../components/Button/Button'

const buttonStyles: IComponentPartStylesInput<IButtonProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, fluid, type, text, iconOnly, isFromKeyboard } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      height,
      minWidth,
      maxWidth,
      borderRadius,
      color,
      backgroundColor,
      backgroundColorHover,
      circularRadius,
      paddingLeftRightValue,
      typeDisabledButtonColor,
      typeDisabledButtonBackgroundColor,
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
      typeTextColorHover,
      typeTextPrimaryColor,
      typeTextPrimaryColorHover,
      typeTextSecondaryColor,
      typeTextSecondaryColorHover,
    } = variables

    return {
      color,
      backgroundColor,

      ...(!text && {
        ':hover': {
          backgroundColor: backgroundColorHover,
        },
      }),

      ...(primary &&
        !text && {
          color: typePrimaryColor,
          backgroundColor: typePrimaryBackgroundColor,
          border: `${pxToRem(1)} solid ${typePrimaryBorderColor}`,
          ':hover': {
            color: typePrimaryColor,
            backgroundColor: typePrimaryBackgroundColorHover,
          },
        }),

      ...(secondary &&
        !text && {
          color: typeSecondaryColor,
          backgroundColor: typeSecondaryBackgroundColor,
          borderColor: typeSecondaryBorderColor,
          border: `${pxToRem(1)} solid ${typeSecondaryBorderColor}`,
          ':active': {
            backgroundColor: typeSecondaryBackgroundColorActive,
            borderColor: typeSecondaryBorderColorActive,
          },
          ':hover': {
            backgroundColor: typeSecondaryBackgroundColorHover,
            borderColor: typeSecondaryBorderColorHover,
          },
        }),

      ...(secondary &&
        text && {
          color: typeTextSecondaryColor,
          ':hover': {
            color: typeTextSecondaryColorHover,
          },
        }),
    }
  },
}

export default buttonStyles
