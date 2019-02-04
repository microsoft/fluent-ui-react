import { Dropdown } from '@stardust-ui/react'
import * as React from 'react'

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange', 'Alfred Pennyworth']

const DropdownExampleLoading: React.FC<{ knobs: { loading: boolean } }> = ({ knobs }) => (
  <Dropdown
    search
    multiple
    items={inputItems}
    placeholder="Start typing a name"
    loading={knobs.loading}
    loadingMessage="Loading..."
  />
)

export default DropdownExampleLoading
