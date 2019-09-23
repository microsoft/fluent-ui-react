import React from "react"
import {Dialog} from "@stardust-ui/react"

// description: The default dialog style.
export default (
  <Dialog
    header="Demo Dialog"
    content="Click outside the popup or press <Escape> to close the dialog."
    trigger={<Button content="Open Dialog" />}
  />
)
