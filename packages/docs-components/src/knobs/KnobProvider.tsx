import * as React from 'react'

import defaultComponents from './defaultComponents'
import KnobsContext, { KnobContextValue } from './KnobContext'
import { KnobDefinition, KnobName, KnobSet } from './types'

const KnobProvider: React.FunctionComponent = props => {
  const [knobs, setKnobs] = React.useState<KnobSet>({})

  const registerKnob = (knob: KnobDefinition) => {
    if (process.env.NODE_ENV !== 'production') {
      if (knobs[knob.name]) {
        throw new Error(`Knob with name "${knob.name}" has been already registered`)
      }
    }

    setKnobs(prevKnob => ({ ...prevKnob, [knob.name]: knob }))
  }
  const setKnobValue = (knobName: KnobName, knobValue: any) => {
    setKnobs(prevKnob => ({
      ...prevKnob,
      [knobName]: { ...prevKnob[knobName], value: knobValue },
    }))
  }
  const unregisterKnob = (knobName: KnobName) => {
    setKnobs(prevKnob => {
      const newKnobs = { ...prevKnob }
      delete newKnobs[knobName]

      return newKnobs
    })
  }

  const value: KnobContextValue = {
    components: defaultComponents,
    knobs,
    registerKnob,
    setKnobValue,
    unregisterKnob,
  }

  return <KnobsContext.Provider value={value}>{props.children}</KnobsContext.Provider>
}

export default KnobProvider
