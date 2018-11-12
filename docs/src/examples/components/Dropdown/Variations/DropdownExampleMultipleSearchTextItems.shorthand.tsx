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
        onChange={(value: DropdownListItem[]) => {
          this.setState({
            items: inputItems.filter(item => value.indexOf(item) === -1),
          })
        }}
      />
    )
  }
}

const inputItems: DropdownListItem[] = [
  {
    header: 'Bruce Wayne',
    key: 'Bruce Wayne',
  },
  {
    header: 'Natasha Romanoff',
    key: 'Natasha Romanoff',
  },
  {
    header: 'Steven Strange',
    key: 'Steven Strange',
  },
  {
    header: 'Alfred Pennyworth',
    key: 'Alfred Pennyworth',
  },
  {
    header: `Scarlett O'Hara`,
    key: `Scarlett O'Hara`,
  },
  {
    header: 'Imperator Furiosa',
    key: 'Imperator Furiosa',
  },
  {
    header: 'Bruce Banner',
    key: 'Bruce Banner',
  },
  {
    header: 'Peter Parker',
    key: 'Peter Parker',
  },
  {
    header: 'Selina Kyle',
    key: 'Selina Kyle',
  },
]

export default DropdownExample
