import * as React from 'react'
import { Reaction } from '@stardust-ui/react'

const ReactionExample = () => (
  <>
    <Reaction icon="thumbs up" count={10} />
    <Reaction icon="thumbs down" count="1.2K" />
  </>
)

export default ReactionExample
