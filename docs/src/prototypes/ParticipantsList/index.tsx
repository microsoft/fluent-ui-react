import React from 'react'
import { List, Avatar, Flex, Text, MenuButton, Icon } from '@stardust-ui/react'
import { PrototypeSection, ComponentPrototype } from '../Prototypes'

const menu = ['Open', 'Remove from list']

const ActiveBarItem = props => (
  <Flex column hAlign="center" padding="padding.medium">
    <Avatar name={props.name} size="largest" />
    <Flex gap="gap.small">
      <Text content={props.name} />
      <MenuButton trigger={<Icon name="more" />} menu={menu} />
    </Flex>
  </Flex>
)

const addContextMenu = item => render =>
  render(item, (Component, props) => {
    return <MenuButton contextMenu trigger={<Component {...props} />} menu={menu} />
  })

const items3 = [
  {
    key: 'irving',
    content: <ActiveBarItem name="Irving Kuhic" />,
  },
  {
    key: 'skyler',
    content: <ActiveBarItem name="Skyler Parks" />,
  },
  {
    key: 'dante',
    content: <ActiveBarItem name="Dante Schneider" />,
  },
].map(addContextMenu)

const ParticipantsList = () => (
  <>
    <List navigable items={items3} horizontal />
  </>
)

const ParticipantsListPrototype: React.FC = () => {
  return (
    <PrototypeSection title="Participants list">
      <ComponentPrototype
        title="List with context menu"
        description="Context menu can be opened by clicking on the more button or by right mouse button"
      >
        <ParticipantsList />
      </ComponentPrototype>
    </PrototypeSection>
  )
}

export default ParticipantsListPrototype
