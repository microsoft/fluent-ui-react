import React from "react"
import {Link} from "gatsby"
import "./side-nav.css"

export function SideNav({title, links = []}) {
  return (
    <nav className="sui-side-nav" aria-label="Secondary Navigation">
      {title && <h3 className="sui-side-nav__title">{title}</h3>}
      {links.map((link, idx) => {
        return (
          <Link
            key={link.path}
            to={link.path}
            className="sui-side-nav__item"
            activeClassName="is-active"
            partiallyActive
          >
            {link.title}
          </Link>
        )
      })}
    </nav>
  )
}
