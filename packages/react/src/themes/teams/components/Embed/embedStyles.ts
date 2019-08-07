import { ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { pxToRem } from '../../../../lib'
import Embed, { EmbedProps, EmbedState } from '../../../../components/Embed/Embed'
import { EmbedVariables } from './embedVariables'
import getBorderFocusStyles from '../../getBorderFocusStyles'

export default {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const { ':focus': borderFocusStyles } = getBorderFocusStyles({
      siteVariables,
      isFromKeyboard: p.isFromKeyboard,
    })

    return {
      display: 'inline-block',
      verticalAlign: 'middle',
      position: 'relative',
      cursor: 'pointer',
      width: v.width,
      height: v.height || 'auto',
      outline: 0,
      background: 'grey',

      ...(p.isFromKeyboard && {
        ':focus': {
          [`& .${Embed.slotClassNames.control}`]: {
            borderColor: v.focusBorderColor,
            opacity: 1,
            ...borderFocusStyles,
          },
        },
      }),
      ':hover': {
        [`& .${Embed.slotClassNames.control}`]: {
          opacity: 1,
          zIndex: 1,
        },
      },
    }
  },
  control: ({ props: p, variables: v }): ICSSInJSStyle => ({
    background: `0 no-repeat ${v.controlBackgroundColor}`,
    backgroundPositionX: pxToRem(3),
    color: v.controlColor,

    opacity: p.active ? 0 : 1,
    pointerEvents: 'none',
    transition: 'opacity .22s ease-in-out',

    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
} as ComponentSlotStylesInput<EmbedProps & EmbedState, EmbedVariables>
