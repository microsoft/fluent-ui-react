import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'

import { getComponentGroup } from 'docs/src/utils'
import ComponentTableProps from '../ComponentPropsTable'
import ComponentPropsComponents from './ComponentPropsComponents'
import ComponentPropsDescription from './ComponentPropsDescription'
import { ICSSInJSStyle, Flex } from '@stardust-ui/react'

const propsContainerStyle: ICSSInJSStyle = { overflowX: 'auto' }

export default class ComponentProps extends React.Component<any, any> {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
    props: PropTypes.arrayOf(PropTypes.object).isRequired,
    componentProp: PropTypes.string,
    onPropComponentSelected: PropTypes.func,
  }

  componentWillMount() {
    const { displayName, componentProp } = this.props

    this.setState({
      componentGroup: getComponentGroup(displayName),
      activeDisplayName: componentProp || displayName,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { displayName, componentProp } = nextProps

    this.setState({
      componentGroup: getComponentGroup(displayName),
      activeDisplayName: componentProp || displayName,
    })
  }

  handleSelectedChange = (e, props) => {
    this.setState({ activeDisplayName: props.value })
    _.invoke(this.props, 'onPropComponentSelected', e, props)
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
            <ComponentPropsComponents
              activeDisplayName={activeDisplayName}
              displayNames={displayNames}
              onSelectedChange={this.handleSelectedChange}
              parentDisplayName={displayName}
            />
          </Flex>
        </Flex.Item>
        {activeDisplayName && (
          <Flex.Item style={propsContainerStyle}>
            <>
              <ComponentPropsDescription description={description} />
              <ComponentTableProps componentName={activeDisplayName} />
            </>
          </Flex.Item>
        )}
      </Flex>
    )
  }
}
