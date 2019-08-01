import * as React from 'react'
import { Button, MenuButton } from '@stardust-ui/react'

const ContextMenuExampleRtl = () => (
  <MenuButton
    trigger={<Button content="ا يجلبه إلينا الأس" />}
    menu={{ items: ['English text!', 'غالباً ونرفض الشعور'] }}
  />
)

export default ContextMenuExampleRtl
