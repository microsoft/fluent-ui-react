import { useBooleanKnob } from '@stardust-ui/docs-components'
import { Menu } from '@stardust-ui/react'
import * as React from 'react'

import useAccessibilityKnob from 'docs/src/components/ComponentDoc/useAccessibilityKnob'

const MenuPlayground: React.FunctionComponent = () => {
  const accessibility = useAccessibilityKnob('Menu')
  const [pointing] = useBooleanKnob({ name: 'pointing' })
  const [primary] = useBooleanKnob({ name: 'primary' })
  const [vertical] = useBooleanKnob({ name: 'vertical' })

  return (
    <Menu
      accessibility={accessibility}
      items={['Profile', 'My account', 'Logout']}
      pointing={pointing}
      primary={primary}
      vertical={vertical}
    />
  )
}

export default MenuPlayground
