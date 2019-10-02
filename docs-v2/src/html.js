import React from "react"

export default function HTML(props) {
  extractCSS(props)
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{__html: props.body}}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

// Gatsby inlines CSS into a <style> tag in the <head>, but we have a lot of
// CSS that would be better off served and cached through a <link /> tag.
function extractCSS(props) {
  if (process.env.NODE_ENV === "production") {
    for (const component of props.headComponents) {
      if (component.type === "style") {
        const index = props.headComponents.indexOf(component)
        const link = (
          <link rel="stylesheet" href={component.props["data-href"]} />
        )
        props.headComponents.splice(index, 1, link)
      }
    }
  }
}
