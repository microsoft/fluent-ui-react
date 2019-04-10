import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { AttachmentProps } from '../../../../components/Attachment/Attachment'
import { AttachmentVariables } from '../../../teams/components/Attachment/attachmentVariables'
import Button from '../../../../components/Button/Button'
import Icon from '../../../../components/Icon/Icon'

const attachmentStyles: ComponentSlotStylesInput<AttachmentProps, AttachmentVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...((p.actionable || p.onClick) && {
      ...(p.isFromKeyboard && {
        ':focus': {
          backgroundColor: v.backgroundColorHover,
          color: v.textColorHover,

          [`& .${Button.className}`]: {
            color: v.textColorHover,
          },

          [`& .${Icon.className}`]: {
            color: v.textColorHover,
          },
        },
      }),

      ':hover': {
        [`& .${Button.className}`]: {
          color: v.textColorHover,
        },

        [`& .${Icon.className}`]: {
          color: v.textColorHover,
        },
      },
    }),
  }),

  action: ({ variables: v }): ICSSInJSStyle => ({
    ':hover': {
      outline: `1px solid ${v.textColorHover}`,
    },
  }),
}

export default attachmentStyles
