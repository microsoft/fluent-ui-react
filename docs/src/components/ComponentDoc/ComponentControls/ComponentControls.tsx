import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsShowCode from './ComponentControlsShowCode'
import ComponentControlsCopyLink from './ComponentControlsCopyLink'
import ComponentControlsShowVariables from './ComponentControlsShowVariables'
import ComponentControlsMaximize from './ComponentControlsMaximize'
import ComponentControlsShowTransparent from './ComponentControlsShowTransparent'
import ComponentControlsRtl from './ComponentControlsRtl'

const ComponentControls: any = props => {
  const {
    anchorName,
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
      <ComponentControlsShowVariables active={showVariables} onClick={onShowVariables} />
      <ComponentControlsShowTransparent active={showTransparent} onClick={onShowTransparent} />
      <ComponentControlsRtl active={showRtl} onClick={onShowRtl} />
      <ComponentControlsMaximize examplePath={examplePath} />
      <ComponentControlsCopyLink anchorName={anchorName} onClick={onCopyLink} />
    </Menu>
  )
}

ComponentControls.propTypes = {
  examplePath: PropTypes.string,
  anchorName: PropTypes.string,
  onCopyLink: PropTypes.func,
  onShowCode: PropTypes.func,
  onShowRtl: PropTypes.func,
  onShowTransparent: PropTypes.func,
  onShowVariables: PropTypes.func,
  showCode: PropTypes.bool,
  showRtl: PropTypes.bool,
  showTransparent: PropTypes.bool,
  showVariables: PropTypes.bool,
  visible: PropTypes.bool,
}

export default updateForKeys([
  'examplePath',
  'showRtl',
  'showCode',
  'showTransparent',
  'showVariables',
  'visible',
])(ComponentControls)
