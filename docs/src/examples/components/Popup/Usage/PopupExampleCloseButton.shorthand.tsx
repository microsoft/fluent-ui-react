import * as React from 'react'
import { Button, Popup, Dropdown, Flex, dialogBehavior } from '@stardust-ui/react'

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

class PopupExampleCloseButton extends React.Component {
  state = {
    open: false,
  }

  closePopup = e => {
    this.setState({
      open: false,
    })
  }

  openPopup = () => {
    this.setState({
      open: true,
    })
  }

  render() {
    return (
      <Popup
        accessibility={dialogBehavior}
        open={this.state.open}
        position="below"
        trigger={
          <Button
            icon="user"
            content="People Picker"
            onClick={this.openPopup}
            aria-label="Choose a person."
          />
        }
        content={{
          content: (
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
                  <Button content="Cancel" onClick={this.closePopup} />
                </Flex.Item>
                <Button primary content="Add" />
              </Flex>
            </>
          ),
          'aria-label': 'Choose a person.',
        }}
      />
    )
  }
}

export default PopupExampleCloseButton
