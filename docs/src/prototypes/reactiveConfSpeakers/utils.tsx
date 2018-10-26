import * as React from 'react'
import { UIComponent } from 'src/lib'
import * as cx from 'classnames'
import * as PropTypes from 'prop-types'

import * as _ from 'lodash'

export const dustify = (ComponentType, displayName = null) => {
  const dustifiedDisplayName = displayName || `Dusty.${ComponentType.displayName}`

  class Dustified extends UIComponent<any, any> {
    static displayName = dustifiedDisplayName

    static propTypes = {
      styles: PropTypes.any,
    }

    renderComponent({ classes, rest }) {
      return <ComponentType className={cx(this.props.className, classes.root)} {...rest} />
    }
  }

  return Dustified
}

export const mergeStyles = (...styles) => {
  return styles.reduce((acc, current) => _.merge(acc, current), {})
}
