import PropTypes from 'prop-types'
import React from 'react'
import { FelaTheme } from 'react-fela'

import { IMergedThemes, ITheme } from '../../../types/theme'

export interface IProviderConsumerProps {
  render: (theme: ITheme | IMergedThemes) => React.ReactNode
}

/**
 * The Provider's Consumer is for accessing the theme.
 */
const ProviderConsumer: React.SFC<IProviderConsumerProps> = props => <FelaTheme {...props} />

ProviderConsumer.propTypes = {
  /**
   * Uses the function children pattern to access the theme.
   * @param {object} theme
   * @param {object} theme.siteVariables - The siteVariables passed from the nearest Provider.
   */
  render: PropTypes.func.isRequired,
}

export default ProviderConsumer
