import * as React from 'react'

import defaultComponents from './defaultComponents'
import KnobsContext, { KnobContextValue } from './KnobContext'
import { KnobComponents, KnobDefinition, KnobName, KnobSet } from './types'

type KnobProviderProps = {
  components?: Partial<KnobComponents>
}

const KnobProvider: React.FunctionComponent<KnobProviderProps> = props => {
  const { children, components } = props
  const [knobs, setKnobs] = React.useState<KnobSet>({})

  const registerKnob = (knob: KnobDefinition) => {
    setKnobs(prevKnobs => {
      if (process.env.NODE_ENV !== 'production') {
        if (prevKnobs[knob.name]) {
          throw new Error(`Knob with name "${knob.name}" has been already registered`)
        }
      }
      return { ...prevKnobs, [knob.name]: knob }
    })
  }
  const setKnobValue = (knobName: KnobName, knobValue: any) => {
    setKnobs(prevKnob => ({
      ...prevKnob,
      [knobName]: { ...prevKnob[knobName], value: knobValue },
    }))
  }
  const unregisterKnob = (knobName: KnobName) => {
    setKnobs(prevKnobs => {
      const newKnobs = { ...prevKnobs }
      delete newKnobs[knobName]

      return newKnobs
    })
  }

  const value: KnobContextValue = React.useMemo(
    () => ({
      components: { ...defaultComponents, ...components },
      knobs,
      registerKnob,
      setKnobValue,
      unregisterKnob,
    }),
    [knobs, components],
  )

  return <KnobsContext.Provider value={value}>{children}</KnobsContext.Provider>
}

KnobProvider.defaultProps = {
  components: {},
}

export default KnobProvider
