import PropTypes from 'prop-types'
import React from 'react'
import { ITheme } from '../../../types/theme'

// TODO fix typings for react-fela
const { FelaTheme } = require('react-fela')

export interface IProviderConsumerProps {
  render: (theme: ITheme) => React.ReactNode
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
