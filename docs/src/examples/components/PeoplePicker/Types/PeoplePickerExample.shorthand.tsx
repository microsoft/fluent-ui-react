import * as React from 'react'
import { PeoplePicker } from '@stardust-ui/react'

const peopleSupplier = (inputValue: string): { value: string }[] => {
  const items = [
    { value: 'Alina Medintova' },
    { value: 'Sofiya Hutsova' },
    { value: 'Marija Najdova' },
    { value: 'Barbora Buligova' },
  ]

  return items.filter(item => !inputValue || item.value.includes(inputValue))
}

const PeoplePickerExampleShorthand = () => <PeoplePicker source={peopleSupplier} />

export default PeoplePickerExampleShorthand
