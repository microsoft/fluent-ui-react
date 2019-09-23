import React from "react"
import {SEO} from "./seo"
import "./page-header.css"

export function PageHeader({title, description, children}) {
  return (
    <>
      <SEO title={title} />
      {description && <SEO description={description} />}
      <header className="sui-page-header">
        <h1 className="sui-page-header__title">{title}</h1>
        {description && (
          <span className="sui-page-header__description">{description}</span>
        )}
        {children}
      </header>
    </>
  )
}
