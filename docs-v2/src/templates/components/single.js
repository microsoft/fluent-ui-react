import "./single.css"
import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import {PropTable} from "@standard-ui-docs/prop-table"
import {Playground} from "@standard-ui-docs/playground"
import {BaseLayout} from "../base-layout"
import {PageHeader} from "../../doc-components/page-header"
import {SideNav} from "../../doc-components/side-nav"

export default function ComponentSingleTemplate({pageContext}) {
  const {schema = {}} = pageContext
  return (
    <BaseLayout rail={<ComponentNav />}>
      <PageHeader title={schema.displayName} description={schema.description} />
      <Section>
        <Playground schema={schema} />
      </Section>
      <Section>
        <PropTable props={schema.props} />
      </Section>
    </BaseLayout>
  )
}

function ComponentNav() {
  const {allSitePage} = useStaticQuery(graphql`
    query components {
      allSitePage(filter: {path: {regex: "/components//"}}) {
        nodes {
          path
          context {
            schema {
              displayName
              description
            }
          }
        }
      }
    }
  `)
  const links = allSitePage.nodes
    .filter(node => {
      if (!node.context.schema) return false
      return !node.path.includes("/playground")
    })
    .map(node => {
      const {displayName, description} = node.context.schema
      return {
        path: node.path,
        title: displayName,
        description
      }
    })
  return <SideNav title="Components" links={links} />
}

function Section({children}) {
  return <div className="sui-component-section">{children}</div>
}
