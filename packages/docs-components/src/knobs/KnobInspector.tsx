import * as React from 'react'

import KnobsContext, { KnobContextValue } from './KnobContext'
import { KnobComponent, KnobComponentProps, KnobDefinition, KnobResetComponentProps } from './types'
import useKnobValues from './useKnobValues'

const getKnobControls = (
  knobsContext: KnobContextValue,
): Record<'Control' | 'Field' | 'Label', KnobComponent> & {
  Reset: React.FunctionComponent<KnobResetComponentProps>
} => {
  const { KnobControl, KnobField, KnobLabel, KnobReset } = knobsContext.components
  const controls = {
    Control: KnobControl,
    Field: KnobField,
    Label: KnobLabel,
    Reset: KnobReset,
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
  const { KnobBoolean, KnobRange, KnobSelect, KnobString } = knobsContext.components
  const components = {
    boolean: KnobBoolean,
    range: KnobRange,
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

type KnobInspectorProps = {
  resettable?: boolean
  children?: (children: React.ReactElement) => React.ReactElement
}

const KnobInspector: React.FunctionComponent<KnobInspectorProps> = props => {
  const knobsContext = React.useContext(KnobsContext)

  const { Control, Field, Label, Reset } = getKnobControls(knobsContext)
  const knobComponents = getKnobComponents(knobsContext)
  const onReset = () => {
    console.log('WORKS')
  }
  const knobValues = useKnobValues()

  const children =
    knobValues.length > 0 ? (
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
        <Reset onReset={onReset} />
      </>
    ) : null

  return props.children ? props.children(children) : children
}

export default KnobInspector
