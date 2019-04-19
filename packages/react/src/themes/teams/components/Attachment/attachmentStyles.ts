import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from './attachmentVariables'
import { pxToRem } from '../../../../lib'
import Icon from '../../../../components/Icon/Icon'
import { teamsIconClassNames } from '../Icon/svg'

const attachmentStyles: ComponentSlotStylesInput<AttachmentProps, AttachmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: pxToRem(440),
    minHeight: pxToRem(48),
    padding: v.padding,
    marginBottom: pxToRem(2),
    marginRight: pxToRem(2),
    background: v.backgroundColor,
    color: v.textColor,
    boxShadow: v.boxShadow,
    border: `${pxToRem(1)} solid ${v.borderColor}`,
    borderRadius: v.borderRadius,

    outline: 0,

    ...(p.isFromKeyboard && {
      ':focus': {
        borderColor: v.focusInnerBorderColor,
        boxShadow: `0 0 0 ${pxToRem(1)} ${v.focusOuterBorderColor}`,
      },
    }),

    ...((p.actionable || p.onClick) && {
      cursor: 'pointer',

      ':hover': {
        background: v.backgroundColorHover,
        color: v.textColorHover,
      },
    }),
  }),

  content: (): ICSSInJSStyle => ({
    flex: 1,
  }),

  header: ({ variables: v }): ICSSInJSStyle => ({
    fontSize: v.headerFontSize,
    fontWeight: v.headerFontWeight,
    lineHeight: v.headerLineHeight,
  }),

  description: ({ variables: v }): ICSSInJSStyle => ({
    display: 'block',
    opacity: 0.5,
    fontSize: v.descriptionFontSize,
    fontWeight: v.descriptionFontWeight,
    lineHeight: v.descriptionLineHeight,
  }),

  icon: ({ variables: v }): ICSSInJSStyle => ({
    flex: '0 0 auto',
    marginRight: v.iconSpace,
  }),

  action: ({ variables: v }): ICSSInJSStyle => ({
    flex: '0 0 auto',

    [`& .${Icon.className}`]: {
      color: v.textColor, // this breaks the color change on hover
    },

    ':hover': {
      [`& .${teamsIconClassNames.filled}`]: {
        display: 'block',
      },

      [`& .${teamsIconClassNames.outline}`]: {
        display: 'none',
      },
    },
  }),

  progress: ({ props: p, variables: v }): ICSSInJSStyle => ({
    transition: 'width 0.2s',
    position: 'absolute',
    display: 'block',
    bottom: 0,
    left: 0,
    width: `${p.progress}%`,
    maxWidth: '100%',
    height: pxToRem(v.progressHeight),
    background: v.progressColor,
  }),
}

export default attachmentStyles
