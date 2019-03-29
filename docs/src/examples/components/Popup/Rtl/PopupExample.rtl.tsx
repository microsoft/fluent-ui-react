import * as React from 'react'
import { Button, Popup, Text } from '@stardust-ui/react'

const PopupExampleRtl = () => (
  <Popup
    trigger={<Button content="ا يجلبه إلينا الأس" />}
    content={{
      content: (
        <>
          <Text as="div">English text!</Text>
          <Text as="div">
            ينا الألم. في بعض الأحيان ونظراً للالتزامات التي يفرضها علينا الواجب والعمل سنتنازل
            غالباً ونرفض الشعور
          </Text>
        </>
      ),
    }}
  />
)

export default PopupExampleRtl
