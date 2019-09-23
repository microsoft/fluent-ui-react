import React from "react"
import {Avatar} from "@stardust-ui/react"

// description: An avatar's status icon can be bordered. Note, use the "statusBorderColor" theme variable to ensure it matches the background.
export default (
  <div style={{background: "red", padding: "3rem"}}>
    <Avatar
      name="Michael Scott"
      status={{color: "green", icon: "stardust-checkmark"}}
      variables={{statusBorderColor: "red"}}
    />
  </div>
)
