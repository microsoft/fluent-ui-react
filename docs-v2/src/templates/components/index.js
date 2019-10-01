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
        category
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
  const components = useStaticQuery(query).allComponentSchema.nodes

  return (
    <>
      <BaseLayout>
        <PageHeader title={title} description={description} />
        <ComponentList components={components} />
      </BaseLayout>
    </>
  )
}

function ComponentList({components}) {
  useSmartTabBehavior()

  const [grid, setGrid] = React.useState(true)

  // FIXME: make this more resilient
  const categories = React.useMemo(() => {
    let delay = 0

    return [
      {title: "Inputs", description: ""},
      {title: "Items & Lists", description: ""},
      {title: "Media", description: ""},
      {title: "Menus", description: ""},
      {title: "Typography", description: ""},
      {title: "Motion", description: ""},
      {title: "Surfaces", description: ""},
      {title: "Notifications", description: ""},
      {title: "Other", description: ""}
    ].map(category => {
      category.components = []
      for (const c of components) {
        if (
          c.category === category.title ||
          (!c.category && category.title === "Other")
        ) {
          c.delay = delay
          delay += 25 // ms
          category.components.push(c)
        }
      }
      return category
    })
  }, [components])

  const sections = categories.map(category => {
    return (
      <section key={category.title} className="sui-list-section">
        <h2 className="sui-list-section__title">{category.title}</h2>
        <List grid={grid}>
          {category.components.map(component => {
            const {displayName, description, preview, slug} = component

            // MenuButton -> Menu Button
            const title = displayName.replace(/(\w)([A-Z])/g, "$1 $2")

            return (
              <ListItem
                key={displayName}
                as={Link}
                to={"/components/" + slug}
                title={title}
                description={description}
                preview={
                  <ComponentPreview source={preview} delay={component.delay} />
                }
              />
            )
          })}
        </List>
      </section>
    )
  })
  return (
    <div className="sui-component-list" style={{position: "relative"}}>
      <button
        onClick={() => setGrid(!grid)}
        style={{position: "absolute", top: "1rem", left: "-17rem"}}
      >
        DEBUG: Toggle Grid
      </button>
      {sections}
    </div>
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

  return (
    <Stardust.Provider theme={stardustTheme}>
      <div className="sui-component-preview">{elem.current}</div>
    </Stardust.Provider>
  )
})

// Ignore all Stardust focus/tab handling in the preview list. Users should be
// able to tab through all previews without tabbing into the components themselves.
function useSmartTabBehavior() {
  React.useEffect(() => {
    const previewCards = [...document.querySelectorAll(".sui-list-item__body")]

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
