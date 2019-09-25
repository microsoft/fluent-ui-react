import { Attachment, Button, Provider, Ref, themes } from '@stardust-ui/react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

type PortalFrameProps = {
  children: (externalDocument: Document) => React.ReactElement
  onMount: () => void
}

const PortalFrame: React.FunctionComponent<PortalFrameProps> = ({ children, onMount }) => {
  const frameRef = React.useRef<HTMLIFrameElement>(null)
  const [mounted, setMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])
  React.useEffect(() => {
    if (mounted) onMount()
  }, [mounted])

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

const ProviderExampleTargetFrame = () => {
  const buttonRef = React.useRef<HTMLButtonElement>()

  return (
    <PortalFrame onMount={() => buttonRef.current.focus()}>
      {externalDocument => (
        <Provider theme={themes.teams} target={externalDocument}>
          <Attachment actionable header="Document.docx" />
          <Ref innerRef={buttonRef}>
            <Button content="Hello world!" />
          </Ref>
        </Provider>
      )}
    </PortalFrame>
  )
}

export default ProviderExampleTargetFrame
