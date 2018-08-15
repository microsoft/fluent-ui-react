import * as PropTypes from 'prop-types'
import * as React from 'react'
import { FelaTheme } from 'react-fela'

// TODO: TypeScript incorrectly compiles typings defined in component files
// TODO: see: https://github.com/stardust-ui/react/issues/87#issuecomment-412657622
//
// import { IThemePrepared } from '../../../types/theme'
//
// export interface IProviderConsumerProps {
//   render: (theme: IThemePrepared) => React.ReactNode
// }

/**
 * The Provider's Consumer is for accessing the theme.
 */
// TODO: restore provider consumer interface once above bug is fixed
const ProviderConsumer: React.SFC<any> = props => <FelaTheme {...props} />

ProviderConsumer.propTypes = {
  /**
   * Uses the function children pattern to access the theme.
   * @param {object} theme
   * @param {object} theme.siteVariables - The siteVariables passed from the nearest Provider.
   */
  render: PropTypes.func.isRequired,
}

export default ProviderConsumer
