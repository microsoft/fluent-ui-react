import * as React from 'react'
import { Sizes } from '../../lib/enums'

export const SizeContext = React.createContext({
  size: Sizes.Medium,
})
