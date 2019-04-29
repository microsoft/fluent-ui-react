import * as React from 'react'

export type KnobDefinition = {
  content?: React.ReactNode
  name: KnobName
  type: 'boolean' | 'range' | 'string' | 'select'
  value: any
  values?: any[]
}

export type KnobName = string

export type KnobSet = Record<KnobName, KnobDefinition>

export type KnobComponent = React.FunctionComponent<KnobComponentProps>

export type KnobComponents = {
  KnobField: KnobComponent
  KnobControl: KnobComponent
  KnobLabel: KnobComponent

  KnobBoolean: KnobComponent
  KnobRange: KnobComponent
  KnobSelect: KnobComponent
  KnobString: KnobComponent
}

export type KnobComponentProps = KnobDefinition & {
  setValue: (value: any) => void
}

export type UseKnobOptions<T> = {
  content?: React.ReactNode
  name: string
  initialValue?: T
  values?: T[]
}
