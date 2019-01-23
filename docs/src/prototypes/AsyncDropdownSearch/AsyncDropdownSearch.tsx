import { Divider, Dropdown, DropdownProps, Header, Loader, Segment } from '@stardust-ui/react'
import * as faker from 'faker'
import * as _ from 'lodash'
import * as React from 'react'

import CodeSnippet from '../../components/CodeSnippet'

// ----------------------------------------
// Types
// ----------------------------------------
type Entry = {
  header: string
  image: string
  content: string
}

interface SearchPageState {
  loading: boolean
  items: Entry[]
  searchQuery: string
  value: Entry[]
}

// ----------------------------------------
// Mock Data
// ----------------------------------------
const createEntry = (): Entry => ({
  image: faker.internet.avatar(),
  header: `${faker.name.firstName()} ${faker.name.lastName()}`,
  content: faker.commerce.department(),
})

// ----------------------------------------
// Prototype Search Page View
// ----------------------------------------
class AsyncDropdownSearch extends React.Component<{}, SearchPageState> {
  state = {
    loading: false,
    searchQuery: '',
    items: [],
    value: [],
  }

  searchTimer: number

  handleSelectedChange = (e: React.SyntheticEvent, { searchQuery, value }: DropdownProps) => {
    this.setState({ value: value as Entry[], searchQuery })
  }

  handleSearchQueryChange = (e: React.SyntheticEvent, { searchQuery }: DropdownProps) => {
    this.setState({ searchQuery })
    this.fetchItems()
  }

  fetchItems = () => {
    clearTimeout(this.searchTimer)
    this.setState({ loading: true })

    this.searchTimer = setTimeout(() => {
      this.setState(prevState => ({
        loading: false,
        items: [...prevState.items, ..._.times<Entry>(10, createEntry)],
      }))
    }, 2000)
  }

  render() {
    const { items, loading, searchQuery, value } = this.state

    return (
      <div style={{ margin: 20 }}>
        <Segment>
          <Header content="Async Dropdown Search" />
          <p>Use the field to perform a simulated search.</p>
        </Segment>

        <Segment>
          <Dropdown
            fluid
            items={items}
            loading={loading}
            loadingMessage={{
              content: <Loader label="Loading..." labelPosition="end" size="larger" />,
            }}
            multiple
            onSearchQueryChange={this.handleSearchQueryChange}
            onSelectedChange={this.handleSelectedChange}
            placeholder="Try to enter something..."
            search
            searchQuery={searchQuery}
            toggleIndicator={false}
            value={value}
          />
          <Divider />
          <CodeSnippet mode="json" value={this.state} />
        </Segment>
      </div>
    )
  }
}

export default AsyncDropdownSearch
