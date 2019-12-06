import * as React from 'react'
import {
  Table,
  Button,
  Provider,
  Flex,
  Avatar,
  Text,
  Dropdown,
  Checkbox,
  Icon,
} from '@fluentui/react'
import {
  gridNestedBehavior,
  gridCellWithFocusableElementBehavior,
  gridCellMultipleFocusableBehavior,
} from '@fluentui/accessibility'

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

const sortColumnHeader = (title, order, onOrderChange) => ({
  content: (
    <Flex gap="gap.small">
      <Text content={title} />
      {order !== 0 ? <Icon name={order === 1 ? 'arrow-up' : 'arrow-down'} /> : ''}
    </Flex>
  ),
  key: title,
  onClick: () => onOrderChange(order === 0 ? 1 : -order),
})

const headerMembers = {
  key: 'header',
  items: [
    { content: 'Name', key: 'name' },
    { content: 'Title', key: 'title' },
    { content: 'Location', key: 'location' },
    { content: 'Tags', key: 'tags' },
    { content: 'Role', key: 'role' },
  ],
}

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

const headerChannels = {
  key: 'header',
  items: [
    sortColumnHeader('Name', 1, order => alert(`Sort ${order}`)),
    sortColumnHeader('Show for me', 0, order => alert(`Sort ${order}`)),
    sortColumnHeader('Show for members', 0, order => alert(`Sort ${order}`)),
    sortColumnHeader('Description', 0, order => alert(`Sort ${order}`)),
    sortColumnHeader('Type', 0, order => alert(`Sort ${order}`)),
    sortColumnHeader('Last activity', 0, order => alert(`Sort ${order}`)),
    { 'aria-label': 'More options' },
  ],
}

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
    <Table
      variables={{ cellContentOverflow: 'none' }}
      header={headerMembers}
      rows={rowsMembers}
      aria-label="Channel members"
      accessibility={gridNestedBehavior}
    />
    <br />
    <Table
      variables={{ cellContentOverflow: 'none' }}
      header={headerChannels}
      rows={rowsChannels}
      aria-label="Channels"
      accessibility={gridNestedBehavior}
    />
  </>
)

export default StaticTable
