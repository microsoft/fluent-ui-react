import * as PropTypes from 'prop-types'
import * as React from 'react'
import { FelaTheme } from '@stardust-ui/react-fela'

import { ThemePrepared } from '../../themes/types'
import { ProviderContextPrepared } from '../../types'

export interface ProviderConsumerProps {
  /**
   * Uses the function children pattern to access theme.
   * @param {object} theme
   * @param {object} theme.siteVariables - The siteVariables passed from the nearest Provider.
   */
  render: (theme: ThemePrepared) => React.ReactNode
}

/**
 * A ProviderConsumer is used to consume Stardust context from Provider.
 */
const ProviderConsumer: React.FunctionComponent<ProviderConsumerProps> = ({ render }) => (
  <FelaTheme>{(context: ProviderContextPrepared) => render(context.theme)}</FelaTheme>
)

ProviderConsumer.displayName = 'ProviderConsumer'
ProviderConsumer.propTypes = {
  render: PropTypes.func.isRequired,
}

export default ProviderConsumer
