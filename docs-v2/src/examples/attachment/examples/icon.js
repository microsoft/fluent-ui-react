import React from "react"
import {Attachment} from "@stardust-ui/react"

// description: An attachment can include an icon.
export default (
  <div>
    <Attachment icon="word-color" header="MyFile.doc" />
    <Attachment icon="excel-color" header="MyFile.xlsx" />
    <Attachment icon="powerpoint-color" header="MyFile.ppt" />
  </div>
)
