import React from "react"
import {Segment} from "@stardust-ui/react"

// description: The default segment style resembles a card.
export default (
  <div style={{width: "100%"}}>
    <Segment>
      <Header>Section A...</Header>
    </Segment>
    <br />
    <Segment>
      <Header>Section B...</Header>
    </Segment>
  </div>
)
