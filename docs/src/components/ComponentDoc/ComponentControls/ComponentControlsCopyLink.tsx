import * as React from 'react'
import ComponentButton from './ComponentButton'
import * as _ from 'lodash'

export default class ComponentControlsCopyLink extends React.Component<any, any> {
  private mounted: boolean
  private readonly btnLabel = 'Permalink'

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
      <ComponentButton
        iconName="linkify"
        label={active ? 'Copied!' : this.btnLabel}
        onClick={this.handleClick}
      />
    )
  }

  private handleClick = e => {
    e.preventDefault()
    _.invoke(this.props, 'onClick', e, this.props)

    this.setState({ active: true })
    setTimeout(this.resetActive, 3000)
  }

  private resetActive = () => this.mounted && this.setState({ active: false })
}
