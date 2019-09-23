import React from "react"
import {Accordion} from "@stardust-ui/react"

// description: An accordion groups content by a title. Clicking on a title expands that group's content, or closes it if it's already open.
export default (
  <Accordion
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
