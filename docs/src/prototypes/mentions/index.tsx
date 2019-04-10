import * as React from 'react'

import { PrototypeSection, ComponentPrototype } from '../Prototypes'
import withMentionsEditor from './MentionsEditor'
import MentionsDropdown from './MentionsDropdown'
import MentionsPopup from './MentionsPopup'

const MentionsDropdownWithEditor = withMentionsEditor(MentionsDropdown)
const MentionsPopupWithEditor = withMentionsEditor(MentionsPopup)

export default () => (
  <PrototypeSection title="Mentions">
    <ComponentPrototype
      title="Editable Area with Dropdown"
      description="Type text into editable area below. Use the '@' key to mention people."
    >
      <MentionsDropdownWithEditor />
    </ComponentPrototype>
    <ComponentPrototype
      title="Editable Area with Popup"
      description="Type text into editable area below. Use the '@' key to mention people."
    >
      <MentionsPopupWithEditor />
    </ComponentPrototype>
  </PrototypeSection>
)
