import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { disabledStyle, truncateStyle } from '../../../../styles/customCSS'

const buttonStyles: IComponentPartStylesInput = {
  content: ({ props }) => ({
    overflow: 'hidden',
    ...(typeof props.content === 'string' && { textOverflow: 'ellipsis' }),
  }),

  root: ({ props, variables }: { props: any; variables: any }): ICSSInJSStyle => {
    const { circular, content, disabled, fluid, type } = props
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

    return {
      height,
      minWidth,
      maxWidth,
      backgroundColor,
      display: 'inline-flex',
      position: 'relative',
      padding: `0 ${pxToRem(paddingLeftRightValue)}`,
      margin: `0 ${pxToRem(8)} 0 0`,
      verticalAlign: 'middle',
      borderRadius: pxToRem(2),
      borderWidth: 0,

      ...truncateStyle,

      ...(!content && {
        justifyContent: 'center',
      }),

      ...(circular && {
        justifyContent: 'center',
        minWidth: height,
        padding: 0,
        borderRadius: circularRadius,
      }),

      ...(fluid && {
        width: '100%',
        maxWidth: '100%',
      }),

      ...(disabled
        ? disabledStyle
        : {
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
          }),
    }
  },
}

export default buttonStyles
