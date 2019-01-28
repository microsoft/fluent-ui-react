import { Check } from 'axe-core'
import { RuleWithMetadata } from './interfaces'

const actionableSelector =
  "a, button, [role='link'], [role='button'], [role='menuitem'], [role='tab']"

export const preventNestedActionableCheck: Check = {
  id: 'prevent-nested-actionable',
  evaluate: node => {
    const actionableChildren = node.querySelectorAll(actionableSelector)
    return actionableChildren.length === 0
  },
}

export const preventNestedActionableRule: RuleWithMetadata = {
  id: 'prevent-nested-actionable',
  metadata: {
    impact: 'critical',
    description: 'Ensures actionable elements do not have other actionable elements as children',
    help:
      'Actionable element (a, button, menuitem, tab cannot have other actionable elements as children',
  },
  selector: actionableSelector,
  tags: ['stardust-ui'],
  all: [preventNestedActionableCheck.id],
}
