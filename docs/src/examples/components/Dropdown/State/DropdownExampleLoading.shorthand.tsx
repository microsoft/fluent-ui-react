import { Dropdown } from '@stardust-ui/react'
import * as React from 'react'

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange', 'Alfred Pennyworth']

const DropdownExampleLoading: React.FC<{ knobs: { loading: boolean } }> = ({ knobs }) => (
  <Dropdown
    loading={knobs.loading}
    loadingMessage="Loading..."
    multiple
    items={inputItems}
    placeholder="Start typing a name"
    search
  />
)

export default DropdownExampleLoading
