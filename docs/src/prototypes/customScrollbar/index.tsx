import * as React from 'react'
import * as _ from 'lodash'
import Scrollbars from 'react-custom-scrollbars'
import { Text, Menu, List, Button, Popup, Dialog } from '@stardust-ui/react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'

const ScrollbarMenuPrototype = () => {
  const items = [
    {
      key: 'with-scrollbar',
      content: 'Submenu with scrollbar',
      menu: render =>
        render(
          {
            items: _.range(50).map((i: number) => `Menu Item No. ${i}`),
          },
          (ComponentType, componentProps) => {
            const { style, ...rest } = componentProps
            return (
              <Scrollbars style={{ ...style, height: '20rem' }}>
                <ComponentType {...rest} />
              </Scrollbars>
            )
          },
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

const ScrollbarPopupPrototype = () => {
  const lines = _.range(50).map((i: number) => <p key={i}>Long long text line {i}</p>)

  return (
    <Popup
      unstable_pinned
      trigger={<Button content="Open popup" />}
      content={
        <Scrollbars style={{ height: '20rem' }}>
          <div style={{ width: '20rem' }}>{lines}</div>
        </Scrollbars>
      }
    />
  )
}

const ScrollbarDialogPrototype = () => {
  const lines = _.range(50).map((i: number) => <p key={i}>Long long text line {i}</p>)

  return (
    <Dialog
      trigger={<Button content="Open popup" />}
      header="Dialog with scrollbar"
      cancelButton="Close"
      content={
        <Scrollbars style={{ height: '20rem' }}>
          <div style={{ width: '20rem' }}>{lines}</div>
        </Scrollbars>
      }
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

const CustomScrollbarPrototypes: React.FC = () => {
  return (
    <PrototypeSection title="Custom Scrollbar">
      <Text>
        Note: Stardust does not provide custom scrollbars. It is possible to integrate Stardust
        components with any custom scrollbars framework.
      </Text>
      <ComponentPrototype title="Menu" description="Scrollbar can be integrated in Menu">
        <ScrollbarMenuPrototype />
      </ComponentPrototype>
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
