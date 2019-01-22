import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from './attachmentVariables'
import { pxToRem } from '../../../../lib'

const attachmentStyles: ComponentSlotStylesInput<AttachmentProps, AttachmentVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: pxToRem(300),
    minHeight: pxToRem(48),
    padding: pxToRem(8),
    marginBottom: pxToRem(2),
    marginRight: pxToRem(2),
    background: variables.backgroundColor,
    color: variables.textColor,

    outline: 0,

    ...(props.isFromKeyboard && {
      ':focus': {
        outline: `.2rem solid ${variables.focusOutlineColor}`,
      },
    }),

    ...((props.actionable || props.onClick) && {
      cursor: 'pointer',

      ':hover': {
        background: variables.backgroundColorHover,
      },
    }),
  }),

  content: ({ props }): ICSSInJSStyle => ({
    flex: 1,
  }),

  header: ({ props, variables }): ICSSInJSStyle => ({
    fontSize: variables.headerFontSize,
    fontWeight: variables.headerFontWeight,
    lineHeight: variables.headerLineHeight,
  }),

  description: ({ props, variables }): ICSSInJSStyle => ({
    display: 'block',
    opacity: 0.5,
    fontSize: variables.descriptionFontSize,
    fontWeight: variables.descriptionFontWeight,
    lineHeight: variables.descriptionLineHeight,
  }),

  icon: ({ props, variables }): ICSSInJSStyle => ({
    flex: '0 0 auto',
    marginRight: variables.iconSpace,
  }),

  action: ({ props }): ICSSInJSStyle => ({
    flex: '0 0 auto',
  }),

  progress: ({ props, variables }): ICSSInJSStyle => ({
    transition: 'width 0.2s',
    position: 'absolute',
    display: 'block',
    bottom: 0,
    left: 0,
    width: `${props.progress}%`,
    maxWidth: '100%',
    height: pxToRem(variables.progressHeight),
    background: variables.progressColor,
  }),
}

export default attachmentStyles
