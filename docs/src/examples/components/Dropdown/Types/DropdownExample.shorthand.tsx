import * as React from 'react'
import { Dropdown, DropdownListItem } from '@stardust-ui/react'

const inputItems: DropdownListItem[] = [
  {
    header: 'Bruce Wayne',
    key: 'Bruce Wayne',
    image: 'public/images/avatar/small/matt.jpg',
    content: 'Software Engineer',
  },
  {
    header: 'Natasha Romanoff',
    key: 'Natasha Romanoff',
    image: 'public/images/avatar/small/jenny.jpg',
    content: 'UX Designer 2',
  },
  {
    header: 'Steven Strange',
    key: 'Steven Strange',
    image: 'public/images/avatar/small/joe.jpg',
    content: 'Principal Software Engineering Manager',
  },
  {
    header: 'Alfred Pennyworth',
    key: 'Alfred Pennyworth',
    image: 'public/images/avatar/small/justen.jpg',
    content: 'Technology Consultant',
  },
  {
    header: `Scarlett O'Hara`,
    key: `Scarlett O'Hara`,
    image: 'public/images/avatar/small/laura.jpg',
    content: 'Software Engineer 2',
  },
  {
    header: 'Imperator Furiosa',
    key: 'Imperator Furiosa',
    image: 'public/images/avatar/small/veronika.jpg',
    content: 'Boss',
  },
  {
    header: 'Bruce Banner',
    key: 'Bruce Banner',
    image: 'public/images/avatar/small/chris.jpg',
    content: 'Senior Computer Scientist',
  },
  {
    header: 'Peter Parker',
    key: 'Peter Parker',
    image: 'public/images/avatar/small/daniel.jpg',
    content: 'Partner Software Engineer',
  },
  {
    header: 'Selina Kyle',
    key: 'Selina Kyle',
    image: 'public/images/avatar/small/ade.jpg',
    content: 'Graphic Designer',
  },
]

class DropdownExample extends React.Component {
  state = {
    items: inputItems,
  }
  render() {
    return (
      <Dropdown
        label={{ content: 'Add People' }}
        placeholder="Start typing a name"
        multiple
        search
        items={this.state.items}
        onChange={active => {
          this.setState({
            items: inputItems.filter(item => active.indexOf(item) === -1),
          })
        }}
      />
    )
  }
}

export default DropdownExample
