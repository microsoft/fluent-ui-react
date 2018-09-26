import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IButtonProps } from '../../../../components/Button/Button'

const buttonStyles: IComponentPartStylesInput<IButtonProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { circular, disabled, type, text, isFromKeyboard } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      color,
      backgroundColor,
      backgroundColorHover,
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
        borderWidth: `${secondary ? (circular ? 1 : 2) : 0}px`,
        ':hover': {
          backgroundColor: backgroundColorHover,
        },
      }),

      ...(text && {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        ':hover': {
          color: typeTextColorHover,
        },
      }),

      ...(primary &&
        !text && {
          color: typePrimaryColor,
          backgroundColor: typePrimaryBackgroundColor,
          border: `${pxToRem(1)} solid ${typePrimaryBorderColor}`,
          ':active': {
            backgroundColor: typePrimaryBackgroundColorActive,
          },
          ':hover': {
            color: typePrimaryColor,
            backgroundColor: typePrimaryBackgroundColorHover,
          },
        }),

      ...(primary &&
        !text &&
        !circular && {
          outline: 0,
          ':focus': {
            ...(isFromKeyboard && {
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
            }),
          },
        }),

      ...(primary &&
        text && {
          color: typeTextPrimaryColor,
          ':hover': {
            color: typeTextPrimaryColorHover,
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
        !text &&
        !circular && {
          outline: 0,
          ':focus': {
            ...(isFromKeyboard && {
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
            }),
          },
        }),

      ...(secondary &&
        text && {
          color: typeTextSecondaryColor,
          ':hover': {
            color: typeTextSecondaryColorHover,
          },
        }),

      ...(disabled && {
        color: typeDisabledButtonColor,
        backgroundColor: typeDisabledButtonBackgroundColor,
        borderColor: typeDisabledButtonBackgroundColor,
        ':hover': {
          backgroundColor: typeDisabledButtonBackgroundColor,
          borderColor: typeDisabledButtonBackgroundColor,
        },
      }),
    }
  },
}

export default buttonStyles
