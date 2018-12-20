import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'
import LabelledButton from './ComponentButton'

export default class ComponentControlsCopyLink extends React.Component<any, any> {
  private mounted: boolean
  private readonly btnLabel = 'Permalink'

  public static propTypes = {
    anchorName: PropTypes.string,
    onClick: PropTypes.func,
  }

  public state: any = {}

  public shouldComponentUpdate(nextProps, nextState) {
    return this.state.active !== nextState.active
  }

  public componentDidMount() {
    this.mounted = true
  }

  public componentWillUnmount() {
    this.mounted = false
  }

  public render() {
    const { active } = this.state

    return (
      <Menu.Item
        onClick={this.handleClick}
        content={
          <LabelledButton
            iconName="linkify"
            label={active ? 'Copied!' : this.btnLabel}
            active={active}
          />
        }
      />
    )
  }

  private handleClick = e => {
    const { onClick } = this.props

    e.preventDefault()
    onClick()

    this.setState({ active: true })
    setTimeout(this.resetActive, 3000)
  }

  private resetActive = () => this.mounted && this.setState({ active: false })
}
