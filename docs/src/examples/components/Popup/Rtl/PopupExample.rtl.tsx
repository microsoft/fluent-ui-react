import * as React from 'react'
import { Button, Popup } from '@stardust-ui/react'

const PopupExampleRtl = () => (
  <Popup
    trigger={<Button content="ا يجلبه إلينا الأس" />}
    content={{
      content: (
        <p>
          ينا الألم. في بعض الأحيان ونظراً للالتزامات التي يفرضها علينا الواجب والعمل سنتنازل غالباً
          ونرفض الشعور
        </p>
      ),
    }}
  />
)

export default PopupExampleRtl
