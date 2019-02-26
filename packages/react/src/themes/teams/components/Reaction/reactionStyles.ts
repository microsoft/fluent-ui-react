import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ReactionProps } from '@stardust-ui/react'
import { pxToRem } from 'src/lib'
import { ReactionVariables } from 'src/themes/teams/components/Reaction/reactionVariables'
import Reaction from 'src/components/Reaction/Reaction'
import { FontWeightProperty } from 'csstype'

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
