import "./page-nav.css"
import React from "react"
import {Link} from "gatsby"

export function PageNav({prev, next}) {
  return (
    <nav className="sui-page-nav" aria-label="pagination">
      {prev && (
        <Link className="sui-page-nav__item is-prev" to={prev.path}>
          <span className="sui-page-nav__item-label">Previous</span>
          {prev.title}
        </Link>
      )}
      {next && (
        <Link className="sui-page-nav__item is-next" to={next.path}>
          <span className="sui-page-nav__item-label">Next</span>
          {next.title}
        </Link>
      )}
    </nav>
  )
}
