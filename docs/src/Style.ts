const style: any = {}
const sidebarWidth = 250

style.container = {}

style.menu = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  width: sidebarWidth,
  paddingBottom: '1em',
  // match menu background
  // prevents a white background when items are filtered out by search
  background: '#1B1C1D',
  overflowY: 'scroll',
}

style.sidebarMain = {
  marginLeft: sidebarWidth,
  minWidth: sidebarWidth + 300,
}

style.main = {
  ...style.sidebarMain,
  maxWidth: sidebarWidth + 900,
}

export default style

export const semanticCssOverrides = `
  .crossout {
    text-decoration: line-through!important;
  }

  .ui.secondary.inverted.menu a.item.disabled:hover {
    color: rgba(255,255,255,.7)!important;
    cursor: not-allowed!important;
  }
`
