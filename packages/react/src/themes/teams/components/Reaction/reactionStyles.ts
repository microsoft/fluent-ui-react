import { FontWeightProperty } from 'csstype'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import {
  default as Reaction,
  ReactionProps,
  ReactionState,
} from '../../../../components/Reaction/Reaction'
import { pxToRem } from '../../../../lib'
import { ReactionVariables } from './reactionVariables'

const contentClassNameSelector = `& .${Reaction.slotClassNames.content}`

const reactionStyles: ComponentSlotStylesInput<ReactionProps & ReactionState, ReactionVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    cursor: 'pointer',
    background: 'transparent',
    border: pxToRem(0),
    padding: pxToRem(0),
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: v.color,
    ':hover': {
      color: v.colorHover,
      [contentClassNameSelector]: {
        fontWeight: v.fontWeightHover as FontWeightProperty,
      },
    },
    ...(p.isFromKeyboard && {
      ':focus': {
        outline: `${v.outlineColorFocus} solid ${v.outlineWidthFocus}`,
        outlineOffset: v.outlineOffsetFocus,
      },
    }),
  }),
  icon: ({ props: p }) => ({
    marginRight: p.content ? pxToRem(4) : pxToRem(0),
  }),
  content: ({ variables: v }) => ({
    fontSize: v.contentFontSize,
  }),
}

export default reactionStyles
