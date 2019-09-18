declare global {
  interface Window {
    runMeasures: (filter?: string) => Promise<ProfilerMeasureCycle>
  }
}

export type MeasuredValues = 'actualTime' | 'baseTime'

export type ProfilerMeasure = { [key in MeasuredValues]: number } & {
  exampleIndex: number
  phase: string
  startTime: number
  commitTime: number
}

export type ProfilerMeasureWithBaseline = ProfilerMeasure & {
  baseline: Record<MeasuredValues, number>
}

export type ProfilerMeasureCycle = Record<string, ProfilerMeasureWithBaseline>

export type PerExamplePerfMeasures = Record<string, Record<MeasuredValues, ReducedMeasures>>

export type ReducedMeasures = {
  avg: number
  avgNormalized: number
  median: number
  medianNormalized: number
  min: number
  max: number
  values: {
    exampleIndex: number
    value: number
    baseline: number
  }[]
}
