import { Rule } from 'axe-core'

export interface RuleWithMetadata extends Rule {
  metadata: {
    impact: string
    description: string
    help: string
  }
}
