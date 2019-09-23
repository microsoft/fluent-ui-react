import React from "react"
import {Accordion} from "@stardust-ui/react"

// description: A panel's title can be customized to render any element.
export default (
  <Accordion
    defaultActiveIndex={[0]}
    panels={[
      {
        title: {
          content: <Layout start={<Label circular content="Warnings" />} />
        },
        content: {
          key: "warnings",
          content: "Here is a list of warnings discovered."
        }
      },
      {
        title: {
          content: <Layout start={<Label circular content="Errors" />} />
        },
        content: {
          key: "errors",
          content: "Here is a list of errors discovered."
        }
      }
    ]}
  />
)
