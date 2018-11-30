import * as React from 'react'
import { Dropdown } from '@stardust-ui/react'

class DropdownExample extends React.Component {
  state = {
    items: inputItems,
  }
  render() {
    return (
      <Dropdown
        multiple
        search
        placeholder="Start typing a name"
        items={this.state.items}
        onChange={(e, props) => {
          const value = (props as any).value as any[]
          this.setState({
            items: inputItems.filter(item => value.indexOf(item) === -1),
          })
        }}
      />
    )
  }
}

const inputItems = [
  'Bruce Wayne',
  'Natasha Romanoff',
  'Steven Strange',
  'Alfred Pennyworth',
  `Scarlett O'Hara`,
  'Imperator Furiosa',
  'Bruce Banner',
  'Peter Parker',
  'Selina Kyle',
]

export default DropdownExample
