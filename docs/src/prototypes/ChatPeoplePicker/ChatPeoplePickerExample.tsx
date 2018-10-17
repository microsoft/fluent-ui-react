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
  {
    name: 'Imperator Furiosa',
    image: 'public/images/avatar/small/veronika.jpg',
    position: 'Boss',
  },
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
  return getUnselectedItems(selected).filter(
    item => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()),
  )
}

const PeoplePickerExampleShorthand = () => (
  <div>
    <div style={{ margin: '4rem auto 0 4rem' }}>
      <ChatPeoplePicker source={peopleSupplier} width="30rem" />
    </div>
    <div style={{ width: '50rem', margin: '1rem auto 1rem 4rem' }}>
      <h3>Chat People Picker</h3>
      <h4>Contents</h4>
      <p>
        Prototype built with the help of PayPal'a Downshift component and Stardust components.
        Downshift is responsible for:
      </p>
      <ul>
        <li>Providing the autosuggestions when you type something in the text field.</li>
        <li>Highlight option in dropdown on mouse hover and on keyboard navigation.</li>
        <li>
          Ensure keyboard navigation works in the dropdown, by keeping focus on edit text and using
          aria-activedescendant attribute.
        </li>
        <li>Open/Close dropdown on click and keyboard Enter/Up/Down/Esc.</li>
        <li>Provide a callback for handling the selection of an element from the list.</li>
        <li>Append ARIA roles and other attributes to make it accessible with screen reader.</li>
      </ul>
      <p>
        Downshift provides a children callback in which we can render whatever we want, as long as
        we use the provided prop parameters on key elements. These parameters are passed as children
        callback params, and we use them in our rendering HTML on the Label, Input, List, ListItem
        etc.
      </p>
      <p>
        As these parameters are functions, when they are called, they apply both the attributes for
        those nodes(roles, IDs, labelledBy, etc.) and means to achieve menu show/hide, option
        navigation by keyboard, highlight options etc. More in the downshift{' '}
        <a href="https://github.com/paypal/downshift">documentation</a>.
      </p>
      <p>
        In order to actually render the prototype, I've used Stardust components, like Input, Label,
        List and Button. The prototype is meant to serve as an example of use for Stardust
        components and check if we can properly use Downshift in order to give our component
        accessibility functionalities.
      </p>
      <h3>Functionality</h3>
      <h4>Mouse</h4>
      <ul>
        <li>Click on widget will set focus on the Input component.</li>
        <li>
          Click outside the widget when menu is opened will close the menu, and keep whatever text
          is in the Input.
        </li>
        <li>
          Click on an option from the menu will close menu and add the person as a Label with Close
          Icon and Avatar, in a list before the Input, and will clear the Input of any value
          entered.
        </li>
        <li>
          Click on any Close Icon from selected people Labels will remove that person from the list.
        </li>
        <li>Click on any of the buttons currently doesn't do anything.</li>
      </ul>
      <h4>Keyboard</h4>
      <ul>
        <li>
          While focus is on Input and menu is hidden, Up/Down arrow will open the menu and highlight
          the last/first option in the menu.
        </li>
        <li>
          While focus is on Input and menu is shown, Up/Down arrow will navigate through the
          options, in a circular fashion.
        </li>
        <li>
          While focus in on Input, Tab/Shift Tab will act as default, will close menu if visible,
          add the currently highlighted person from the menu (if any) to the selected people list,
          and move focus to next/previous element.
        </li>
        <li>
          If the list of people has at least one person, its Close Icon will be focusable, and in
          the Tab Order, navigable with Tab/Shift Tab.
        </li>
        <li>
          Enter while focus is on any Close Icon from selected people will remove that person from
          the list.
        </li>
        <li>
          Enter while menu is open and an option is highlighted will add that person to the selected
          people list and also clear the text in the text field, if any.
        </li>
        <li>
          If menu is opened, Esc will close it, without adding the highlighted person to the list of
          selected people and keeps the value in the text field, if any.
        </li>
        <li>
          Inputing characters in the Input field will show menu, if not visible, and change the
          people in the menu according to value entered.
        </li>
        <li>
          Inputting characters will make placeholder disappear, if it was there already. Placeholder
          is on the Input only when both the selected people list and Input value are empty.
        </li>
        <li>
          Backspace will remove character from Input if it has content. If input is empty, it will
          remove selected people one by one from the list, if any.
        </li>
      </ul>
    </div>
  </div>
)

export default PeoplePickerExampleShorthand
