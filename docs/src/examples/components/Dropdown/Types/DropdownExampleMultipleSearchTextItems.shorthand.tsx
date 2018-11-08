import * as React from 'react'
import { Dropdown, DropdownListItem } from '@stardust-ui/react'

class DropdownExample extends React.Component {
  state = {
    items: inputItems,
  }
  render() {
    return (
      <Dropdown
        multiple
        search
        items={this.state.items}
        onChange={(active: DropdownListItem[]) => {
          this.setState({
            items: inputItems.filter(item => active.indexOf(item) === -1),
          })
        }}
      />
    )
  }
}

const inputItems: DropdownListItem[] = [
  {
    content: 'Bruce Wayne',
    key: 'Bruce Wayne',
  },
  {
    content: 'Natasha Romanoff',
    key: 'Natasha Romanoff',
  },
  {
    content: 'Steven Strange',
    key: 'Steven Strange',
  },
  {
    content: 'Alfred Pennyworth',
    key: 'Alfred Pennyworth',
  },
  {
    content: `Scarlett O'Hara`,
    key: `Scarlett O'Hara`,
  },
  {
    content: 'Imperator Furiosa',
    key: 'Imperator Furiosa',
  },
  {
    content: 'Bruce Banner',
    key: 'Bruce Banner',
  },
  {
    content: 'Peter Parker',
    key: 'Peter Parker',
  },
  {
    content: 'Selina Kyle',
    key: 'Selina Kyle',
  },
]

export default DropdownExample
