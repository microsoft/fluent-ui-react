import React from "react"
export {wrapRootElement} from "./src/wrap-root-element"

// FIXME
// We set the global font size to 10px in src/global-css/main.css, but Gatsby
// isn't guaranteed to inject that style before Stardust loads. Thus, there's
// a race condition: if Stardust initializes before that font size is applied,
// it will think that the base font size is 16px (the default) instead of 10,
// and compute all of its rem values based on that incorrect base size.
export function onRenderBody({setHeadComponents}) {
  setHeadComponents([
    React.createElement("script", {
      dangerouslySetInnerHTML: {
        __html: `
          document.documentElement.style.fontSize = "10px"
        `
      }
    })
  ])
}
