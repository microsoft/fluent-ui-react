import React from "react"
import {List} from "@stardust-ui/react"

// description:
export default (
  <List
    selectable
    defaultSelectedIndex={0}
    items={[
      {header: "First Item", content: "This is some mock content"},
      {header: "Second Item", content: "Here is even more mock content"},
      {
        header: "Third Item",
        content: "Some longer mock content might presumably go here"
      }
    ]}
  />
)
