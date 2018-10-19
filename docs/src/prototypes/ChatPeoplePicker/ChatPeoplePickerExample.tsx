import * as React from 'react'
import ChatPeoplePicker from './ChatPeoplePicker'
import peopleSupplier from './ChatPeoplePickerItems'
import ChatPeoplePickerDocs from './ChatPeoplePickerDocs'

const PeoplePickerExampleShorthand = () => (
  <div>
    <div style={{ margin: '4rem auto 0 4rem' }}>
      <ChatPeoplePicker source={peopleSupplier} width="30rem" />
    </div>
    <ChatPeoplePickerDocs />
  </div>
)

export default PeoplePickerExampleShorthand
