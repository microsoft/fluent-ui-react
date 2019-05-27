import * as PropTypes from 'prop-types'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

import { ProviderContextPrepared } from '../../themes/types'

export interface ProviderConsumerProps {
  /**
   * Uses the function children pattern to access theme.
   * @param {object} theme
   * @param {object} theme.siteVariables - The siteVariables passed from the nearest Provider.
   */
  render: (context: ProviderContextPrepared) => React.ReactNode
}

/**
 * The Provider's Consumer is for accessing theme.
 */
const ProviderConsumer: React.FunctionComponent<ProviderConsumerProps> = ({ render }) => (
  <FelaTheme>{render}</FelaTheme>
)

ProviderConsumer.displayName = 'ProviderConsumer'
ProviderConsumer.propTypes = {
  render: PropTypes.func.isRequired,
}

export default ProviderConsumer
