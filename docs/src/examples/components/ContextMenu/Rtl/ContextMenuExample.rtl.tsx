import * as React from 'react'
import { Button, ContextMenu } from '@stardust-ui/react'

const ContextMenuExampleRtl = () => (
  <ContextMenu
    trigger={<Button content="ا يجلبه إلينا الأس" />}
    menu={{ items: ['English text!', 'غالباً ونرفض الشعور'] }}
  />
)

export default ContextMenuExampleRtl
