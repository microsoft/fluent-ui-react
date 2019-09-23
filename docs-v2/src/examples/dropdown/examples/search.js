import React from "react"
import {Dropdown} from "@stardust-ui/react"

// description: A dropdown can filter items based on user input.
export default (
  <Dropdown
    fluid
    search
    multiple
    items={["Item A", "Item B", "Item C"]}
    placeholder="Type here to search"
    noResultsMessage="No matches found"
  />
)
