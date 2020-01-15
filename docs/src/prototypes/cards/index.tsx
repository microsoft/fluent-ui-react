import * as React from 'react'
import EmployeeCard from './EmployeeCard'
import { Dropdown, DropdownProps } from '@fluentui/react'
import { screenReaderContainerStyles } from '../../../../packages/react/src/utils/accessibility/Styles/accessibilityStyles'

class EmployeeCardPrototype extends React.Component<any> {
  instructionMessageTimeout

  state = {
    parentRole: null,
    cardRole: 'group',
    ariaRoleDescription: null,
    ariaExpanded: null,
    isLimitedNavigation: true,
    // a11yInstructionMessage: 'Press arrow keys to navigate between cards.'
    a11yInstructionMessage: null,
  }

  getCards(numberOfCards, employee) {
    const cards = []
    for (let i = 0; i < numberOfCards; i++) {
      const cardOrder = { cardOrder: i }
      cards.push(
        <EmployeeCard
          {...employee}
          {...cardOrder}
          isLimitedNavigation={this.state.isLimitedNavigation}
          aria-labelledby={`user-name-${i} user-card-${i}`}
          id={`user-card-${i}`}
          aria-label=",card"
          role={this.state.cardRole}
          aria-roledescription={this.state.ariaRoleDescription}
          // aria-label={`${employee.firstName} user card`}
          aria-expanded={this.state.ariaExpanded}
        />,
      )
    }
    return cards
  }

  handleSelectedChange = (e: React.SyntheticEvent, { value }: DropdownProps) => {
    switch (value) {
      case 'card as group':
        this.setState({ cardRole: 'group' })
        this.setState({ ariaExpanded: null })
        this.setState({ ariaRoleDescription: null })
        this.setState({ parentRole: 'null' })
        return
      case 'card as group with aria-expanded':
        this.setState({ cardRole: 'group' })
        this.setState({ ariaExpanded: 'false' })
        this.setState({ ariaRoleDescription: null })
        return
      case 'card as group with aria-roledescription as card':
        this.setState({ cardRole: 'group' })
        this.setState({ ariaRoleDescription: 'card' })
        this.setState({ ariaExpanded: null })
        return
      case 'menu and menuitem with aria-roledescription as card':
        this.setState({ cardRole: 'menuitem' })
        this.setState({ parentRole: 'menu' })
        this.setState({ ariaRoleDescription: 'card' })
        this.setState({ ariaExpanded: null })
        return
    }
  }

  handleSelectedNavigation = (e: React.SyntheticEvent, { value }: DropdownProps) => {
    switch (value) {
      case 'use Enter key go inside the card':
        this.setState({ isLimitedNavigation: true })
        return
      case 'use TAB key go inside the card':
        this.setState({ isLimitedNavigation: false })
        return
    }
  }

  onFocusSetMessage() {
    clearTimeout(this.instructionMessageTimeout)
    if (!this.state.a11yInstructionMessage) {
      this.setState({
        a11yInstructionMessage: 'Press arrow keys to navigate between cards.',
      })
    }
    // clear out the content of aria-live region to disable to navigate there by virtual cursor
    setTimeout(() => {
      this.setState({ a11yInstructionMessage: ' ' })
    }, 200)
  }

  onBlurClearMessage() {
    this.instructionMessageTimeout = setTimeout(() => {
      if (this.state.a11yInstructionMessage) {
        this.setState({ a11yInstructionMessage: null })
      }
    }, 0)
  }

  render() {
    const employee = {
      firstName: 'John',
      lastName: 'Doe',
      position: 'SR. SOFTWARE ENGINEER',
      location: 'Prague, Czech Republic',
      status: 'Avaiable',
      team: 'Fluent UI Engineering',
      email: 'John.Doe@company.com',
      avatar: {
        label: { variables: { backgroundColor: '#00b5ad', color: 'white' } },
        status: { color: 'green', icon: 'check', title: 'Available' },
      },
    }
    return (
      <div>
        <Dropdown
          inline
          items={[
            'card as group',
            'card as group with aria-expanded',
            'card as group with aria-roledescription as card',
            'menu and menuitem with aria-roledescription as card',
          ]}
          defaultValue={'Select aria roles to be used'}
          onSelectedChange={this.handleSelectedChange}
        />
        <Dropdown
          inline
          items={['use Enter key go inside the card', 'use TAB key go inside the card']}
          defaultValue={'Select type of navigaton'}
          onSelectedChange={this.handleSelectedNavigation}
        />
        <div
          role={this.state.parentRole}
          onFocus={this.onFocusSetMessage.bind(this)}
          onBlur={this.onBlurClearMessage.bind(this)}
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
          id="parent"
        >
          {this.getCards(15, employee)}
        </div>
        {/* <Portal open={!!this.state.a11yInstructionMessage}> */}
        <div aria-live="polite" style={screenReaderContainerStyles}>
          {this.state.a11yInstructionMessage}
        </div>
        <button>last one</button>
        {/* </Portal> */}
      </div>
    )
  }
}

export default EmployeeCardPrototype
