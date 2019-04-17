import * as React from 'react'
import * as _ from 'lodash'
import { Dropdown, DropdownItemProps, Provider } from '@stardust-ui/react'

import { MentionsContainerProps } from './MentionsEditor'

const MentionsDropdown: React.FunctionComponent<MentionsContainerProps> = props => {
  const { searchQuery, items, onOpenChange, onSearchQueryChange, onInputKeyDown } = props

  const renderItem = React.useCallback(
    (Item: React.ReactType, props: DropdownItemProps, boldFont: number) => {
      const { header = '', ...rest } = props
      const headerStr = String(header)
      const queryStartIndex = headerStr.indexOf(searchQuery)

      if (queryStartIndex < 0) return <Item {...props} />
      const queryEndIndex = queryStartIndex + searchQuery.length

      return (
        <Item
          {...rest}
          header={{
            content: (
              <span>
                {headerStr.substring(0, queryStartIndex)}
                <span style={{ fontWeight: boldFont }}>
                  {headerStr.substring(queryStartIndex, queryEndIndex)}
                </span>
                {headerStr.substring(queryEndIndex)}
              </span>
            ),
          }}
        />
      )
    },
    [searchQuery],
  )

  return (
    <Provider.Consumer
      render={({ siteVariables }) => (
        <Dropdown
          defaultOpen={true}
          inline
          search
          items={items}
          renderItem={
            searchQuery
              ? (Item, props) => renderItem(Item, props, siteVariables.fontWeightBold)
              : undefined
          }
          toggleIndicator={null}
          searchInput={{
            input: { autoFocus: true, size: searchQuery.length + 1 },
            onInputKeyDown,
          }}
          onOpenChange={onOpenChange}
          onSearchQueryChange={onSearchQueryChange}
          noResultsMessage="We couldn't find any matches."
        />
      )}
    />
  )
}

export default MentionsDropdown
