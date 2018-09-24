import * as React from 'react'
import ChatPeoplePicker from './ChatPeoplePicker'

const items = [
  {
    name: 'Bruce Wayne',
    image: 'public/images/avatar/small/matt.jpg',
    position: 'Software Engineer',
  },
  {
    name: 'Natasha Romanoff',
    image: 'public/images/avatar/small/jenny.jpg',
    position: 'UX Designer 2',
  },
  {
    name: 'Steven Strange',
    image: 'public/images/avatar/small/joe.jpg',
    position: 'Principal Software Engineering Manager',
  },
  {
    name: 'Alfred Pennyworth',
    image: 'public/images/avatar/small/justen.jpg',
    position: 'Technology Consultant',
  },
  {
    name: `Scarlett O'Hara`,
    image: 'public/images/avatar/small/laura.jpg',
    position: 'Software Engineer 2',
  },
  { name: 'Imperator Furiosa', image: 'public/images/avatar/small/veronika.jpg', position: 'Boss' },
]

const getUnselectedItems = (selected: { name: string }[]) => {
  return items.filter(item => {
    for (const selectedItem of selected) {
      if (selectedItem.name === item.name) {
        return false
      }
      continue
    }

    return true
  })
}

const peopleSupplier = (inputValue: string, selected: { name: string }[]) => {
  return getUnselectedItems(selected).filter(item => !inputValue || item.name.includes(inputValue))
}

const PeoplePickerExampleShorthand = () => (
  <ChatPeoplePicker
    source={peopleSupplier}
    styles={{ width: '30rem', margin: '4rem auto 0 4rem' }}
  />
)

export default PeoplePickerExampleShorthand
