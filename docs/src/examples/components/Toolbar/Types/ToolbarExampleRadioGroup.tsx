import * as React from 'react'
import { Toolbar } from '@stardust-ui/react'

const ToolbarExamplePopupShorthand = () => {
  const [bulletListActive, setBulletListActive] = React.useState(false)
  const [numberListActive, setNumberListActive] = React.useState(false)
  const [toDoListActive, setToDoListActive] = React.useState(false)
  return (
    <Toolbar
      items={[
        {
          key: 'radiogroup',
          kind: 'group',
          items: [
            {
              key: 'bullets',
              icon: { name: 'bullets', outline: true },
              active: bulletListActive,
              onClick: () => {
                setBulletListActive(!bulletListActive)

                // deselect other radio items
                setNumberListActive(false)
                setToDoListActive(false)
              },
            },
            {
              key: 'number-list',
              icon: { name: 'number-list', outline: true },
              active: numberListActive,
              onClick: () => {
                setNumberListActive(!numberListActive)

                // deselect other radio items
                setBulletListActive(false)
                setToDoListActive(false)
              },
            },
            {
              key: 'to-do-list',
              icon: { name: 'to-do-list', outline: true },
              active: toDoListActive,
              onClick: () => {
                setToDoListActive(!toDoListActive)

                // deselect other radio items
                setBulletListActive(false)
                setNumberListActive(false)
              },
            },
          ],
        },
      ]}
    />
  )
}

export default ToolbarExamplePopupShorthand
