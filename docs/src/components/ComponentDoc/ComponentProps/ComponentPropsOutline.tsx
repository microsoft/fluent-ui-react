import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { link } from 'docs/src/utils/helpers'

const ComponentPropsOutline: any = ({ displayNames, parentDisplayName }) => {
  if (displayNames.length < 2) return null

  const items: string[] = _.map(displayNames, displayName =>
    displayName === parentDisplayName
      ? displayName
      : displayName.replace(parentDisplayName, `${parentDisplayName}`),
  )
  return (
    <ul>
      {_.map(items, item => (
        <li>{link(item, `#${_.kebabCase(item)}`)}</li>
      ))}
    </ul>
  )
}

ComponentPropsOutline.propTypes = {
  displayNames: PropTypes.array,
  parentDisplayName: PropTypes.string.isRequired,
}

export default ComponentPropsOutline
