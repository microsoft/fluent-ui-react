import * as React from 'react'
import { PeoplePicker } from '@stardust-ui/react'

const items = [
  { name: 'Bruce Wayne', image: 'public/images/avatar/small/matt.jpg' },
  { name: 'Natasha Romanoff', image: 'public/images/avatar/small/jenny.jpg' },
  { name: 'Steven Strange', image: 'public/images/avatar/small/joe.jpg' },
  { name: 'Alfred Pennyworth', image: 'public/images/avatar/small/justen.jpg' },
  { name: `Scarlett O'Hara`, image: 'public/images/avatar/small/laura.jpg' },
  { name: 'Imperator Furiosa', image: 'public/images/avatar/small/veronika.jpg' },
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
  <PeoplePicker source={peopleSupplier} styles={{ width: '30rem', margin: '4rem auto 0 4rem' }} />
)

export default PeoplePickerExampleShorthand
