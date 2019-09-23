import React from "react"
import {Icon} from "@stardust-ui/react"

// description: An icon can be made to smaller or larger than its default size.
export default (
  <Flex gap="gap.medium">
    <div>
      <Icon size="smallest" name="call" />
      <br />
      smallest
    </div>
    <div>
      <Icon size="smaller" name="call" />
      <br />
      smaller
    </div>
    <div>
      <Icon size="small" name="call" />
      <br />
      small
    </div>
    <div>
      <Icon name="call" />
      <br />
      default
    </div>
    <div>
      <Icon size="large" name="call" />
      <br />
      large
    </div>
    <div>
      <Icon size="larger" name="call" />
      <br />
      larger
    </div>
    <div>
      <Icon size="largest" name="call" />
      <br />
      largest
    </div>
  </Flex>
)
