type ComponentPerfStats = { count: number; ms: number }

export default class PerformanceStats {
  stats: Record<string, ComponentPerfStats>
  enabled: boolean

  constructor() {
    this.stats = {}
    this.enabled = true
  }

  reset() {
    this.stats = {}
  }
}
