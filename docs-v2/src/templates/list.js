import "./list.css"
import React from "react"
import {Link} from "gatsby"
import {BaseLayout} from "./base-layout"
import {PageHeader} from "../doc-components/page-header"

export default function DefaultListLayout({pageContext}) {
  const {title, description, pages} = pageContext
  return (
    <BaseLayout>
      <PageHeader title={title} description={description} />
      <List previews={false}>
        {pages.map(page => {
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
  const [showPreviews, setShowPreviews] = React.useState(previews)

  return (
    <div
      data-prefer-grid-view={gridView}
      data-enable-previews={!gridView && showPreviews}
    >
      <header className="sui-list-header">
        <span className="sui-list-header__view-as">View as:</span>
        <button onClick={() => setGridView(true)}>Grid</button>
        <button
          onClick={() => {
            setGridView(false)
            setShowPreviews(previews)
          }}
        >
          List
        </button>
      </header>
      <ol className="sui-list">{children}</ol>
    </div>
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
