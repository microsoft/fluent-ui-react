import React from "react"
import {Accordion} from "@stardust-ui/react"

// description: An exclusive accordion allows only one panel to be open at a time. Opening a panel will close any others that are currently open.
export default (
  <Accordion
    exclusive
    defaultActiveIndex={[0]}
    panels={[
      {
        key: 1,
        title: "Section 1",
        content: "Content for Section 1"
      },
      {
        key: 2,
        title: "Section 2",
        content: "Content for Section 2"
      }
    ]}
  />
)
