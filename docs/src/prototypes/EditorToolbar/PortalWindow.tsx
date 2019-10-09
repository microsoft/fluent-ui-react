import * as React from 'react'
import * as ReactDOM from 'react-dom'

const PortalWindow = ({ children, onClose = undefined }) => {
  const externalContainer = React.useRef(null)
  const externalWindow = React.useRef(null)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200')
    externalWindow.current.document.documentElement.style.fontSize = '14px'
    externalContainer.current = externalWindow.current.document.createElement('div')
    externalWindow.current.document.body.appendChild(externalContainer.current)
    if (onClose) externalWindow.current.onbeforeunload = onClose
    setMounted(true)
    return () => {
      externalWindow.current.close()
    }
  }, [])
  return (
    mounted &&
    ReactDOM.createPortal(
      children(externalContainer.current.ownerDocument),
      externalContainer.current,
    )
  )
}

export default PortalWindow
