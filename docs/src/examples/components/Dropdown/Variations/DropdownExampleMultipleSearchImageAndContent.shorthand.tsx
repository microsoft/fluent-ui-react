import * as React from 'react'
import { Dropdown } from '@stardust-ui/react'

const inputItems = [
  {
    header: 'Bruce Wayne',
    image: 'public/images/avatar/small/matt.jpg',
    content: 'Software Engineer',
  },
  {
    header: 'Natasha Romanoff',
    image: 'public/images/avatar/small/jenny.jpg',
    content: 'UX Designer 2',
  },
  {
    header: 'Steven Strange',
    image: 'public/images/avatar/small/joe.jpg',
    content: 'Principal Software Engineering Manager',
  },
  {
    header: 'Alfred Pennyworth',
    image: 'public/images/avatar/small/justen.jpg',
    content: 'Technology Consultant',
  },
  {
    header: `Scarlett O'Hara`,
    image: 'public/images/avatar/small/laura.jpg',
    content: 'Software Engineer 2',
  },
  {
    header: 'Imperator Furiosa',
    image: 'public/images/avatar/small/veronika.jpg',
    content: 'Boss',
  },
  {
    header: 'Bruce Banner',
    image: 'public/images/avatar/small/chris.jpg',
    content: 'Senior Computer Scientist',
  },
  {
    header: 'Peter Parker',
    image: 'public/images/avatar/small/daniel.jpg',
    content: 'Partner Software Engineer',
  },
  {
    header: 'Selina Kyle',
    image: 'public/images/avatar/small/ade.jpg',
    content: 'Graphic Designer',
  },
]

const DropdownExample = () => (
  <Dropdown
    multiple
    search
    getA11ySelectionMessage={getA11ySelectionMessage}
    noResultsMessage="We couldn't find any matches."
    placeholder="Start typing a name"
    items={inputItems}
  />
)

const getA11ySelectionMessage = {
  onAdd: item => `${item.header} has been selected.`,
  onRemove: item => `${item.header} has been removed.`,
}

export default DropdownExample
