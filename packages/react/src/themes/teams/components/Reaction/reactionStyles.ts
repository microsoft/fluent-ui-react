import { FontWeightProperty } from 'csstype'
import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { default as Reaction, ReactionProps } from '../../../../components/Reaction/Reaction'
import { pxToRem } from '../../../../lib'
import { ReactionVariables } from './reactionVariables'

const contentClassNameSelector = `& .${Reaction.slotClassNames.content}`

const reactionStyles: ComponentSlotStylesInput<ReactionProps, ReactionVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    cursor: 'pointer',
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
  }),
  icon: ({ props: p }) => ({
    marginRight: p.content ? pxToRem(4) : pxToRem(0),
  }),
  content: ({ variables: v }) => ({
    fontSize: v.contentFontSize,
  }),
}

export default reactionStyles
