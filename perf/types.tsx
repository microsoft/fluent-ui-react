import * as _ from 'lodash'

declare global {
  interface Window {
    runMeasures: (filter?: string) => Promise<ProfilerMeasureCycle>
  }
}

export type ProfilerMeasure = {
  actualTime: number
  baseTime: number
  exampleIndex: number
  phase: string
  startTime: number
  commitTime: number
}

export type ProfilerMeasureCycle = { [perfExample: string]: ProfilerMeasure }

export type NormalizedMeasures = Record<
  string,
  {
    actualTime: ReducedMeasures
    baseTime: ReducedMeasures
  }
>

export type ReducedMeasures = {
  avg: number
  median: number
  min: number
  max: number
  values: {
    exampleIndex: number
    value: ProfilerMeasure
  }[]
}
