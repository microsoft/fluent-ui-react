import React from "react"
import {RadioGroup} from "@stardust-ui/react"

// description: A radio group can be disabled to prevent user interaction.
export default (
  <RadioGroup
    items={[
      {name: "A", key: "A", label: "Option A", value: "A", disabled: true},
      {name: "B", key: "B", label: "Option B", value: "B", disabled: true},
      {name: "C", key: "C", label: "Option C", value: "C", disabled: true}
    ]}
  />
)
