import * as React from 'react'
import { Menu, toolbarBehavior, toolbarButtonBehavior } from '@stardust-ui/react'
import { NavLink } from 'react-router-dom'
import * as _ from 'lodash'

import { updateForKeys } from 'docs/src/hoc'
import ComponentButton from './ComponentButton'
import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
// import ComponentControlsCodeSandbox from './ComponentControlsCodeSandbox/ComponentControlsCodeSandbox'
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
    // exampleCode,
    // exampleLanguage,
    // examplePath,
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
          onClick: onMaximize,
          as: NavLink,
          // to: `/maximize/${_.kebabCase(examplePath.split('/').slice(-1))}`,
          target: '_blank',
          rel: 'noopener noreferrer',
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

/*ComponentControls.propTypes = {
  examplePath: PropTypes.string,
  anchorName: PropTypes.string,
  onCopyLink: PropTypes.func,
  onShowCode: PropTypes.func,
  onShowRtl: PropTypes.func,
  onShowTransparent: PropTypes.func,
  onShowVariables: PropTypes.func,
  onMaximize: PropTypes.func,
  showCode: PropTypes.bool,
  showRtl: PropTypes.bool,
  showTransparent: PropTypes.bool,
  showVariables: PropTypes.bool,
  visible: PropTypes.bool,
}*/

/*<Menu color="green" icon="labeled" size="tiny" compact text>
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
*/
export default updateForKeys([
  'exampleCode',
  'examplePath',
  'showRtl',
  'showCode',
  'showTransparent',
  'showVariables',
  'visible',
])(ComponentControls, ComponentButton)
