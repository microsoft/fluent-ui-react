import * as React from 'react'
import * as _ from 'lodash'
import { Popup, Input, List, Image, ListItemProps, ListProps } from '@stardust-ui/react'

import { AtMentionItem } from './dataMocks'
import { MentionsContainerProps } from './MentionsEditor'

const MentionsPopup: React.FunctionComponent<MentionsContainerProps> = props => {
  const { open, searchQuery, items, onInputKeyDown } = props

  const handleInputChange = (e: React.SyntheticEvent, { value }: { value: string | number }) =>
    _.invoke(props, 'onSearchQueryChange', e, { searchQuery: value })

  const handleListItemClick = (e: React.SyntheticEvent, { header }: ListItemProps) => {
    _.invoke(props, 'onSelectedChange', e, { searchQuery: header })
  }

  const filteredItems = React.useMemo(
    () =>
      items
        .filter(item => doesItemMatchQuery(item, searchQuery))
        .map(({ header, image, content }, index) => ({
          key: `item-${index}`,
          header,
          content,
          media: <Image src={image} avatar />,
          onClick: handleListItemClick,
        })),
    [items, searchQuery],
  )

  return (
    <Popup
      open={open}
      trigger={
        <Input
          autoFocus
          size={searchQuery.length + 1}
          onChange={handleInputChange}
          styles={inputWrapperStyles}
          input={{
            value: searchQuery,
            onKeyDown: onInputKeyDown,
            styles: inputStyles,
          }}
        />
      }
      renderContent={updatePosition => (
        <UpdatableList
          updatePosition={updatePosition}
          selectable
          items={filteredItems}
          styles={listStyles}
        />
      )}
    />
  )
}

export default MentionsPopup

const UpdatableList: React.FunctionComponent<ListProps & { updatePosition: Function }> = ({
  updatePosition,
  ...props
}) => {
  React.useEffect(() => updatePosition && updatePosition(), [props.items.length])
  return <List {...props} />
}

const doesItemMatchQuery = (item: AtMentionItem, query: string) =>
  `${item.header} > ${item.content}`.toLowerCase().indexOf(query.toLowerCase()) !== -1

const inputStyles: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  borderWidth: 0,
  padding: 0,
  lineHeight: 'initial',
}

const inputWrapperStyles: React.CSSProperties = {
  flexBasis: '50px',
  flexGrow: 1,
}

const listStyles: React.CSSProperties = { maxHeight: '20rem', overflowY: 'auto' }
