import * as React from 'react'
import * as _ from 'lodash'
import { Dropdown } from '@stardust-ui/react'

import { MentionsContainerProps } from './MentionsEditor'

const MentionsDropdown: React.FunctionComponent<MentionsContainerProps> = props => {
  const { searchQuery, items, onOpenChange, onSearchQueryChange, onInputKeyDown } = props

  return (
    <Dropdown
      defaultOpen={true}
      inline
      search
      items={items}
      toggleIndicator={null}
      searchInput={{
        input: { autoFocus: true, size: searchQuery.length + 1 },
        onInputKeyDown,
      }}
      onOpenChange={onOpenChange}
      onSearchQueryChange={onSearchQueryChange}
      noResultsMessage="We couldn't find any matches."
    />
  )
}

export default MentionsDropdown
