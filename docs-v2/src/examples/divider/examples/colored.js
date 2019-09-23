import React from "react"
import {Divider} from "@stardust-ui/react"

// description: A divider can be colored.
export default (
  <Flex column fill>
    <Divider color="brand" content="brand" />
    <Divider color="grey" content="grey" />
    <Divider color="green" content="green" />
    <Divider color="yellow" content="yellow" />
    <Divider color="orange" content="orange" />
    <Divider color="red" content="red" />
  </Flex>
)
