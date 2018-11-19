import * as React from 'react'
import _ from 'lodash'

import { Grid, Input, gridBehavior } from '@stardust-ui/react'
import GridImagePickerItem, { GridItemProps } from './GridImagePickerItem'

export interface GridPickerProps {
  as?: keyof React.ReactHTML
  items: GridItemProps[]
  gridColumns: string | number
}

class GridImagePicker extends React.Component<GridPickerProps, any> {
  gridStyles = {
    width: '320px',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    gridRowGap: '10px',
  }

  inputStyles = {
    marginBottom: '10px',
  }

  render() {
    const gridTag = this.props.as || 'ul'

    return (
      <>
        <Input styles={this.inputStyles} fluid icon="search" placeholder="Search..." />
        <Grid
          as={gridTag}
          accessibility={gridBehavior}
          columns={this.props.gridColumns}
          style={this.gridStyles}
          content={this.renderGridItems()}
        />
      </>
    )
  }

  renderGridItems() {
    return _.map(this.props.items, (item, idx) => (
      <GridImagePickerItem imageSrc={item.imageSrc} title={item.title} />
    ))
  }
}

export default GridImagePicker
