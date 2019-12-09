import * as React from 'react'
import { Button, Provider, Flex, Avatar, Text, Dropdown, Checkbox, Icon } from '@fluentui/react'
import {
  gridCellWithFocusableElementBehavior,
  gridCellMultipleFocusableBehavior,
} from '@fluentui/accessibility'

import AdvancedTable, { stringCellComparator } from './AdvancedTable'

function tagButton(tagName: string) {
  return (
    <Provider
      theme={{
        componentVariables: {
          Button: siteVars => ({
            color: siteVars.colorScheme.brand.foreground,
            colorHover: siteVars.colorScheme.brand.foreground,
            colorFocus: siteVars.colorScheme.default.foreground,
            colorDisabled: siteVars.colorScheme.brandForegroundDisabled,
            backgroundColor: siteVars.colorScheme.default.background,
            backgroundColorActive: siteVars.colorScheme.brandBorderPressed,
            backgroundColorHover: siteVars.colorScheme.brand.backgroundHover1,
            backgroundColorFocus: siteVars.colorScheme.default.background,
            backgroundColorDisabled: siteVars.colorScheme.brand.backgroundDisabled,
            borderColor: siteVars.colorScheme.brandBorder2,
            borderColorHover: siteVars.colorScheme.brandBorderHover,
          }),
        },
      }}
    >
      <Button size="small" content={tagName} />
    </Provider>
  )
}

function handleRowClick(index) {
  alert(`OnClick on the row ${index} executed.`)
}

const roleDropdown = {
  content: <Dropdown inline items={['Owner', 'Member']} value="Owner" />,
  truncateContent: false,
  key: '1-6',
  accessibility: gridCellWithFocusableElementBehavior,
  onClick: e => e.stopPropagation(),
}

const tagButtons = {
  content: (
    <Flex gap="gap.small" vAlign="center">
      {tagButton('tag 1')}
      {tagButton('tag 2')}
      {/* table layout not support now more content in the cell */}
      {/* <Button tabIndex={-1} icon="edit" circular text iconOnly title="edit tags" /> */}
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

const moreOptionButton = {
  content: <Button tabIndex={-1} icon="more" circular text iconOnly title="More options" />,
  truncateContent: true,
  key: '1-6',
  accessibility: gridCellWithFocusableElementBehavior,
  onClick: e => {
    alert('more option button clicked')
    e.stopPropagation()
  },
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

const StaticTable = () => (
  <>
    <AdvancedTable columns={columnsMembers} rows={rowsMembers} label="Channel members" />
    <br />
    <AdvancedTable columns={columnsChannels} rows={rowsChannels} label="Channels" />
  </>
)

export default StaticTable
