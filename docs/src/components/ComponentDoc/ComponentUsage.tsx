import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import { usageIndexContext } from 'docs/src/utils'

interface ComponentUsageProps {
  displayName: string
}

export function containsUsage(displayName: string) {
  return !!getUsageElement(displayName)
}

function getUsageElement(displayName: string) {
  const indexPath = _.find(usageIndexContext.keys(), path =>
    new RegExp(`\/${displayName}\/Usage\/index\.tsx$`).test(path),
  )
  if (!indexPath) {
    return null
  }

  const UsageElement = React.createElement(usageIndexContext(indexPath).default) as any
  if (!UsageElement) {
    return null
  }

  return UsageElement
}

export class ComponentUsage extends React.Component<ComponentUsageProps, any> {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
  }

  render() {
    const { displayName } = this.props
    const UsageElement = getUsageElement(displayName)
    if (!UsageElement) {
      return null
    }

    return UsageElement
  }
}
