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
