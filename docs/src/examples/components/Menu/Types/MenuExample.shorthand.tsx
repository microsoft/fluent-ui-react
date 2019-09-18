import * as React from 'react'
import { Menu } from '@stardust-ui/react'

const MyComponent = p => <strong {...p} />

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
  },
  {
    key: 'review',
    content: 'Reviews',
  },
  {
    wrapper: { as: 'li', design: { padding: '20px', background: 'red' } },
    key: 'events',
    content: resolve => {
      return resolve('wrapped content', (C, p) => {
        return (
          <MyComponent>
            <C {...p} />
          </MyComponent>
        )
      })
    },
    styles: { background: 'pink' },
  },
]

const MenuExample = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExample
