import React from "react"
import {RadioGroup} from "@stardust-ui/react"

// description: A radio group can display its options vertically.
export default (
  <RadioGroup
    vertical
    items={[
      {name: "A", key: "A", label: "Option A", value: "A"},
      {name: "B", key: "B", label: "Option B", value: "B"},
      {name: "C", key: "C", label: "Option C", value: "C"}
    ]}
  />
)
