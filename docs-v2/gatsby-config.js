const path = require("path")

module.exports = {
  siteMetadata: {
    title: "Stardust UI",
    siteUrl: "https://stardust.zuko.me",
    description: "An accessible, themable component library for the web",
    author: "Microsoft"
  },
  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-typescript",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-source-component-schemas",
    // {
    //   resolve: "gatsby-source-filesystem",
    //   options: {
    //     name: "components",
    //     path: `${__dirname}/src/pages/components`
    //   }
    // },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
              noInlineHighlight: true,
              languageExtensions: []
            }
          }
        ],
        defaultLayouts: {
          default: require.resolve("./src/templates/single.js"),
          components: require.resolve("./src/templates/components/single.js")
        }
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Stardust UI",
        short_name: "stardust",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "static/favicon.png"
      }
    },
    // Alias all @stardust-ui imports so that they are imported from the
    // monorepo. This allows developers to make changes to the Stardust library
    // and see them in the doc site without any additional build step.
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@stardust-ui/react": path.resolve(
            __dirname,
            "../packages/react/src"
          ),
          "@stardust-ui/react-component-event-listener": path.resolve(
            __dirname,
            "../packages/react-component-event-listener/src"
          ),
          "@stardust-ui/react-component-nesting-registry": path.resolve(
            __dirname,
            "../packages/react-component-nesting-registry/src"
          ),
          "@stardust-ui/react-component-ref": path.resolve(
            __dirname,
            "../packages/react-component-ref/src"
          ),
          "@stardust-ui/react-proptypes": path.resolve(
            __dirname,
            "../packages/react-proptypes/src"
          )
        }
      }
    }
  ]
}
