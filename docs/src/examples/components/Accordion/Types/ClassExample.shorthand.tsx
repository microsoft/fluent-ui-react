import * as React from 'react'

type MyComponentProps = {
  message?: string
}

class MyClassComponent extends React.Component<MyComponentProps> {
  state = {
    clicksCount: 0,
  }

  handleClick() {
    alert(`MESSAGE: ${this.props.message}, clicks count: ${this.state.clicksCount}`)
  }

  render() {
    return (
      <div data-tag="root">
        {' '}
        {/* Stardust styles are seen to be applied here */}
        <div data-tag="content">
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
