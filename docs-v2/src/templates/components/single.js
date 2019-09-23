import "./single.css"
import React from "react"

export default function ComponentDetailTemplate() {
  return <h1>Hello World</h1>
}

// import "./single.css"
// import React from "react"
// import {useStaticQuery, graphql} from "gatsby"
// import {PropTable} from "@standard-ui-docs/prop-table"
// import {Playground} from "@standard-ui-docs/playground"
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
// import {faCode, faPalette} from "@fortawesome/free-solid-svg-icons"
// import {BaseLayout} from "../base-layout"
// import {Header} from "../../components/header"
// import {SideNav} from "../../components/side-nav"
// import {SEO} from "../../components/seo"

// export default function ComponentSingleTemplate({pageContext}) {
//   const {schema} = pageContext
//   const sideNavLinks = useSideNavLinks()
//   const [persona, setPersona] = React.useState("developer")

//   function renderPersonaView() {
//     switch (persona) {
//       default:
//         return (
//           <>
//             <ComponentDefinition schema={schema} />
//             <ComponentProps schema={schema} />
//           </>
//         )
//     }
//   }

//   return (
//     <>
//       <SEO title={schema.displayName} />
//       <SEO description={schema.description} />
//       <BaseLayout rail={<SideNav links={sideNavLinks} />}>
//         <Header title={schema.displayName}>
//           <PersonaSelector onChange={setPersona} />
//         </Header>
//         {renderPersonaView()}
//       </BaseLayout>
//     </>
//   )
// }

// function useSideNavLinks() {
//   const {allSitePage} = useStaticQuery(graphql`
//     query components {
//       allSitePage(filter: {path: {regex: "/components//"}}) {
//         nodes {
//           path
//           context {
//             frontmatter {
//               title
//             }
//           }
//         }
//       }
//     }
//   `)
//   return allSitePage.nodes
//     .filter(node => !node.path.includes("/playground"))
//     .map(node => {
//       return {
//         path: node.path,
//         title: node.context.frontmatter.title
//       }
//     })
// }

// function PersonaSelector() {
//   return (
//     <div className="sui-component-nav-container">
//       <nav className="sui-component-nav">
//         <a
//           href="#developer"
//           className="is-active"
//           onClick={e => e.preventDefault()}
//         >
//           <FontAwesomeIcon icon={faCode} />
//           Developer View
//         </a>
//         <a href="#design" onClick={e => e.preventDefault()}>
//           <FontAwesomeIcon icon={faPalette} />
//           Designer View
//         </a>
//       </nav>
//     </div>
//   )
// }

// function ComponentDefinition({schema}) {
//   return (
//     <section className="sui-component-section">
//       <header className="sui-component-section__header">
//         <h2 className="sui-component-section__title" id="definition">
//           Definition
//         </h2>
//         <p className="sui-component-section__description">
//           {schema.description}
//         </p>
//       </header>
//       <Playground schema={schema} />
//     </section>
//   )
// }

// function ComponentProps({schema}) {
//   return (
//     <section className="sui-component-section">
//       <header className="sui-component-section__header">
//         <h2 className="sui-component-section__title" id="props">
//           Props
//         </h2>
//         <p className="sui-component-section__description" hidden></p>
//       </header>
//       <PropTable props={schema.props} />
//     </section>
//   )
// }
