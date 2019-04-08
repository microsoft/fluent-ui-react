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
    color: v.meReacting ? v.meReactingColor : v.otherReactingColor,
    ':hover': {
      color: v.meReacting ? v.meReactingColorHover : v.otherReactingColorHover,
      [contentClassNameSelector]: {
        fontWeight: v.fontWeightHover as FontWeightProperty,
      },
    },
    position: 'relative',
    ...(!p.isFromKeyboard && {
      ':focus': {
        outline: 'none',
      },
    }),
    ...(p.isFromKeyboard && {
      ':focus': {
        outline: 'none',
        ':after': {
          content: '""',
          position: 'absolute',
          top: `-${pxToRem(2)}`,
          right: `-${pxToRem(2)}`,
          bottom: `-${pxToRem(2)}`,
          left: `-${pxToRem(2)}`,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: v.borderColorFocus,
          borderRadius: pxToRem(2),
          boxShadow: `0px 0px 0px 1px ${v.boxShadowColor} inset`,
        },
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
