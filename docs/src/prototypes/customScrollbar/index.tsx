import * as React from 'react'
import * as _ from 'lodash'
import Scrollbars from 'react-custom-scrollbars'
import {
  Text,
  Menu,
  List,
  Button,
  Popup,
  Dialog,
  ShorthandValue,
  MenuProps,
} from '@stardust-ui/react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'

const submenuWithScrollbars = (menu: MenuItemProps['menu'], height: string) => {
  return render => render(shorthand, (Component, props) => <Component {...props} as={Scrollbars} style={{ height }} />)
}

const ScrollbarMenuPrototype = () => {
  const items = [
    {
      key: 'with-scrollbar',
      content: 'Submenu with scrollbar',
      menu: submenuWithScrollbars(
        { items: _.range(50).map((i: number) => `Menu Item No. ${i}`) },
        '20rem',
      ),
    },
    {
      key: 'without-scrollbar',
      content: 'Submenu without scrollbar',
      menu: _.range(5).map((i: number) => `Menu Item No. ${i}`),
    },
  ]

  return <Menu items={items} />
}

// const ScrollbarMenuVerticalPrototype = () => {
//   const items = [
//     {
//       key: 'with-scrollbar',
//       content: 'Submenu with scrollbar',
//       menu: {
//         items: _.range(50).map((i: number) => `Menu Item No. ${i}`),
//       },
//     },
//     {
//       key: 'without-scrollbar',
//       content: 'Submenu without scrollbar',
//       menu: _.range(5).map((i: number) => `Menu Item No. ${i}`),
//     },
//   ].concat(_.range(50).map((i: number) => `Menu Item No. ${i}`) as any)

//   return (
//     <Menu
//       as={props => <Menu {...props} as={Scrollbars} style={{ width: '20rem', height: '20rem' }} />}
//       vertical
//       items={items}
//     />
//   )
// }

const ScrollbarPopupPrototype = () => {
  const lines = _.times(50, i => <p key={i}>Long long text line {i}</p>)

  return (
    <Popup
      trigger={<Button content="Open popup" />}
      content={{
        // NOTE: because scrollbars uses an abs positioned container to fake scroll
        //       the consumer must specify a width/height value to show the scrollable area
        styles: { width: '20rem' },
        content: <Scrollbars style={{ height: '20rem' }}>{lines}</Scrollbars>,
      }}
    />
  )
}

const ScrollbarDialogPrototype = () => {
  const lines = _.times(50, i =><p key={i}>Long long text line {i}</p>)

  return (
    <Dialog
      trigger={<Button content="Open popup" />}
      header="Dialog with scrollbar"
      cancelButton="Close"
      content={{
        styles: { width: '100%' },
        content: <Scrollbars style={{ height: '20rem' }}>{lines}</Scrollbars>,
      }}
    />
  )
}

const ScrollbarListPrototype = () => {
  const items = _.range(50).map((i: number) => ({
    header: `Header ${i}`,
    content: `Content ${i}`,
    key: `item-${i}`,
  }))

  return (
    <Scrollbars style={{ height: '20rem' }}>
      <List selectable items={items} />
    </Scrollbars>
  )
}

// const ScrollbarDropdownPrototype = () => {
//   const items = _.range(50).map((i: number) => ({
//     header: `Header ${i}`,
//     content: `Content ${i}`,
//     key: `item-${i}`,
//   }))

//   return <Dropdown open items={items} />
// }

const CustomScrollbarPrototypes: React.FC = () => {
  return (
    <PrototypeSection title="Custom Scrollbar">
      <Text>
        Note: Stardust does not provide custom scrollbars. It is possible to integrate Stardust
        components with any custom scrollbars framework.
      </Text>
      {/* <ComponentPrototype title="Dropdown" description="Scrollbar can be integrated in a Dropdown">
        <ScrollbarDropdownPrototype />
      </ComponentPrototype> */}
      <ComponentPrototype title="Menu" description="Scrollbar can be integrated in Menu">
        <ScrollbarMenuPrototype />
      </ComponentPrototype>
      {/* <ComponentPrototype title="Menu Vertical" description="Scrollbar can be integrated in Menu">
        <ScrollbarMenuVerticalPrototype />
      </ComponentPrototype> */}
      <ComponentPrototype title="Popup" description="Scrollbar can be integrated in Popup content">
        <ScrollbarPopupPrototype />
      </ComponentPrototype>
      <ComponentPrototype
        title="Dialog"
        description="Scrollbar can be integrated in Dialog content"
      >
        <ScrollbarDialogPrototype />
      </ComponentPrototype>
      <ComponentPrototype title="List" description="Scrollbar can be integrated in selectable List">
        <ScrollbarListPrototype />
      </ComponentPrototype>
    </PrototypeSection>
  )
}

export default CustomScrollbarPrototypes
