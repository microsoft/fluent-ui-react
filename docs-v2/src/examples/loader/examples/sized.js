import React from "react"
import {Loader} from "@stardust-ui/react"

// description: A loader can render at different sizes.
export default (
  <>
    <Loader size="small" label="small" />
    <Loader size="medium" label="medium (default)" />
    <Loader size="large" label="large" />
  </>
)
