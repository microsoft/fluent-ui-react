import * as React from 'react'
import * as copyToClipboard from 'copy-to-clipboard'

export type CopyToClipboardProps = {
  render: (active, onClick) => React.ReactNode
  timeout?: number
  value: string
}

type CopyToClipboardState = {
  active: boolean
}

class CopyToClipboard extends React.Component<CopyToClipboardProps, CopyToClipboardState> {
  state = {
    active: false,
  }

  private timeoutId

  static defaultProps = {
    timeout: 3000,
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  handleClick = () => {
    const { timeout, value } = this.props

    clearTimeout(this.timeoutId)

    this.setState({ active: true })
    this.timeoutId = setTimeout(() => {
      this.setState({ active: false })
    }, timeout)

    copyToClipboard(value)
  }

  render() {
    const { render } = this.props
    const { active } = this.state

    return render(active, this.handleClick)
  }
}

export default CopyToClipboard
