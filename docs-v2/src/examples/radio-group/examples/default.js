import React from "react"
import {RadioGroup} from "@stardust-ui/react"

// description: The default radio group renders its options horizontally.
export default (
  <RadioGroup
    items={[
      {name: "A", key: "A", label: "Option A", value: "A"},
      {name: "B", key: "B", label: "Option B", value: "B"},
      {name: "C", key: "C", label: "Option C", value: "C"}
    ]}
  />
)
