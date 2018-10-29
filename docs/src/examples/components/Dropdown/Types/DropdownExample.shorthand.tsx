import * as React from 'react'
import { Dropdown, DropdownListItem } from '@stardust-ui/react'

const items: DropdownListItem[] = [
  {
    key: 'bruce',
    header: 'Bruce Banner',
    image: 'public/images/avatar/small/chris.jpg',
    content: 'Senior Computer Scientist',
  },
  {
    key: 'furi',
    header: 'Imperator Furiosa',
    image: 'public/images/avatar/small/veronika.jpg',
    content: 'Boss',
  },
]

let inputItems = items

const onChange = (active: DropdownListItem[]) => {
  inputItems = items.filter(item => active.indexOf(item) === -1)
  console.log(inputItems)
}

const DropdownExample = () => (
  <Dropdown
    label={{ content: 'Add People' }}
    placeholder="Start typing a name"
    multiple
    search
    onChange={onChange}
    items={inputItems}
  />
)

export default DropdownExample
