import * as values from 'object.values'
import * as React from 'react'

import KnobsContext from './KnobContext'
import { KnobDefinition } from './types'

const useKnobValues = (): KnobDefinition[] => {
  const knobsContext = React.useContext(KnobsContext)

  return values(knobsContext.knobs)
}

export default useKnobValues
