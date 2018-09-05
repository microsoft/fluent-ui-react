import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { disabledStyle, truncateStyle } from '../../../../styles/customCSS'

const buttonStyles: IComponentPartStylesInput = {
  root: ({ props, variables }: { props: any; variables: any }): ICSSInJSStyle => {
    const { circular, disabled, fluid, type, iconOnly, isLastFocusFromKeyboard } = props
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
      typePrimaryBorderFocusColor,
      typeSecondaryColor,
      typeSecondaryBackgroundColor,
      typeSecondaryBackgroundColorHover,
      typeSecondaryBorderColor,
      typeSecondaryBorderFocusColor,
    } = variables

    const focusAndHoverSecondary = {
      color: typeSecondaryColor,
      borderColor: 'transparent',
      backgroundColor: typeSecondaryBackgroundColorHover,
    }

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
      borderColor: 'transparent',

      borderWidth: `${circular ? 1 : 2}px`,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: backgroundColorHover,
      },

      ...(primary && {
        color: typePrimaryColor,
        backgroundColor: typePrimaryBackgroundColor,
        borderColor: typePrimaryBorderColor,
        ':hover': {
          color: typePrimaryColor,
          backgroundColor: typePrimaryBackgroundColorHover,
        },
      }),

      ...(secondary && {
        color: typeSecondaryColor,
        backgroundColor: typeSecondaryBackgroundColor,
        borderColor: typeSecondaryBorderColor,
        ':hover': focusAndHoverSecondary,
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

      ':focus': {
        outline: '0',
        ...(isLastFocusFromKeyboard && {
          ...((primary && {
            boxShadow: `inset 0 0 0 2px ${typePrimaryBorderFocusColor}`,
            color: typePrimaryColor,
            backgroundColor: typePrimaryBackgroundColorHover,
          }) || {
            boxShadow: `inset 0 0 0 2px ${typeSecondaryBorderFocusColor}`,
            ...focusAndHoverSecondary,
          }),
        }),
      },

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
