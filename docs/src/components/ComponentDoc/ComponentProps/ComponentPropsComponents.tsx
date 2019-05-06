import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Menu, tabListBehavior } from '@stardust-ui/react'

const ComponentPropsComponents: any = ({
  activeDisplayName,
  displayNames,
  onItemClick,
  parentDisplayName,
}) => {
  if (displayNames.length < 2) return null

  const items: Object[] = _.map(displayNames, displayName => ({
    key: displayName,
    active: activeDisplayName === displayName,
    content:
      displayName === parentDisplayName
        ? displayName
        : displayName.replace(parentDisplayName, `${parentDisplayName}.`),
    name: displayName,
    onClick: onItemClick,
  }))

  return (
    <Menu
      styles={{ color: 'green', display: 'inline-flex' }}
      primary
      pills
      accessibility={tabListBehavior}
      items={items}
    />
  )
}

ComponentPropsComponents.propTypes = {
  activeDisplayName: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  displayNames: PropTypes.array,
  onItemClick: PropTypes.func,
  parentDisplayName: PropTypes.string.isRequired,
}

const areEqualProps = (prevProps, nextProps) =>
  prevProps.activeDisplayName === nextProps.activeDisplayName &&
  prevProps.parentDisplayName === nextProps.parentDisplayName

export default React.memo(ComponentPropsComponents, areEqualProps)
