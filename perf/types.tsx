declare global {
  interface Window {
    runMeasures: () => ProfilerMeasureCycle
  }
}

export type ProfilerMeasure = {
  order: number
  phase: string
  actualTime: number
  baseTime: number
  startTime: number
  commitTime: number
}

export type ProfilerMeasureCycle = { [perfExample: string]: ProfilerMeasure }
