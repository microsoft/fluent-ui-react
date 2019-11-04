import { PerformanceStats } from '../types'

export default class Telemetry {
  performance: PerformanceStats
  enabled: boolean

  constructor() {
    this.performance = {}
    this.enabled = true
  }

  reset() {
    this.performance = {}
  }
}
