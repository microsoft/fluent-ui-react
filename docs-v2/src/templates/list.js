import "./list.css"
import React from "react"
import {Link} from "gatsby"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faExpandArrowsAlt} from "@fortawesome/free-solid-svg-icons"
import {BaseLayout} from "./base-layout"
import {PageHeader} from "../doc-components/page-header"

export default function DefaultListLayout({pageContext}) {
  const {title, description, pages} = pageContext
  return (
    <BaseLayout>
      <PageHeader title={title} description={description} />
      <List previews={false}>
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

export function List({children, previews = true}) {
  const [gridView, setGridView] = React.useState(false)

  return (
    <div className="sui-list-container" data-prefer-grid-view={gridView}>
      <aside className="sui-list-controls" hidden>
        <span className="sui-list-controls__header">List Controls</span>
        <IconButton
          icon={faExpandArrowsAlt}
          title="Select grid view"
          onClick={() => setGridView(true)}
        />
        <IconButton
          icon={faExpandArrowsAlt}
          title="Select list view"
          onClick={() => setGridView(false)}
        />
      </aside>
      <ol className="sui-list">{children}</ol>
    </div>
  )
}

function IconButton({icon, title, onClick}) {
  return (
    <button className="sui-icon-button" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

export function ListItem({as, title, description, preview, ...rest}) {
  const Elem = as || "div"
  return (
    <Elem className="sui-list-item" {...rest}>
      <div className="sui-list-item__preview">{preview}</div>
      <div className="sui-list-item__details">
        <div className="sui-list-item__title">{title}</div>
        <div className="sui-list-item__description">{description}</div>
      </div>
    </Elem>
  )
}
