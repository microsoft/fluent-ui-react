import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from './attachmentVariables'
import { pxToRem } from '../../../../lib'
import Button from '../../../../components/Button/Button'

const attachmentStyles: ComponentSlotStylesInput<AttachmentProps, AttachmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    boxSizing: 'border-box',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: pxToRem(300),
    minHeight: pxToRem(48),
    padding: v.padding,
    marginBottom: pxToRem(2),
    marginRight: pxToRem(2),
    background: v.backgroundColor,
    color: v.textColor,
    boxShadow: v.boxShadow,
    border: v.border,
    borderRadius: v.borderRadius,

    outline: 0,

    '& *': {
      boxSizing: `border-box`,
    },

    ...(p.isFromKeyboard && {
      ':focus': {
        outline: `.2rem solid ${v.focusOutlineColor}`,
      },
    }),

    ...((p.actionable || p.onClick) && {
      cursor: 'pointer',

      ':hover': {
        background: v.backgroundColorHover,
        color: v.textColorHover,

        [`& .${Button.className}`]: {
          color: v.actionColorContrastOverride,
        },
      },
    }),
  }),

  content: (): ICSSInJSStyle => ({
    flex: 1,
    margin: '-2px 0',
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
    border: '1px solid transparent',
    margin: '-1px', // negative margin should match border width.

    ':hover': {
      borderColor: v.actionColorContrastOverride,
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
