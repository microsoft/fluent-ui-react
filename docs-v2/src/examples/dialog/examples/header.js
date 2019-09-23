import React from "react"
import {Dialog} from "@stardust-ui/react"

// description: A dialog's header can be customized to render any element.
export default (
  <Dialog
    header={() => <Header color="brand">I'm A Custom Header Element</Header>}
    content="Click outside the popup or press <Escape> to close the dialog."
    trigger={<Button content="Open Dialog" />}
  />
)
