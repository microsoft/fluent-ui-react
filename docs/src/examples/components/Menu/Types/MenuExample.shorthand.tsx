import * as React from 'react'
import { Menu } from '@stardust-ui/react'

class MenuExample extends React.Component {
  handleClick = (e, props) => {
    const items = this.state.items.filter(current => current.key !== props.index)

    this.setState({ items })

    // if (items.length === 0) {
    //   setTimeout(() => this.setState({
    //     items: this._getItems()
    //   }), 2000);
    // }
  }

  state = {
    items: [
      { key: 0, content: 'Editorials', onClick: this.handleClick },
      { key: 1, content: 'Reviews', onClick: this.handleClick },
      { key: 2, content: 'Upcoming Events', onClick: this.handleClick },
      { key: 3, content: 'Somethin else', onClick: this.handleClick },
    ],
  }

  componentDidUpdate() {
    console.log('menu example componentDidUpdate')
  }
  render() {
    return (
      <div className="menu-example">
        <Menu defaultActiveIndex={0} items={this.state.items} />
      </div>
    )
  }
}

export default MenuExample
