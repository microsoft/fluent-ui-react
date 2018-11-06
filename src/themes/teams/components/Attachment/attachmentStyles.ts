import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from './attachmentVariables'
import { teamsPxToRem } from '../../utils'

const attachmentStyles: ComponentSlotStylesInput<AttachmentProps, AttachmentVariables> = {
  root: ({ props, variables }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: teamsPxToRem(300),
    minHeight: teamsPxToRem(48),
    padding: teamsPxToRem(8),
    marginBottom: teamsPxToRem(2),
    marginRight: teamsPxToRem(2),
    background: variables.backgroundColor,
    color: variables.textColor,

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
    width: props.progress + '%',
    maxWidth: '100%',
    height: teamsPxToRem(variables.progressHeight),
    background: variables.progressColor,
  }),
}

export default attachmentStyles
