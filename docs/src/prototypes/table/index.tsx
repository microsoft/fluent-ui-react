import {
  gridCellMultipleFocusableBehavior,
  gridCellWithFocusableElementBehavior,
} from '@fluentui/accessibility'
import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  Flex,
  Icon,
  Menu,
  MenuButton,
  Text,
} from '@fluentui/react'
import * as React from 'react'
import chatProtoStyle from '.././chatPane/chatProtoStyle'
import { ComponentPrototype, PrototypeSection } from '../Prototypes'
import AdvancedTable, { stringCellComparator } from './AdvancedTable'
import InteractiveTable from './InteractiveTable'

function handleRowClick(index) {
  alert(`OnClick on the row ${index} executed.`)
}

const roleDropdown = {
  content: <Dropdown inline items={['Owner', 'Member']} defaultValue={'Owner'} />,
  truncateContent: false,
  key: '1-6',
  accessibility: gridCellMultipleFocusableBehavior,
  onClick: e => e.stopPropagation(),
}

const tagButtons = {
  content: (
    <Flex gap="gap.small" vAlign="center">
      <Menu
        variables={{ horizontalPadding: '0.5rem 0.5rem' }}
        items={['tag 1', 'tag 2']}
        data-is-focusable={true}
      />
    </Flex>
  ),
  key: '1-5',
  accessibility: gridCellMultipleFocusableBehavior,
}

const columnsMembers = [
  { title: 'Name', key: 'name', name: 'name' },
  { title: 'Title', key: 'title', name: 'title', cellComparator: stringCellComparator },
  { title: 'Location', key: 'location', name: 'location', cellComparator: stringCellComparator },
  { title: 'Tags', key: 'tags', name: 'tags' },
  { title: 'Role', key: 'role', name: 'roles' },
]

const rowsMembers = [
  {
    key: 1,
    items: [
      {
        content: (
          <Flex gap="gap.medium" vAlign="center">
            <Avatar name="John Doe (Software Developer)" status="available" />
            <Text>John Doe</Text>
          </Flex>
        ),
        key: '1-2',
      },
      { content: 'SOFTWARE DEVELOPER', key: '1-3' },
      { content: 'PRAGUE', key: '1-4' },
      tagButtons,
      roleDropdown,
    ],
    onClick: () => handleRowClick(1),
  },
  {
    key: 2,
    items: [
      {
        content: (
          <Flex gap="gap.medium" vAlign="center">
            <Avatar name="John Smith" status="available" />
            <Text>John Smith</Text>
          </Flex>
        ),
        key: '2-2',
      },
      { content: 'PROGRAM MANAGER', key: '2-3' },
      { content: 'PRAGUE', key: '2-4' },
      tagButtons,
      roleDropdown,
    ],
    onClick: () => handleRowClick(2),
  },
  {
    key: 3,
    items: [
      {
        content: (
          <Flex gap="gap.medium" vAlign="center">
            <Avatar name="Bruce Wayne" status="available" />
            <Text>Bruce Wayne</Text>
          </Flex>
        ),
        key: '3-1',
      },
      { content: 'BATMAN', key: '3-3' },
      { content: 'GOTHAM CITY', key: '3-4' },
      {},
      roleDropdown,
    ],
    onClick: () => handleRowClick(3),
  },
]

const menuButton = (
  <MenuButton
    trigger={<Button tabIndex={-1} icon="more" circular text iconOnly title="More options" />}
    menu={[
      '1',
      '2',
      '3',
      {
        content: 'submenu',
        menu: {
          items: ['4', '5'],
        },
      },
    ]}
    on="click"
  />
)

const moreOptionButton = {
  content: menuButton,
  truncateContent: true,
  key: '1-6',
  accessibility: gridCellWithFocusableElementBehavior,
}

const columnsChannels = [
  { key: 'Name', name: 'Name', title: 'Name' },
  { key: 'show-for-me', name: 'show-for-me', title: 'Show for me' },
  { key: 'show-for-members', name: 'show-for-members', title: 'Show for members' },
  {
    key: 'Description',
    name: 'Description',
    title: 'Description',
    cellComparator: stringCellComparator,
  },
  { key: 'Type', name: 'Type', title: 'Type', cellComparator: stringCellComparator },
  { key: 'Last activity', name: 'Last activity', title: 'Last activity' },
  { key: 'more-options', name: 'more-options', title: 'More options' },
]

const rowsChannels = [
  {
    key: 1,
    items: [
      { content: 'General', key: '1' },
      {
        content: <Checkbox title="Show for me" />,
        accessibility: gridCellWithFocusableElementBehavior,
        key: '2',
      },
      {
        content: <Checkbox title="Show for members" />,
        accessibility: gridCellWithFocusableElementBehavior,
        key: '3',
      },
      { content: 'Some description', key: '5' },
      { content: <Icon name="bookmark" title="Random icon" />, key: '6' },
      { content: 'yesterday', key: '7' },
      moreOptionButton,
    ],
  },
]

export default () => (
  <PrototypeSection title="Advanced table">
    <ComponentPrototype
      title="Table example 1"
      description="Table with sorting, tags and dropdown menu in a cell"
    >
      <AdvancedTable columns={columnsMembers} rows={rowsMembers} label="Channel members" />
    </ComponentPrototype>
    <ComponentPrototype
      title="Table example 2"
      description="Table with menu, checkboxes and Aria anouncements"
    >
      <AdvancedTable columns={columnsChannels} rows={rowsChannels} label="Channels" />
      <div
        id="ariaLive"
        aria-live="polite"
        aria-atomic="true"
        style={chatProtoStyle.screenReaderContainerStyles}
      />
    </ComponentPrototype>
    <ComponentPrototype title="Table example 3" description="Table with popover and context menu ">
      <InteractiveTable />
    </ComponentPrototype>
  </PrototypeSection>
)
