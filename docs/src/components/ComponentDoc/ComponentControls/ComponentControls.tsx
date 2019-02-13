import * as React from 'react'
import { Menu, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'
import { NavLink } from 'react-router-dom'
import * as _ from 'lodash'

import { updateForKeys } from 'docs/src/hoc'
import ComponentButton from './ComponentButton'
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
  onMaximize: () => void
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
    onMaximize,
  } = props

  return (
    <Menu
      fluid
      color="green"
      icon="labeled"
      size="tiny"
      pills
      accessibility={toolbarBehavior}
      items={[
        {
          key: 'show-code',
          content: <ComponentControlsShowCode active={showCode} />,
          onClick: onShowCode,
          accessibility: toolbarButtonBehavior,
        },
        {
          key: 'show-codesandbox',
          content: (
            <ComponentControlsCodeSandbox
              exampleCode={exampleCode}
              exampleLanguage={exampleLanguage}
              exampleName={examplePath}
            />
          ),
          accessibility: toolbarButtonBehavior,
        },
        {
          key: 'show-variables',
          content: <ComponentControlsShowVariables active={showVariables} />,
          onClick: onShowVariables,
          accessibility: toolbarButtonBehavior,
        },
        {
          key: 'show-transparent',
          content: <ComponentControlsShowTransparent active={showTransparent} />,
          onClick: onShowTransparent,
          accessibility: toolbarButtonBehavior,
        },
        {
          key: 'show-rtl',
          content: <ComponentControlsRtl active={showRtl} />,
          onClick: onShowRtl,
          accessibility: toolbarButtonBehavior,
        },
        {
          key: 'maximize',
          content: <ComponentControlsMaximize />,
          as: NavLink,
          to: `/maximize/${_.kebabCase(examplePath.split('/').slice(-1))}/${showRtl}`,
          target: '_blank',
          rel: 'noopener noreferrer',
          onClick: onMaximize,
          accessibility: toolbarButtonBehavior,
        },
        {
          key: 'copy-link',
          content: <ComponentControlsCopyLink anchorName={anchorName} />,
          onClick: onCopyLink,
          accessibility: toolbarButtonBehavior,
        },
      ]}
    />
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
])(ComponentControls, ComponentButton)
