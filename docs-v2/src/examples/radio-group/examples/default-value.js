import React from "react"
import {RadioGroup} from "@stardust-ui/react"

// description: A radio group can have one of its options pre-selected.
export default (
  <RadioGroup
    defaultCheckedValue="A"
    items={[
      {name: "A", key: "A", label: "Option A", value: "A"},
      {name: "B", key: "B", label: "Option B", value: "B"},
      {name: "C", key: "C", label: "Option C", value: "C"}
    ]}
  />
)
