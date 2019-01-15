import * as React from 'react'
import { Menu } from '@stardust-ui/react'

class MenuExample extends React.Component {
  handleClick = (e, props) => {
    const itemToRemove = this.state.items[props.index]
    const items = this.state.items.filter(current => {
      console.log('current.key', current.key)
      console.log('props.index', props.index)
      return current.key !== itemToRemove.key
    })

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
  render() {
    return (
      <div className="menu-example">
        <Menu defaultActiveIndex={0} items={this.state.items} />
        <button
          onClick={() => {
            this.state.items.push({ key: 4, content: 'Added item', onClick: this.handleClick })
          }}
        >
          Add item
        </button>
      </div>
    )
  }
}

export default MenuExample
