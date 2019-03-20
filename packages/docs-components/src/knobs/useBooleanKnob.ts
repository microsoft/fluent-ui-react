import * as React from 'react'

import KnobContext from './KnobContext'

const useBooleanKnob = (name: string, initialValue = false, displayName?: React.ReactNode) => {
  const knobContext = React.useContext(KnobContext)

  const value = knobContext.knobs[name] === undefined ? initialValue : knobContext.knobs[name].value
  const setValue = (newValue: boolean) => {
    knobContext.setKnobValue(name, newValue)
  }

  React.useEffect(
    () => {
      knobContext.registerKnob({
        displayName,
        name,
        type: 'boolean',
        value: initialValue,
      })

      return () => knobContext.unregisterKnob(name)
    },
    [name],
  )

  return [value, setValue]
}

export default useBooleanKnob
