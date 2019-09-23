import React from "react"
import {Dialog} from "@stardust-ui/react"

// description: A dialog can be used to easily confirm or cancel an operation.
export default (
  <Dialog
    cancelButton="Cancel"
    confirmButton="Confirm"
    header="Are you sure you want to proceed?"
    trigger={<Button content="Open Dialog" />}
  />
)
