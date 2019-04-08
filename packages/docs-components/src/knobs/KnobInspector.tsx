import * as React from 'react'

import KnobsContext, { KnobContextValue } from './KnobContext'
import { KnobComponent, KnobComponentProps, KnobDefinition } from './types'
import useKnobValues from './useKnobValues'

const getKnobControls = (
  knobsContext: KnobContextValue,
): Record<'Control' | 'Field' | 'Label', KnobComponent> => {
  const { KnobControl, KnobField, KnobLabel } = knobsContext.components
  const controls = {
    Control: KnobControl,
    Field: KnobField,
    Label: KnobLabel,
  }

  if (process.env.NODE_ENV !== 'production') {
    Object.keys(controls).forEach(name => {
      if (typeof controls[name] === 'undefined') {
        throw new Error(`"${name}" is not defined, please check you mapping`)
      }
    })
  }

  return controls
}

const getKnobComponents = (
  knobsContext: KnobContextValue,
): Record<KnobDefinition['type'], KnobComponent> => {
  const { KnobBoolean, KnobSelect, KnobString } = knobsContext.components
  const components = {
    boolean: KnobBoolean,
    select: KnobSelect,
    string: KnobString,
  }

  if (process.env.NODE_ENV !== 'production') {
    Object.keys(components).forEach(name => {
      if (typeof components[name] === 'undefined') {
        throw new Error(`A component for "${name}" is not defined, please check you mapping`)
      }
    })
  }

  return components
}

const KnobInspector: React.FunctionComponent = () => {
  const knobsContext = React.useContext(KnobsContext)

  const { Control, Field, Label } = getKnobControls(knobsContext)
  const knobComponents = getKnobComponents(knobsContext)
  const knobValues = useKnobValues()

  return (
    <>
      {knobValues.map((knob: KnobDefinition) => {
        const setValue = (value: any) => knobsContext.setKnobValue(knob.name, value)
        const knobProps: KnobComponentProps = { ...knob, setValue }

        return (
          <Field {...knobProps} key={knob.name}>
            <Label {...knobProps} />
            <Control {...knobProps}>
              {React.createElement(knobComponents[knob.type], knobProps)}
            </Control>
          </Field>
        )
      })}
    </>
  )
}

export default KnobInspector
