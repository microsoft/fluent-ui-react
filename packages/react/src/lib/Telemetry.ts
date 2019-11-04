type ComponentPerfStats = { count: number; ms: number }

export default class Telemetry {
  performance: Record<string, ComponentPerfStats>
  enabled: boolean

  constructor() {
    this.performance = {}
    this.enabled = true
  }

  reset() {
    this.performance = {}
  }
}
