import React from "react"
import {Segment} from "@stardust-ui/react"

// description: A segment can invert its colors for extra contrast.
export default (
  <div style={{width: "100%"}}>
    <Segment inverted color="brand" content="inverted brand" />
    <Segment inverted color="yellow" content="inverted yellow" />
    <Segment inverted color="pink" content="inverted pink" />
    <Segment inverted color="red" content="inverted red" />
    <Segment inverted color="green" content="inverted green" />
  </div>
)
