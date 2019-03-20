import * as React from 'react'

export type KnobDefinition = {
  displayName?: React.ReactNode
  name: KnobName
  type: 'boolean' | 'number' | 'string'
  value: any
}

export type KnobName = string

export type KnobSet = Record<KnobName, KnobDefinition>

export type KnobComponent = React.FunctionComponent<KnobComponentProps>

export type KnobComponents = {
  KnobField: KnobComponent
  KnobControl: KnobComponent
  KnobLabel: KnobComponent

  KnobBoolean: KnobComponent
  KnobString: KnobComponent
}

export type KnobComponentProps = KnobDefinition & {
  setValue: (value: any) => void
}
