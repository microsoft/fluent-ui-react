import { IComponentPartStylesInput, ICSSInJSStyle } from '../../../../../types/theme'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from './attachmentVariables'
import { pxToRem } from '../../../../lib'
import { Extendable } from '../../../../../types/utils'

type StyleParam = { props: Extendable<AttachmentProps>; variables: AttachmentVariables }

const attachmentStyles: IComponentPartStylesInput = {
  root: ({ props, variables }: StyleParam): ICSSInJSStyle => ({
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

    ...((props.actionable || props.onClick) && {
      cursor: 'pointer',

      ':hover': {
        background: variables.backgroundColorHover,
      },
    }),
  }),

  content: ({ props }: StyleParam): ICSSInJSStyle => ({
    flex: 1,
  }),

  header: ({ props, variables }: StyleParam): ICSSInJSStyle => ({
    fontSize: variables.headerFontSize,
    fontWeight: variables.headerFontWeight,
    lineHeight: variables.headerLineHeight,
  }),

  description: ({ props, variables }: StyleParam): ICSSInJSStyle => ({
    opacity: 0.5,
    fontSize: variables.descriptionFontSize,
    fontWeight: variables.descriptionFontWeight,
    lineHeight: variables.descriptionLineHeight,
  }),

  icon: ({ props, variables }: StyleParam): ICSSInJSStyle => ({
    flex: '0 0 auto',
    marginRight: variables.iconSpace,
  }),

  action: ({ props }: StyleParam): ICSSInJSStyle => ({
    flex: '0 0 auto',
  }),

  progress: ({ props, variables }: StyleParam): ICSSInJSStyle => ({
    transition: 'width 0.2s',
    position: 'absolute',
    display: 'block',
    bottom: 0,
    left: 0,
    width: props.progress + '%',
    height: pxToRem(variables.progressHeight),
    background: variables.progressColor,
  }),
}

export default attachmentStyles
