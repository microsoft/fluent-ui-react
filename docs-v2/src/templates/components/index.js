import "./index.css"
import React from "react"
import {observer} from "mobx-react"
import {Link, graphql, useStaticQuery} from "gatsby"
import * as Stardust from "@stardust-ui/react"
import {PageHeader} from "../../doc-components/page-header"
import {BaseLayout} from "../base-layout"
import {List, ListItem} from "../list"
import {useStore} from "../../store"

export const query = graphql`
  query {
    allComponentSchema(filter: {isParent: {eq: true}, preview: {ne: null}}) {
      nodes {
        displayName
        description
        slug
        preview
      }
    }
  }
`

export default function ComponentsIndexTemplate({data, pageContext}) {
  const {title, description} = pageContext.frontmatter
  const schemas = useStaticQuery(query).allComponentSchema.nodes
  return (
    <>
      <BaseLayout className="sui-component-list">
        <PageHeader title={title} description={description} />
        <ComponentList schemas={schemas} />
      </BaseLayout>
    </>
  )
}

function ComponentList({schemas}) {
  useSmartTabBehavior()
  return (
    <List>
      {schemas.map((schema, idx) => {
        const {displayName, description, preview, slug} = schema
        return (
          <ListItem
            key={displayName}
            as={Link}
            to={"/components/" + slug}
            title={displayName}
            description={description}
            preview={<ComponentPreview source={preview} delay={idx * 25} />}
          />
        )
      })}
    </List>
  )
}

const ComponentPreview = observer(({source, delay}) => {
  const {theme} = useStore()

  // Defer render
  const elem = React.useRef()
  const [ready, setReady] = React.useState(false)
  React.useEffect(() => {
    requestAnimationFrame(() => {
      // FIXME: previews expect React and Stardust to exist as globals. Once we
      // are able to statically render Stardust components this runtime eval
      // should be removed.
      window.React = React
      window.Stardust = Stardust
      elem.current = eval(source) // eslint-disable-line
      setTimeout(() => setReady(true), delay)
    })
  }, [source]) // eslint-disable-line
  if (!ready) {
    return null
  }

  const stardustTheme =
    theme === "light" ? Stardust.themes.teams : Stardust.themes.teamsDark
  const styles = {
    width: "100%",
    padding: "1rem",
    background: "transparent"
  }

  return (
    <Stardust.Provider theme={stardustTheme} styles={styles}>
      <div className="sui-component-preview">{elem.current}</div>
    </Stardust.Provider>
  )
})

// Ignore all Stardust focus/tab handling in the preview list. Users should be
// able to tab through all previews without tabbing into the components themselves.
function useSmartTabBehavior() {
  React.useEffect(() => {
    const previewCards = [...document.querySelectorAll(".sui-list-item")]

    let hijack = false

    function isPreviewCard(node) {
      return node.className.indexOf("sui-list-item") !== -1
    }

    function handleKeydown(e) {
      if (!hijack || e.key !== "Tab") return
      if (e.key !== "Tab") return

      let idx = previewCards.indexOf(document.activeElement)
      if (idx === -1) return

      // Backwards
      if (e.shiftKey) {
        // Exiting preview list
        if (idx === 0) return
        // If not exiting preview list, prevent default tab behavior and
        // forcibly focus the previous preview.
        e.preventDefault()
        previewCards[idx - 1].focus()
      }
      // Forwards
      else {
        // Exiting preview list
        if (idx === previewCards.length - 1) return
        // If not exiting preview list, prevent default tab behavior and
        // forcibly focus the next preview.
        e.preventDefault()
        previewCards[idx + 1].focus()
      }
    }

    function handleKeyup(e) {
      if (e.key !== "Tab") return
      hijack = isPreviewCard(e.target)
    }

    document.addEventListener("keydown", handleKeydown)
    document.addEventListener("keyup", handleKeyup)
    return () => {
      document.removeEventListener("keydown", handleKeydown)
      document.removeEventListener("keyup", handleKeyup)
    }
  })
}
