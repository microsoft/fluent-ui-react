import React from "react"
import {Icon} from "@stardust-ui/react"

// description: An icon can be rendered in a variety of colors.
export default (
  <Flex gap="gap.medium">
    <div>
      <Icon color="pink" name="call" />
      <br />
      pink
    </div>
    <div>
      <Icon color="red" name="call" />
      <br />
      red
    </div>
    <div>
      <Icon color="yellow" name="call" />
      <br />
      yellow
    </div>
    <div>
      <Icon color="orange" name="call" />
      <br />
      orange
    </div>
    <div>
      <Icon color="green" name="call" />
      <br />
      green
    </div>
  </Flex>
)
