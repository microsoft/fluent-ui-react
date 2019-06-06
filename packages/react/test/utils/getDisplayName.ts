import * as ReactIs from 'react-is'

const getDisplayName = (Component: React.ReactType) => {
  if ((Component as any).$$typeof === ReactIs.ContextProvider) {
    return 'Context.Provider'
  }

  return (
    (Component as React.ComponentType).displayName ||
    (Component as React.ComponentType).name ||
    (typeof Component === 'string' && Component.length > 0 ? Component : 'Unknown')
  )
}

export default getDisplayName
