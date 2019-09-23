import React from "react"
import {BaseLayout} from "../templates/base-layout"
import {SEO} from "../doc-components/seo"

export default function NotFoundPage() {
  return (
    <BaseLayout>
      <SEO title="404: Not found" />
      <h1>NOT FOUND</h1>
    </BaseLayout>
  )
}
