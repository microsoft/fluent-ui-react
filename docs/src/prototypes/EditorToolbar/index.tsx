import { CodeSnippet } from '@stardust-ui/docs-components'
import * as React from 'react'

import { ComponentPrototype, PrototypeSection } from 'docs/src/prototypes/Prototypes'
import EditorToolbar from './EditorToolbar'
import { editorToolbarReducer, initialState } from './editorToolbarReducer'
import { Button, Provider, themes } from '@stardust-ui/react'
import PortalWindow from './PortalWindow'

const EditorToolbarPrototype: React.FC = () => {
  const [state, dispatch] = React.useReducer(editorToolbarReducer, initialState)
  const [statePortal, dispatchPortal] = React.useReducer(editorToolbarReducer, initialState)
  const [popupOpen, setPortalOpen] = React.useState(false)
  const [rtl, setRtl] = React.useState(false)

  return (
    <PrototypeSection title="Editor Toolbar">
      <ComponentPrototype
        description={
          <>
            A prototype that features the <code>overflow</code> prop of <code>Toolbar</code>{' '}
            component.
          </>
        }
      >
        <EditorToolbar {...state} dispatch={dispatch} />
        <CodeSnippet fitted mode="json" value={statePortal} />
      </ComponentPrototype>

      <ComponentPrototype description={<>Open Toolbar prototype in Portal</>}>
        <Button onClick={() => setPortalOpen(true)} disabled={popupOpen}>
          Open window!
        </Button>
        <input type="checkbox" checked={rtl} onChange={e => setRtl(e.target.checked)} />
        {popupOpen && (
          <PortalWindow onClose={() => setPortalOpen(false)}>
            {externalDocument => (
              <Provider rtl={rtl} theme={themes.teams} target={externalDocument}>
                <EditorToolbar
                  {...statePortal}
                  dispatch={dispatchPortal}
                  target={externalDocument}
                />
              </Provider>
            )}
          </PortalWindow>
        )}
        <CodeSnippet fitted mode="json" value={statePortal} />
      </ComponentPrototype>
    </PrototypeSection>
  )
}

export default EditorToolbarPrototype
