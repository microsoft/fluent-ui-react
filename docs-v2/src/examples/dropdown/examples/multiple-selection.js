import React from "react"
import {Dropdown} from "@stardust-ui/react"

// description: A dropdown can allow multiple items to be selected.
export default (
  <Dropdown
    fluid
    multiple
    defaultValue={["Item A", "Item B"]}
    items={["Item A", "Item B", "Item C"]}
    placeholder="You can select multiple items"
  />
)
