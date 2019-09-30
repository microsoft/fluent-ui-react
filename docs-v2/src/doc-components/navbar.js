import "./navbar.css"
import React from "react"
import {Link, useStaticQuery, graphql} from "gatsby"
import {Search} from "@standard-ui-docs/search"

export function Navbar() {
  return (
    <>
      <header className="navbar">
        <div className="navbar-content">
          <Brand />
          <Links />
          <SiteSearch />
        </div>
      </header>
    </>
  )
}

function Brand() {
  return (
    <Link to="/" className="navbar-brand">
      <img
        className="navbar-logo"
        alt="Stardust UI logo"
        title="Stardust UI logo"
        src="/favicon.png"
      />
      <span className="navbar-title">Stardust UI</span>
    </Link>
  )
}

function Links() {
  return (
    <nav className="navbar-links">
      <Link
        to="/learn"
        className="navbar-link"
        activeClassName="is-active"
        partiallyActive
      >
        Learn
      </Link>
      <Link
        to="/components"
        className="navbar-link"
        activeClassName="is-active"
        partiallyActive
      >
        Components
      </Link>
      <Link
        to="/faq"
        className="navbar-link"
        activeClassName="is-active"
        partiallyActive
      >
        FAQ
      </Link>
    </nav>
  )
}

function SiteSearch() {
  const searchIndex = useSearchIndex()
  return (
    <div className="navbar-search">
      <Search pages={searchIndex} />
    </div>
  )
}

function useSearchIndex() {
  const result = useStaticQuery(graphql`
    query {
      allSitePage {
        edges {
          node {
            path
            context {
              frontmatter {
                title
                description
              }
            }
          }
        }
      }
    }
  `)
  return React.useMemo(() => {
    return result.allSitePage.edges
      .filter(edge => edge.node.context && edge.node.context.frontmatter)
      .map(({node}) => {
        // FIXME: pages should have correct frontmatter at build time
        const category =
          node.context.frontmatter.category ||
          (/\/learn/.test(node.path)
            ? "Learn"
            : /\/components/.test(node.path)
            ? "Components"
            : "Site")
        return {
          href: node.path,
          category,
          title: node.context.frontmatter.title,
          description: node.context.frontmatter.description
        }
      })
  }, [result])
}
