import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { disabledStyle, truncateStyle } from '../../../../styles/customCSS'

const buttonStyles: IComponentPartStylesInput = {
  root: ({ props, variables }: { props: any; variables: any }): ICSSInJSStyle => {
    const { circular, disabled, fluid, type, text, iconOnly } = props
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
      typePrimaryBackgroundColorHover,
      typePrimaryBorderColor,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBorderColor,
      typeTextColorHover,
      typeTextPrimaryColor,
      typeTextPrimaryColorHover,
      typeTextSecondaryColor,
      typeTextSecondaryColorHover,
    } = variables

    return {
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
      cursor: 'pointer',

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
          borderColor: typePrimaryBorderColor,
          ':hover': {
            color: typePrimaryColor,
            backgroundColor: typePrimaryBackgroundColorHover,
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
          ':hover': {
            color: typeSecondaryColor,
            borderColor: 'transparent',
            backgroundColor: typeSecondaryBackgroundColorHover,
          },
        }),

      ...(secondary &&
        text && {
          color: typeTextSecondaryColor,
          ':hover': {
            color: typeTextSecondaryColorHover,
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
