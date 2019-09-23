import React from "react"
import {Text} from "@stardust-ui/react"

// description: A long piece of text can be truncated when it reaches the edge of its container, where it will render an ellipsis rather than overflow.
export default (
  <Text
    truncated
    content="I'm a really long piece of text that's likely to overflow from my container. I'll render an ellipsis instead of messing up the layout!"
  />
)
