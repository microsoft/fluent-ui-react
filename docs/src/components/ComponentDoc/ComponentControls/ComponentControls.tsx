import * as React from 'react'
import { Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import ComponentControlsCodeSandbox from './ComponentControlsCodeSandbox/ComponentControlsCodeSandbox'
import ComponentControlsShowCode from './ComponentControlsShowCode'
import ComponentControlsCopyLink from './ComponentControlsCopyLink'
import ComponentControlsShowVariables from './ComponentControlsShowVariables'
import ComponentControlsMaximize from './ComponentControlsMaximize'
import ComponentControlsShowTransparent from './ComponentControlsShowTransparent'
import ComponentControlsRtl from './ComponentControlsRtl'

type ComponentControlsProps = {
  exampleCode: string
  exampleLanguage: ComponentSourceManagerLanguage
  examplePath: string
  anchorName: string
  onCopyLink: () => void
  onShowCode: () => void
  onShowRtl: () => void
  onShowTransparent: () => void
  onShowVariables: () => void
  showCode: boolean
  showRtl: boolean
  showTransparent: boolean
  showVariables: boolean
  visible: boolean
}

const ComponentControls: React.FC<ComponentControlsProps> = props => {
  const {
    anchorName,
    exampleCode,
    exampleLanguage,
    examplePath,
    showCode,
    showRtl,
    showTransparent,
    showVariables,
    onCopyLink,
    onShowCode,
    onShowRtl,
    onShowTransparent,
    onShowVariables,
  } = props

  return (
    <Menu color="green" icon="labeled" size="tiny" compact text>
      <ComponentControlsShowCode active={showCode} onClick={onShowCode} />
      <ComponentControlsCodeSandbox
        exampleCode={exampleCode}
        exampleLanguage={exampleLanguage}
        exampleName={examplePath}
      />
      <ComponentControlsShowVariables active={showVariables} onClick={onShowVariables} />
      <ComponentControlsShowTransparent active={showTransparent} onClick={onShowTransparent} />
      <ComponentControlsRtl active={showRtl} onClick={onShowRtl} />
      <ComponentControlsMaximize examplePath={examplePath} />
      <ComponentControlsCopyLink anchorName={anchorName} onClick={onCopyLink} />
    </Menu>
  )
}

export default updateForKeys([
  'exampleCode',
  'examplePath',
  'showRtl',
  'showCode',
  'showTransparent',
  'showVariables',
  'visible',
])(ComponentControls)
