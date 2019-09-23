import React from "react"
import {Header} from "@stardust-ui/react"

// description: A header's content can be aligned "left" (default), "center", or "right".
export default (
  <div style={{width: "100%"}}>
    <Header as="h2" content="Left Aligned (Default)" />
    <Header as="h2" textAlign="center" content="Center Aligned" />
    <Header as="h2" textAlign="right" content="Right Aligned" />
  </div>
)
