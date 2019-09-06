import { useNumberKnob } from '@stardust-ui/docs-components'
import { SplitButton } from '@stardust-ui/react'
import * as React from 'react'

const items = [
  { key: 'group', content: 'New group message' },
  { key: 'channel', content: 'New channel message' },
  { key: 'conversation', content: 'New conversation' },
]

const SplitButtonExampleMenuShorthand = () => {
  const [activeIndex, setActiveIndex] = useNumberKnob({ name: 'activeIndex' })
  const activeItem = items[activeIndex]

  return (
    <SplitButton
      button={activeItem}
      menu={{
        activeIndex,
        items,
      }}
      onMenuItemClick={(e, { index }) => setActiveIndex(index)}
    />
  )
}

export default SplitButtonExampleMenuShorthand
