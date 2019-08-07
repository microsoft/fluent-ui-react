import { useBooleanKnob } from '@stardust-ui/docs-components'
import * as React from 'react'
import { Button, Dropdown, Popup, Flex } from '@stardust-ui/react'

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

const getA11ySelectionMessage = {
  onAdd: item => `${item} has been selected.`,
  onRemove: item => `${item} has been removed.`,
}

const PopupCloseButtonExample = () => {
  const [open, setOpen] = useBooleanKnob({ name: 'open' })

  const closePopup = () => {
    setOpen(false)
  }

  const popupContent = (
    <>
      <Dropdown
        search
        multiple
        items={inputItems}
        placeholder="Start typing a name"
        getA11ySelectionMessage={getA11ySelectionMessage}
        noResultsMessage="We couldn't find any matches."
      />
      <br />
      <Flex gap="gap.small">
        <Flex.Item push>
          <Button content="Cancel" onClick={closePopup} />
        </Flex.Item>
        <Button primary content="Add" />
      </Flex>
    </>
  )

  return (
    <Popup
      open={open}
      onOpenChange={(e, { open }) => setOpen(open)}
      content={{
        content: popupContent,
        'aria-label': 'People picker',
      }}
      trapFocus
    >
      <Button icon="user" content="People Picker" aria-label="Choose a person." />
    </Popup>
  )
}

export default PopupCloseButtonExample
