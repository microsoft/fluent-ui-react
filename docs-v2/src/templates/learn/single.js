// TODO: get rid of this layout. The default single layout needs to be able to
// generate a side nav for the current category, and then each category can
// reuse the default layout.
import "../single.css"
import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import {BaseLayout} from "../base-layout"
import {PageHeader} from "../../doc-components/page-header"
import {PageNav} from "../../doc-components/page-nav"
import {SideNav} from "../../doc-components/side-nav"

export const pageQuery = graphql`
  query learn {
    allSitePage(filter: {path: {regex: "/learn/.+/"}}) {
      nodes {
        path
        context {
          frontmatter {
            order
            title
          }
        }
      }
    }
  }
`

export default function LearnSingleTemplate({children, pageContext}) {
  const {title, description} = pageContext.frontmatter
  const pages = useStaticQuery(pageQuery)
    .allSitePage.nodes.sort((a, b) => {
      const aOrder = defaultValue(a.context.frontmatter.order, Infinity)
      const bOrder = defaultValue(b.context.frontmatter.order, Infinity)
      return aOrder - bOrder
    })
    .map(node => {
      return {
        path: node.path,
        title: node.context.frontmatter.title
      }
    })
  const currIdx = pages.findIndex(node => node.title === title)
  const nextPage = pages[currIdx + 1]
  const prevPage = pages[currIdx - 1]

  return (
    <BaseLayout rail={<SideNav title="Learn" links={pages} />}>
      <div className="sui-article">
        <PageHeader title={title} description={description} />
        <div className="sui-article__content">
          {children}
          {/* FIXME: remove, list template should be different */}
          {title !== "Learn" && <PageNav next={nextPage} prev={prevPage} />}
        </div>
      </div>
    </BaseLayout>
  )
}

function defaultValue(value, defaultValue) {
  return value == null ? defaultValue : value
}
