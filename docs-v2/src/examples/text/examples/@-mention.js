import React from "react"
import {Text} from "@stardust-ui/react"

// description: Text can highlight an "@ mention", where a user is mentioned by name or similar identifier.
export default (
  <div>
    <Text>
      Hey <Text atMention content="@Joe" />, did you read that article?
    </Text>
    <br />
    <Text>
      Not yet, sorry <Text atMention="me" content="@Susy" />! I will get to it
      soon.
    </Text>
  </div>
)
