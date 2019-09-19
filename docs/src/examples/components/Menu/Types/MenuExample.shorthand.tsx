import React from 'react'
import { Menu, Icon } from '@stardust-ui/react'

const MyComponent = p => <strong {...p} />

const items = [
  {
    key: 'editorials',
    content: 'Editorials',
  },
  {
    key: 'review',
    content: () => <p>Reviews</p>,
  },
  {
    wrapper: {
      as: 'li',
      design: {
        padding: '20px',
        background: 'red',
      },
    },
    key: 'events',
    content: resolve => {
      return resolve('wrapped content', (C, p) => {
        return (
          <MyComponent>
            <C {...p}>
              <Icon name="user" />
              {p.children}
            </C>
          </MyComponent>
        )
      })
    },
    styles: {
      background: 'pink',
    },
  },
]

const MenuExample = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExample
