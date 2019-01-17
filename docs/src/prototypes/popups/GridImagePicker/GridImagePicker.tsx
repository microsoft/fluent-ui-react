import { Grid, Input, gridBehavior } from '@stardust-ui/react'
import * as React from 'react'
import * as _ from 'lodash'

import { ShorthandValue } from '../../../../../types/utils'
import GridImagePickerItem, { GridPickerItemProps } from './GridImagePickerItem'

export interface GridPickerProps {
  items: GridPickerItemProps[]
  gridColumns?: string | number
  inputIcon?: ShorthandValue
  inputPlaceholder?: string
}

const gridStyles = {
  width: '320px',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  gridRowGap: '10px',
}

const inputStyles = {
  marginBottom: '10px',
}

class GridImagePicker extends React.Component<GridPickerProps> {
  static defaultProps = {
    gridColumns: 5,
    inputIcon: 'search',
    inputPlaceholder: 'Search...',
  }

  inputNode: HTMLElement
  setInputNode = (node: HTMLElement) => (this.inputNode = node)

  focusInput() {
    this.inputNode && this.inputNode.focus()
  }

  render() {
    const { gridColumns, inputIcon, inputPlaceholder } = this.props

    return (
      <>
        <Input
          styles={inputStyles}
          fluid
          icon={inputIcon}
          placeholder={inputPlaceholder}
          inputRef={this.setInputNode}
        />
        <Grid
          as="ul"
          accessibility={gridBehavior}
          columns={gridColumns}
          style={gridStyles}
          content={this.renderGridItems()}
        />
      </>
    )
  }

  renderGridItems() {
    return _.map(this.props.items, item => <GridImagePickerItem {...item} />)
  }
}

export default GridImagePicker
