import React from "react"
import {Dialog} from "@stardust-ui/react"

// description: A dialog can be opened when a custom trigger element is clicked.
export default (
  <Dialog
    header="Demo Dialog"
    trigger={<Alert danger>Clicking on me will open a dialog.</Alert>}
  />
)
