import "./standalone-playground.css"
import React from "react"
// import {Playground} from "@standard-ui-docs/playground"

export default function StandalonePlaygroundTemplate({pageContext}) {
  const {schema} = pageContext
  return <div className="sui-standalone-playground"></div>
}
