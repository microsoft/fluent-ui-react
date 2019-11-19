import * as React from 'react'
import { Menu, Provider } from '@stardust-ui/react'

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
    key: 'events',
    content: 'Upcoming Events',
  },
]

const itemsSubmenu = [
  {
    key: 'editorials',
    content: 'Editorials',
    icon: {
      name: 'bookmark',
      outline: true,
    },
  },
  {
    key: 'review',
    content: 'Reviews',
    icon: {
      name: 'word',
    },
  },
  {
    key: 'events',
    content: 'Upcoming Events',
  },
  {
    key: 'moreevents',
    content: 'View full calendar with content so long that it wraps',
    icon: {
      name: 'calendar',
    },
    menu: {
      items: [
        {
          key: '1',
          content: 'item1',
        },
        {
          key: '2',
          content: 'item2',
        },
        {
          key: '3',
          content: 'item3',
        },
      ],
    },
  },
]

const MenuExampleSubmenu = () => <Menu defaultActiveIndex={0} items={itemsSubmenu} vertical />

const MenuInstance = props => <Menu defaultActiveIndex={0} items={items} {...props} />

const MenuExample = ({ prefix = '' }) => (
  <Provider theme={{ name: prefix }}>
    <MenuExampleSubmenu />
    <MenuInstance
      styles={{
        border: '3px solid red',
      }}
    />
    <MenuInstance
      variables={{
        backgroundColor: 'salmon',
      }}
    />
    <Provider
      theme={{
        name: `${prefix}custom`,
        componentSelectorStyles: {
          Menu: () => ({}),
          MenuDivider: () => ({}),
          MenuItemWrapper: () => ({}),
          MenuItem: v => ({
            root: [
              [
                null,
                {
                  border: '3px solid blue',
                },
              ],
            ],
          }),
        },
      }}
    >
      <MenuExampleSubmenu />
      <MenuInstance />
      <Provider
        theme={{
          name: `${prefix}custom5`,
          componentSelectorStyles: {
            Menu: () => ({}),
            MenuDivider: () => ({}),
            MenuItemWrapper: () => ({}),
            MenuItem: v => ({
              root: [
                [
                  null,
                  {
                    border: '1px solid green',
                  },
                ],
              ],
            }),
          },
        }}
      >
        <MenuInstance />
      </Provider>
    </Provider>

    <Provider
      theme={{
        name: `${prefix}custom2`,
        componentVariables: {
          Menu: {
            backgroundColor: 'pink',
          },
        },
      }}
    >
      <MenuInstance />
    </Provider>
  </Provider>
)

const Test = () => (
  <>
    <MenuExample />
    <p>RTL</p>
    <Provider rtl>
      <MenuExample prefix="rtl-" />
    </Provider>
  </>
)

export default Test
