import React from "react"
import {Status} from "@stardust-ui/react"

// description: A status icon can represent a variety of states.
export default (
  <div>
    <Status state="success" /> success
    <br />
    <Status state="info" /> info
    <br />
    <Status state="warning" /> warning
    <br />
    <Status state="error" /> error
  </div>
)
