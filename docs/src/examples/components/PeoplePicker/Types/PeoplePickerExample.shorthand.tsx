import * as React from 'react'
import { PeoplePicker } from '@stardust-ui/react'

const items = [
  { name: 'Alina Medintova', image: 'public/images/avatar/small/matt.jpg' },
  { name: 'Sofiya Hutsova', image: 'public/images/avatar/small/jenny.jpg' },
  { name: 'Marija Najdova', image: 'public/images/avatar/small/joe.jpg' },
  { name: 'Barbora Buligova', image: 'public/images/avatar/small/justen.jpg' },
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

const PeoplePickerExampleShorthand = () => <PeoplePicker source={peopleSupplier} />

export default PeoplePickerExampleShorthand
