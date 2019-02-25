import * as _ from 'lodash'

import { ICSSInJSStyle, ComponentSlotStylesInput } from '../../../types'
import { ReactionProps } from '@stardust-ui/react'
import { pxToRem } from 'src/lib'

const reactionStyles: ComponentSlotStylesInput<ReactionProps, {}> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  icon: {
    marginRight: pxToRem(3),
  },
}

export default reactionStyles
