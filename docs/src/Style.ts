const sidebarWidth = 250

const sidebarMain = {
  marginLeft: sidebarWidth,
  minWidth: sidebarWidth + 300,
}

const style = {
  container: {
    height: '100%',
  },

  menu: {
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
  },

  sidebarMain,

  main: {
    ...sidebarMain,
    maxWidth: sidebarWidth + 900,
    height: '100%',
  },
}

export default style
