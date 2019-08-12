import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Dropdown, Header, Flex } from '@stardust-ui/react'

const ComponentPropsComponents: any = ({
  activeDisplayName,
  displayNames,
  onSelectedChange,
  parentDisplayName,
}) => {
  if (displayNames.length < 2) return null

  const items: Object[] = _.map(displayNames, displayName =>
    displayName === parentDisplayName
      ? displayName
      : displayName.replace(parentDisplayName, `${parentDisplayName}.`),
  )
  return (
    <Flex column>
      <Header as="h3">Component:</Header>
      <Dropdown
        items={items}
        defaultValue={activeDisplayName}
        onSelectedChange={onSelectedChange}
      />
    </Flex>
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
