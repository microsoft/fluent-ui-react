import * as React from 'react'
import EmployeeCard from './EmployeeCard'
import { Dropdown, DropdownProps, Divider } from '@fluentui/react'
import { screenReaderContainerStyles } from '../../../../packages/react/src/utils/accessibility/Styles/accessibilityStyles'

class EmployeeCardPrototype extends React.Component<any> {
  instructionMessageTimeout
  instructionMessageDescribedByTimeout

  state = {
    parentRole: null,
    cardRole: 'group',
    ariaRoleDescription: null,
    ariaExpanded: null,
    isLimitedNavigation: true,    
    a11yDescribedByInstructionMessage: null,
    messageWasSet: false,
  }

  getCards(numberOfCards, employees, shouldHaveDescribedByMessage = false) {
    const cards = []
    for (let i = 0; i < numberOfCards; i++) {
      const cardOrder = { cardOrder: i }
      cards.push(
        <EmployeeCard
          {...employees[i]}
          {...cardOrder}
          isLimitedNavigation={this.state.isLimitedNavigation}
          aria-labelledby={`user-name-${i} user-card-${i}`}
          aria-describedby={shouldHaveDescribedByMessage ? 'instruction-messsage' : null}
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

  onFocusSetMessageDescribedBy() {
    clearTimeout(this.instructionMessageDescribedByTimeout)
     if (!this.state.messageWasSet) {
      this.setState({
        a11yDescribedByInstructionMessage: 'Press arrow keys to navigate between cards.',
        messageWasSet: true,
      })
     }
    // clear out the content of aria-live region to disable to navigate there by virtual cursor
    setTimeout(() => {
      this.setState({ a11yDescribedByInstructionMessage: null })
    }, 5000)
  }

  onBlurClearMessageDescribedBy() {
    this.instructionMessageDescribedByTimeout = setTimeout(() => {      
        this.setState({ 
          a11yDescribedByInstructionMessage: null,
          messageWasSet: false,
        })      
    }, 0)
  }



  render() {
    const userFirstName = ["John", "Marry", "James", "Emma", "Michael", "Sophia", "Thomas", "Matthew", "Mia"]
    const userLastName = ["Doe", "Garcia", "Wilson", "Wat", "Anderson", "Brown", "Wilson", "Miller", "Yang"]

    const userStatuses = [
      { color: 'green', icon: 'check', title: 'Available' },
      { color: 'red', icon: 'minus', title: 'Do not disturb' },
      { color: 'yellow', icon: 'clock', title: 'Away' },
      { color: 'grey', title: 'Offline' },
  ]
  const location = ['Prague, Czech Republic', 'Tallinn, Estonia', 'Redmond, USA', 'Palo Alto, USA']
  const position = ['SR. SOFTWARE ENGINEER', 'SOFTWARE ENGINEER', 'SOFTWARE ENGINEER 2', 'PROGRAM MANAGER']

    const getEmployees = (numberOfEmployees) => {      
      let employees = []
      for (let i = 0; i < numberOfEmployees; i++) {
        const lessDataStructure = i > 3 ? Math.round(i/4) : i
                
        employees.push(
          {
            firstName: userFirstName[i],
            lastName: userLastName[i],
            position: position[lessDataStructure],
            location: location[lessDataStructure],
            status: 'Available',
            team: 'Fluent UI Engineering',
            email: `${userFirstName[i]}.${userLastName[i]}@company.com`,
            avatar: {
              label: { variables: { backgroundColor: '#00b5ad', color: 'white' } },
              status: { color: userStatuses[lessDataStructure].color, icon: userStatuses[lessDataStructure].icon, title: userStatuses[lessDataStructure].title},
            },
          },

        )
      }  
      return employees;          
    } 



    return (
      <main aria-label="cards prototype">
        {/* <Dropdown
          inline
          items={[
            'card as group',
            'card as group with aria-expanded',
            'card as group with aria-roledescription as card',
            'menu and menuitem with aria-roledescription as card',
          ]}
          defaultValue={'Select aria roles to be used'}
          onSelectedChange={this.handleSelectedChange}
        /> */}
        <Dropdown
          inline
          items={['use Enter key go inside the card', 'use TAB key go inside the card']}
          defaultValue={'Select type of navigation'}
          onSelectedChange={this.handleSelectedNavigation}
        />
        {/* <div
          role={this.state.parentRole}          
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
          id="parent"
        >
          {this.getCards(15, employee)}
        </div>
        <div aria-live="polite" style={screenReaderContainerStyles}>
          {this.state.a11yInstructionMessage}
        </div>
        <button>any random element</button> */}

        <Divider key={10} size={30} />

        <div
          role={this.state.parentRole}
          onFocus={this.onFocusSetMessageDescribedBy.bind(this)}
          onBlur={this.onBlurClearMessageDescribedBy.bind(this)}
          style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}
          id="parent"
        >
          {this.getCards(9, getEmployees(9), true)}
        </div>
        <div id="instruction-messsage" style={screenReaderContainerStyles}>
          {this.state.a11yDescribedByInstructionMessage}
        </div>
        <button> button outside the card example</button>
      </main>
    )
  }
}

export default EmployeeCardPrototype
