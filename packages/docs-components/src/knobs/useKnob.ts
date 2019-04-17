import * as React from 'react'

import KnobContext from './KnobContext'
import { KnobDefinition, UseKnobOptions } from './types'

const useKnob = <T>(
  options: UseKnobOptions<T> & { type: KnobDefinition['type'] },
): [T, (newValue: T) => void] => {
  const { content, initialValue, name, type, values } = options
  const knobContext = React.useContext(KnobContext)

  const value: T =
    knobContext.knobs[name] === undefined ? initialValue : knobContext.knobs[name].value
  const setValue = (newValue: T) => {
    knobContext.setKnobValue(name, newValue)
  }

  React.useEffect(
    () => {
      knobContext.registerKnob({
        content,
        name,
        type,
        value: initialValue,
        values,
      })

      return () => knobContext.unregisterKnob(name)
    },
    [name],
  )

  return [value, setValue]
}

export default useKnob
