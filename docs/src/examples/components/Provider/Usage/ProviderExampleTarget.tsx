import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Attachment, Button, Provider, themes } from '@stardust-ui/react'

type PortalWindowProps = {
  children: (externalDocument: Document) => React.ReactElement
}

const PortalWindow: React.FunctionComponent<PortalWindowProps> = ({ children }) => {
  const externalWindow = React.useRef<Window>(null)
  const [container, setContainer] = React.useState<HTMLDivElement>(null)

  React.useEffect(() => {
    externalWindow.current = window.open('', '', 'width=600,height=400,left=200,top=200')

    const newContainer = externalWindow.current.document.createElement('div')
    externalWindow.current.document.body.appendChild(newContainer)

    setContainer(newContainer)

    return () => {
      externalWindow.current.close()
    }
  }, [])

  return container && ReactDOM.createPortal(children(container.ownerDocument), container)
}

const ProviderExampleTarget = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open window!</Button>
      {open && (
        <PortalWindow>
          {externalDocument => (
            <Provider theme={themes.teams} target={externalDocument}>
              <Attachment header="Document.docx" />
            </Provider>
          )}
        </PortalWindow>
      )}
    </>
  )
}

export default ProviderExampleTarget
