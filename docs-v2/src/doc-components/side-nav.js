import React from "react"
import {Link} from "gatsby"
import "./side-nav.css"

export function SideNav({links}) {
  return (
    <div className="sui-side-nav-container">
      <nav className="sui-side-nav">
        {links.map(link => {
          return (
            <Link
              key={link.path}
              to={link.path}
              className="sui-side-nav-item is-selectable"
              activeClassName="is-selected"
            >
              {link.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
