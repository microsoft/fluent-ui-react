import React from "react"
import {Dropdown} from "@stardust-ui/react"

// description: A dropdown can allow selected items to be cleared. Notice the "X" next to the selected item.
export default (
  <Dropdown
    fluid
    clearable
    defaultValue={"Item A"}
    items={["Item A", "Item B", "Item C"]}
    placeholder="You can clear selected items"
  />
)
