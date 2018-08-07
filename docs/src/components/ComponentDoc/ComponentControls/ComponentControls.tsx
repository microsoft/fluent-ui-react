import PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from 'semantic-ui-react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsShowCode from './ComponentControlsShowCode'
import ComponentControlsCopyLink from './ComponentControlsCopyLink'
import ComponentControlsShowVariables from './ComponentControlsShowVariables'
import ComponentControlsMaximize from './ComponentControlsMaximize'
import ComponentControlsRtl from './ComponentControlsRtl'
import ComponentControlsRunAccValidator from './ComponentControlsAccValidator'

const ComponentControls: any = props => {
  const {
    anchorName,
    examplePath,
    showCode,
    showRtl,
    showVariables,
    runAccValidator,
    onCopyLink,
    onShowCode,
    onShowRtl,
    onShowVariables,
    onRunAccValidator,
  } = props

  return (
    <Menu color="green" icon="labeled" size="tiny" fitted compact text>
      <ComponentControlsShowCode active={showCode} onClick={onShowCode} />
      <ComponentControlsShowVariables active={showVariables} onClick={onShowVariables} />
      <ComponentControlsRunAccValidator active={runAccValidator} onClick={onRunAccValidator} />
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
  onShowVariables: PropTypes.func,
  onRunAccValidator: PropTypes.func,
  runAccValidator: PropTypes.bool,
  showCode: PropTypes.bool,
  showRtl: PropTypes.bool,
  showVariables: PropTypes.bool,
  visible: PropTypes.bool,
}

export default updateForKeys([
  'showRtl',
  'showCode',
  'showVariables',
  'runAccValidator',
  'visible',
])(ComponentControls)
