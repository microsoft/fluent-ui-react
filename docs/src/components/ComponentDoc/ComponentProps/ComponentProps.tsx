import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { getComponentGroup } from 'docs/src/utils'
import ComponentTableProps from '../ComponentPropsTable'
import ComponentPropsComponents from './ComponentPropsComponents'
import ComponentPropsDescription from './ComponentPropsDescription'
import { ICSSInJSStyle, Flex, Checkbox } from '@stardust-ui/react'

const propsContainerStyle: ICSSInJSStyle = { overflowX: 'auto' }

export default class ComponentProps extends React.Component<any, any> {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
    props: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  componentWillMount() {
    const { displayName } = this.props

    this.setState({ componentGroup: getComponentGroup(displayName) })
  }

  componentWillReceiveProps({ displayName: next }) {
    const current = this.props.displayName

    if (current !== next) {
      this.setState({
        activeDisplayName: null,
        componentGroup: getComponentGroup(next),
      })
    }
  }

  handleComponentClick = (e, { name }) => {
    this.setState({ activeDisplayName: name })
  }

  handleToggle = () => {
    const { displayName } = this.props
    const { activeDisplayName } = this.state

    this.setState({ activeDisplayName: activeDisplayName ? false : displayName })
  }

  render() {
    const { displayName } = this.props
    const { activeDisplayName, componentGroup } = this.state
    const displayNames = _.keys(componentGroup)
    const { docblock } = (componentGroup[activeDisplayName] || {}) as any
    const description = _.get(docblock, 'description', [])

    return (
      <Flex column gap="gap.small">
        <Flex.Item styles={{ display: 'block', verticalAlign: 'middle' }}>
          <Flex gap="gap.medium">
            <Checkbox checked={!!activeDisplayName} onClick={this.handleToggle} label="Props" />
            <ComponentPropsComponents
              activeDisplayName={activeDisplayName}
              displayNames={displayNames}
              onItemClick={this.handleComponentClick}
              parentDisplayName={displayName}
            />
          </Flex>
        </Flex.Item>
        {activeDisplayName && (
          <Flex.Item style={propsContainerStyle}>
            <>
              <ComponentPropsDescription description={_.join(description, ' ')} />
              <ComponentTableProps componentName={activeDisplayName} />
            </>
          </Flex.Item>
        )}
      </Flex>
    )
  }
}
