import React from "react"
import {Text} from "@stardust-ui/react"

// description: Text can be styled to represent common states, which helps communicate its intent to the user.
export default (
  <div>
    <Text success content='This text represents a "success" state.' />
    <br />
    <Text error content='This text represents a "error" state.' />
  </div>
)
