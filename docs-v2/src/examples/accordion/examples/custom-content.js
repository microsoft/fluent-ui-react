import React from "react"
import {Accordion} from "@stardust-ui/react"

// description: A panel's content can be customized to render any element.
export default (
  <Accordion
    defaultActiveIndex={[0]}
    panels={[
      {
        title: "Pets",
        content: {
          key: "animals",
          content: (
            <Flex gap="gap.smaller">
              <Button primary>Add pet</Button>
              <Button>Remove pet</Button>
            </Flex>
          )
        }
      }
    ]}
  />
)
