import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Accordion, Menu } from '@stardust-ui/react'

import { examplePathToHash } from 'docs/src/utils'

export default class ComponentSidebarSection extends React.PureComponent<any, any> {
  static propTypes = {
    activePath: PropTypes.string,
    examples: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        examplePath: PropTypes.string,
      }),
    ),
    sectionName: PropTypes.string,
    onItemClick: PropTypes.func,
    onTitleClick: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isActiveByProps: this.isActiveAccordion(),
    }
  }

  componentWillReceiveProps(nextProps) {
    const isActiveByProps = this.isActiveAccordion(nextProps)
    const didCloseByProps = this.state.isActiveByProps && !isActiveByProps

    // We allow the user to open accordions, but we close them when we scroll passed them
    this.setState(prevState => ({
      isActiveByProps,
      isActiveByUser: didCloseByProps ? false : prevState.isActiveByUser,
    }))
  }

  handleItemClick = examplePath => e => {
    _.invoke(this.props, 'onItemClick', e, { examplePath })
  }

  handleTitleClick = () => {
    this.setState(prevState => ({ isActiveByUser: !prevState.isActiveByUser }))
  }

  isActiveAccordion = (props = this.props) =>
    (props.examples || []).findIndex(item => {
      const exampleHash = examplePathToHash(item.examplePath)
      return exampleHash === props.activePath
    }) !== -1

  render() {
    const { activePath, examples, sectionName } = this.props
    //    const { isActiveByProps, isActiveByUser } = this.state

    //    const active = isActiveByUser || isActiveByProps

    if (process.env.NODE_ENV !== 'development' && sectionName === 'Performance') {
      return null
    }

    return (
      // <Menu.Item>
      <Accordion
        onTitleClick={this.handleTitleClick}
        panels={_.map(examples, example => ({
          key: example.examplePath,
          content: <span />,
          title: {
            content: sectionName,
            // active: activePath === examplePathToHash(examplePath),
          },
        }))}
      />
      // </Menu.Item>
    )
  }
}
