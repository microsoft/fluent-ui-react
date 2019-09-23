import React from "react"
import {List} from "@stardust-ui/react"

// description:
export default (
  <List
    items={[
      {
        header: "First Item",
        content: 'I include "header" media',
        headerMedia: "7:00pm"
      },
      {
        header: "Second Item",
        content: 'I include "content" media',
        contentMedia: "7:00pm"
      },
      {
        header: "Third Item",
        content: 'I include "end" media',
        endMedia: <span>&hellip;</span>
      }
    ]}
  />
)
