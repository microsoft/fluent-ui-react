import * as PropTypes from 'prop-types'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

import { ThemePrepared } from '../../../types/theme'

export interface ProviderConsumerProps {
  render: (theme: ThemePrepared) => React.ReactNode
}

/**
 * The Provider's Consumer is for accessing theme.
 */
const ProviderConsumer: React.SFC<ProviderConsumerProps> = props => <FelaTheme {...props} />

ProviderConsumer.propTypes = {
  /**
   * Uses the function children pattern to access theme.
   * @param {object} theme
   * @param {object} theme.siteVariables - The siteVariables passed from the nearest Provider.
   */
  render: PropTypes.func.isRequired,
}

export default ProviderConsumer
