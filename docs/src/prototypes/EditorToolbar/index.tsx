import { CodeSnippet } from '@stardust-ui/docs-components'
import * as React from 'react'

import { ComponentPrototype, PrototypeSection } from 'docs/src/prototypes/Prototypes'
import EditorToolbar from './EditorToolbar'
import { editorToolbarReducer, initialState } from './editorToolbarReducer'

const EditorToolbarPrototype: React.FC = () => {
  const [state, dispatch] = React.useReducer(editorToolbarReducer, initialState)

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
      </ComponentPrototype>
      <CodeSnippet fitted mode="json" value={state} />
    </PrototypeSection>
  )
}

export default EditorToolbarPrototype
