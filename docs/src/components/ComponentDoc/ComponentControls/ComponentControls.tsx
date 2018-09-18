import PropTypes from 'prop-types'
import * as React from 'react'
import { Menu } from '@stardust-ui/react'

import { updateForKeys } from 'docs/src/hoc'
import ComponentControlsShowCode from './ComponentControlsShowCode'
import ComponentControlsCopyLink from './ComponentControlsCopyLink'
import ComponentControlsShowVariables from './ComponentControlsShowVariables'
import ComponentControlsMaximize from './ComponentControlsMaximize'
import ComponentControlsRtl from './ComponentControlsRtl'

const ComponentControls: any = props => {
  const {
    anchorName,
    examplePath,
    showCode,
    showRtl,
    showVariables,
    onCopyLink,
    onShowCode,
    onShowRtl,
    onShowVariables,
    onMaximize,
  } = props

  return (
    <Menu fluid color="green" icon="labeled" size="tiny" pills>
      <ComponentControlsShowCode active={showCode} onClick={onShowCode} />
      <ComponentControlsShowVariables active={showVariables} onClick={onShowVariables} />
      <ComponentControlsRtl active={showRtl} onClick={onShowRtl} />
      <ComponentControlsMaximize examplePath={examplePath} onClick={onMaximize} />
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
  onMaximize: PropTypes.func,
  showCode: PropTypes.bool,
  showRtl: PropTypes.bool,
  showVariables: PropTypes.bool,
  visible: PropTypes.bool,
}

export default updateForKeys(['examplePath', 'showRtl', 'showCode', 'showVariables', 'visible'])(
  ComponentControls,
)
