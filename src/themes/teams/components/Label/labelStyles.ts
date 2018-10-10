import { pxToRem } from '../../../../lib'
import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { ILabelProps } from '../../../../components/Label/Label'

const labelStyles: IComponentPartStylesInput<ILabelProps, any> = {
  root: ({
    props: { icon, iconPosition, image, imagePosition, content, circular },
    variables,
  }): ICSSInJSStyle => ({
    padding: variables.padding,
    ...(image &&
      imagePosition === 'start' && {
        paddingLeft: variables.startPaddingLeft,
      }),
    ...(image &&
      imagePosition === 'end' && {
        paddingRight: variables.endPaddingRight,
      }),
    display: 'inline-grid',
    // gridTemplateAreas:
    //   '"' +
    //   [
    //     image && imagePosition === 'start' && 'image',
    //     icon && iconPosition === 'start' && 'icon',
    //     content && 'content',
    //     icon && iconPosition === 'end' && 'icon',
    //     image && imagePosition === 'end' && 'image',
    //   ]
    //     .filter(Boolean)
    //     .join(' ') +
    //   '"',
    gridGap: pxToRem(3),
    alignItems: 'center',
    height: variables.height,
    fontSize: pxToRem(14),
    lineHeight: variables.height,
    backgroundColor: variables.backgroundColor,
    color: variables.color,
    borderRadius: pxToRem(3),
    ...(circular && {
      borderRadius: variables.circularRadius,
    }),
    overflow: 'hidden',
  }),

  image: ({ props, variables }): ICSSInJSStyle => ({
    gridArea: 'image',
    height: variables.height,
    width: variables.height,
  }),

  icon: ({ props }): ICSSInJSStyle => ({
    gridArea: 'icon',
    ...(props.icon &&
      typeof props.icon === 'object' &&
      (props.icon as any).onClick && {
        cursor: 'pointer',
      }),
  }),
}

export default labelStyles
