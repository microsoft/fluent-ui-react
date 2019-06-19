import * as React from 'react'
import { StardustContext, withStardust } from '@stardust-ui/react'

type MyComponentProps = {
  message?: string
}

class MyClassComponent extends React.Component<MyComponentProps> {
  state = {
    clicksCount: 0,
  }

  static contextType = StardustContext
  getStardustBits = withStardust('MyComponent', () => this.props, () => this.state)

  handleClick() {
    alert(`MESSAGE: ${this.props.message}, clicks count: ${this.state.clicksCount}`)
  }

  render() {
    const { classes } = this.getStardustBits(this.context)

    return (
      <div data-tag="root" className={classes.root}>
        {' '}
        {/* Stardust styles are seen to be applied here */}
        <div data-tag="content" className={classes.content}>
          {' '}
          {/* Stardust styles are seen to be applied here */}
          <button
            onClick={() => {
              this.handleClick()
              this.setState({ clicksCount: this.state.clicksCount + 1 })
            }}
          >
            Click me!
          </button>
        </div>
      </div>
    )
  }
}

export default MyClassComponent
