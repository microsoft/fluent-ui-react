import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as fela from 'react-fela'

const FelaTheme = (fela as any).FelaTheme

import { ThemePrepared } from '../../themes/types'

export interface ProviderConsumerProps {
  /**
   * Uses the function children pattern to access theme.
   * @param {object} theme
   * @param {object} theme.siteVariables - The siteVariables passed from the nearest Provider.
   */
  render: (theme: ThemePrepared) => React.ReactNode
}

/**
 * The Provider's Consumer is for accessing theme.
 */
const ProviderConsumer: React.SFC<ProviderConsumerProps> = ({ render }) => (
  <FelaTheme>{render}</FelaTheme>
)

ProviderConsumer.propTypes = {
  render: PropTypes.func.isRequired,
}

export default ProviderConsumer
