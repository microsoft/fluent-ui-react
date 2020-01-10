import { Button } from '@fluentui/react'

const selectors = {
  triggerButton: `.${Button.className}[title*="Open popup"]`,
  closeButton: `.${Button.className}[title*="Close"]`,
}

const config: ScreenerTestsConfig = {
  steps: [
    builder =>
      builder
        .click(selectors.triggerButton)
        .snapshot('Click on the trigger (opens popup)')
        .click(selectors.closeButton)
        .snapshot('Click on close button (closes popup)'),
  ],
}

export default config
