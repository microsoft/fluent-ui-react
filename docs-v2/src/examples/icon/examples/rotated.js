import React from "react"
import {Icon} from "@stardust-ui/react"

// description: An icon can be rotated by a specified number of degrees.
export default (
  <Flex gap="gap.medium">
    <Icon name="like" rotate={0} />
    <Icon name="like" rotate={90} />
    <Icon name="like" rotate={180} />
    <Icon name="like" rotate={270} />
    <Icon name="like" rotate={360} />
  </Flex>
)
