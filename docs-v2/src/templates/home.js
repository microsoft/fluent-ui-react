import "./home.css"
import React from "react"
import {SEO} from "../doc-components/seo"

export function HomeTemplate({children, pageContext}) {
  const {heading, title, description} = pageContext.frontmatter
  return (
    <>
      <SEO title={title} />
      <SEO description={description} />
      <div className="home-wrapper">
        <main className="home-content">
          <h1 className="home-title">{heading}</h1>
          <div className="home-body">{children}</div>
        </main>
      </div>
    </>
  )
}
