import "./navbar.css"
import React from "react"
import {Link, useStaticQuery, graphql} from "gatsby"
import {Search} from "@standard-ui-docs/search"
import {observer} from "mobx-react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons"
import {faFile} from "@fortawesome/free-regular-svg-icons"
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {useStore} from "../store"

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <Brand />
        <Links />
        <SiteSearch />
        <MetaLinks />
        <ThemePicker />
      </div>
    </header>
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
        hidden
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
        nodes {
          path
          context {
            frontmatter {
              title
              description
              category
            }
          }
        }
      }
    }
  `)
  return React.useMemo(() => {
    return result.allSitePage.nodes
      .filter(
        node => node.context.frontmatter && node.context.frontmatter.category
      )
      .map(node => {
        const {title, description, category} = node.context.frontmatter
        return {
          path: node.path,
          category,
          title,
          description
        }
      })
  }, [result])
}

function MetaLinks() {
  return (
    <div className="navbar-meta-links">
      <a
        href="https://github.com/stardust-ui/react"
        title="Github"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://github.com/stardust-ui/react/blob/master/CHANGELOG.md"
        title="Changelog"
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={faFile} />
      </a>
    </div>
  )
}

const ThemePicker = observer(() => {
  const store = useStore()
  const icon = store.theme === "light" ? faMoon : faSun
  return (
    <button
      className="sui-theme-picker"
      title="Toggle light/dark mode"
      onClick={store.toggleTheme}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  )
})
