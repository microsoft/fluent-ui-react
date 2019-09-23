import React from "react"
import {Dialog} from "@stardust-ui/react"

// description: A dialog's content can be customized  to render any element.
export default (
  <Dialog
    header="Demo Dialog"
    content={() => <Loader label="Loading (not really)..." />}
    trigger={<Button content="Open Dialog" />}
  />
)
