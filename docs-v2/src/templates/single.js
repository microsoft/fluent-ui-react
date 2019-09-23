import "./single.css"
import React from "react"
import {BaseLayout} from "./base-layout"
import {PageHeader} from "../doc-components/page-header"

export default function DefaultSingleTemplate({children, pageContext}) {
  const {title, description} = pageContext.frontmatter
  return (
    <BaseLayout>
      <main className="sui-article">
        <PageHeader title={title} description={description} />
        <div className="sui-article__content">{children}</div>
      </main>
    </BaseLayout>
  )
}
