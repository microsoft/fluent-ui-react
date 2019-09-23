import React from "react"
import {Attachment} from "@stardust-ui/react"

// description: An attachment can provide the user with an action.
export default (
  <div>
    <Attachment header="MyFile_01.doc" action={{icon: "close"}} />
    <Attachment header="MyFile_02.doc" action={{icon: "more"}} />
  </div>
)
