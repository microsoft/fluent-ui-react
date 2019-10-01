import "./list.css"
import React from "react"
import {Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import {faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons"
import {BaseLayout} from "./base-layout"
import {PageHeader} from "../doc-components/page-header"

export default function DefaultListLayout({pageContext}) {
  const {title, description, pages} = pageContext
  const [gridView, setGridView] = React.useState(true)

  return (
    <BaseLayout>
      <PageHeader title={title} description={description} />
      <List grid={gridView}>
        {pages.map(page => {
          // TODO: currently rendering ol > a, should be ol > li > a
          return (
            <ListItem
              as={Link}
              to={page.href}
              key={page.title}
              title={page.title}
              description={page.description}
            />
          )
        })}
      </List>
    </BaseLayout>
  )
}

export function List({children, grid = true}) {
  return (
    <ol className="sui-list" data-prefer-grid-view={grid}>
      {children}
    </ol>
  )
}

function IconButton({icon, title, onClick}) {
  return (
    <button className="sui-icon-button" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export function ListItem({as, title, to, description, preview}) {
  return (
    <li className="sui-list-item">
      <Link to={to} title={title} className="sui-list-item__body">
        <div className="sui-list-item__details">
          <div className="sui-list-item__title">{title}</div>
          <div className="sui-list-item__description">{description}</div>
        </div>
        <div className="sui-list-item__preview">{preview}</div>
      </Link>
    </li>
  )
}
