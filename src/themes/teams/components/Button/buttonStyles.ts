import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { disabledStyle, truncateStyle } from '../../../../styles/customCSS'

const buttonStyles: IComponentPartStylesInput = {
  root: ({ props, variables }: { props: any; variables: any }): ICSSInJSStyle => {
    const { circular, content, disabled, fluid, type } = props
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
    } = variables

    return {
      height,
      minWidth,
      maxWidth,
      color,
      backgroundColor,
      display: 'inline-flex',
      justifyContent: 'center',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      margin: `0 ${pxToRem(8)} 0 0`,
      verticalAlign: 'middle',
      borderRadius: pxToRem(2),

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
    }
  },

  content: ({ props }) => ({
    overflow: 'hidden',
    ...(typeof props.content === 'string' && truncateStyle),
  }),
}

export default buttonStyles
