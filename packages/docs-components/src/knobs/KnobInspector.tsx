import * as ObjectValues from 'object.values'
import * as React from 'react'
import KnobsContext from './KnobContext'
import { KnobComponentProps, KnobDefinition } from './types'

const KnobInspector: React.FunctionComponent = () => {
  const knobsContext = React.useContext(KnobsContext)

  const { KnobBoolean, KnobControl, KnobField, KnobLabel, KnobString } = knobsContext.components
  // TODO: Crash if components are not defined
  const componentsMappping = {
    boolean: KnobBoolean,
    string: KnobString,
  }
  const knobValues: KnobDefinition[] = ObjectValues(knobsContext.knobs)

  return (
    <>
      {knobValues.map((knob: KnobDefinition) => {
        const setValue = (value: any) => knobsContext.setKnobValue(knob.name, value)
        const knobProps: KnobComponentProps = { ...knob, setValue }

        return (
          <KnobField {...knobProps} key={knob.name}>
            <KnobLabel {...knobProps} />
            <KnobControl {...knobProps}>
              {React.createElement(componentsMappping[knob.type], knobProps)}
            </KnobControl>
          </KnobField>
        )
      })}
    </>
  )
}

export default KnobInspector
