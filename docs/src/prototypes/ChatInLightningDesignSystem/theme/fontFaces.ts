import { FontFaces } from 'src/themes/types'

const fontFaces: FontFaces = [
  {
    name: 'Salesforce Sans',
    paths: [
      'https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.10.0/assets/fonts//webfonts/SalesforceSans-Light.woff2',
    ],
    props: {
      fontWeight: 300,
    },
  },
  {
    name: 'Salesforce Sans',
    paths: [
      'https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.10.0/assets/fonts//webfonts/SalesforceSans-LightItalic.woff2',
    ],
    props: {
      fontStyle: 'italic',
      fontWeight: 300,
    },
  },
  {
    name: 'Salesforce Sans',
    paths: [
      'https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.10.0/assets/fonts//webfonts/SalesforceSans-Regular.woff2',
    ],
    props: {
      fontWeight: 400,
    },
  },
  {
    name: 'Salesforce Sans',
    paths: [
      'https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.10.0/assets/fonts//webfonts/SalesforceSans-Italic.woff2',
    ],
    props: {
      fontStyle: 'italic',
      fontWeight: 400,
    },
  },

  {
    name: 'Salesforce Sans',
    paths: [
      'https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.10.0/assets/fonts//webfonts/SalesforceSans-Bold.woff2',
    ],
    props: {
      fontWeight: 700,
    },
  },

  {
    name: 'Salesforce Sans',
    paths: [
      'https://cdn.jsdelivr.net/npm/@salesforce-ux/design-system@2.10.0/assets/fonts//webfonts/SalesforceSans-BoldItalic.woff2',
    ],
    props: {
      fontStyle: 'italic',
      fontWeight: 700,
    },
  },
]

export default fontFaces
