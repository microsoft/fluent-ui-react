import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { IButtonProps } from '../../../../components/Button/Button'

const buttonStyles: IComponentPartStylesInput<IButtonProps, any> = {
  root: ({ props, variables }): ICSSInJSStyle => {
    const { type, text } = props
    const primary = type === 'primary'
    const secondary = type === 'secondary'

    const {
      color,
      backgroundColor,
      backgroundColorHover,
      typePrimaryColor,
      typePrimaryBackgroundColor,
      typePrimaryBackgroundColorHover,
      typePrimaryBorderColor,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBorderColor,
      typeSecondaryBorderColorHover,
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
