import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from './attachmentVariables'
import { pxToRem } from '../../../../lib'
import { teamsIconClassNames } from '../Icon/svg'
import Icon from '../../../../components/Icon/Icon'
import getBorderFocusStyles from '../../getBorderFocusStyles'

const attachmentStyles: ComponentSlotStylesInput<AttachmentProps, AttachmentVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
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
    border: `${siteVariables.borderWidth} solid ${v.borderColor}`,

    outline: 0,
    ...getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: p.isFromKeyboard,
      borderRadius: v.borderRadius,
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

  action: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    flex: '0 0 auto',

    [`& .${Icon.className}`]: {
      color: v.textColor, // this breaks the color change on hover
    },

    outline: 0,
    ...getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: p.isFromKeyboard,
      borderRadius: v.borderRadius,
    }),

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
