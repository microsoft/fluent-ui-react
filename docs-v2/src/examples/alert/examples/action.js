import React from "react"
import {Alert} from "@stardust-ui/react"

// description: An Alert can render an icon to indicate that it's actionable.
export default (
  <Alert
    action={{icon: "close"}}
    content="This alert show that it can be closed"
  />
)
