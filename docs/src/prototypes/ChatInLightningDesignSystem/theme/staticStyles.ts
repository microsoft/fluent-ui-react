import { StaticStyle, StaticStyles } from '@stardust-ui/react'

// Is not exported, do not want to duplicate
import normalizeCSS from 'src/themes/teams/staticStyles/normalizeCSS'

const globalStyles: StaticStyle = {
  body: {
    padding: 0,
    margin: 0,
    fontFamily: 'Salesforce Sans,Arial,sans-serif',
    fontSize: '14px',
  },
  '*': {
    boxSizing: 'border-box',
  },
  '*:before': {
    boxSizing: 'border-box',
  },
  '*:after': {
    boxSizing: 'border-box',
  },
}
const staticStyles: StaticStyles = [normalizeCSS, globalStyles]

export default staticStyles
