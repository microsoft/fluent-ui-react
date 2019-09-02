import * as React from 'react'
import { KnobComponents, KnobDefinition, KnobName, KnobSet } from './types'

export type KnobContextValue = {
  components: KnobComponents
  knobs: KnobSet

  registerKnob: (knob: KnobDefinition) => void
  setKnobValue: (knobName: KnobName, knobValue: any) => void
  unregisterKnob: (knobName: KnobName) => void
}

export type LogContextValue = {
  append: (value: string) => void
  clear: () => void
  lines: string[]
}

const noop = () => null

export const KnobContext = React.createContext<KnobContextValue>({
  components: {} as any,
  knobs: {},

  registerKnob: noop,
  setKnobValue: noop,
  unregisterKnob: noop,
})

export const LogContext = React.createContext<LogContextValue>({
  append: noop,
  clear: noop,
  lines: [],
})
