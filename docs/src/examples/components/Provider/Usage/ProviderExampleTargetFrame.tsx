import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Attachment, Button, Provider, themes } from '@stardust-ui/react'

type PortalWindowProps = {
  children: (externalDocument: Document) => React.ReactElement
  onClose?: () => void
}

const PortalFrame: React.FunctionComponent<PortalWindowProps> = ({ children }) => {
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const [mounted, setMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <iframe
        ref={frameRef}
        style={{ height: 300, width: 600, border: 0, padding: 20 }}
        title="An example of nested Provider in iframe"
      />
      {mounted &&
        ReactDOM.createPortal(
          children(frameRef.current.contentDocument),
          frameRef.current.contentDocument.body,
        )}
    </>
  )
}

const ProviderExampleTargetFrame = () => (
  <PortalFrame>
    {externalDocument => (
      <Provider theme={themes.teams} target={externalDocument}>
        <Attachment actionable header="Document.docx" />
        <Button content="Hello world!" />
      </Provider>
    )}
  </PortalFrame>
)

export default ProviderExampleTargetFrame
