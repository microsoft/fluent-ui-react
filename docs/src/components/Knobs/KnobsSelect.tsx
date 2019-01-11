import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'

import KnobsField from './KnobsField'
import KnobsLabel from './KnobsLabel'
import KnobsControl from './KnobsControl'
import { ObjectOf } from 'types/utils'

export type KnobsSelectItem = { name: string; value: string }

export interface KnobsSelectProps {
  onChange?: (data: KnobsSelectProps) => void
  name?: string
  items?: KnobsSelectItem[]
  selectedItem?: KnobsSelectItem
}

class KnobsSelect extends React.Component<KnobsSelectProps, {}> {
  private itemsMap: ObjectOf<KnobsSelectItem> = {}

  public static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, value: PropTypes.string })),
    selectedItem: PropTypes.shape({ name: PropTypes.string, value: PropTypes.string }),
  }

  componentDidMount() {
    this.props.items.forEach(item => {
      this.itemsMap[item.value] = item
    })
  }

  render() {
    const { name, items } = this.props
    if (!items || !items.length) {
      return null
    }

    const selectedItem = this.props.selectedItem || this.props.items[0]

    return (
      <KnobsField>
        <KnobsControl>
          <select value={selectedItem.value} onChange={this.handleChange}>
            {items.map(({ name, value }) => (
              <option value={value}>{name}</option>
            ))}
          </select>
        </KnobsControl>
        <KnobsLabel value={selectedItem.value} name={name} />
      </KnobsField>
    )
  }

  private handleChange = (e: React.SyntheticEvent<HTMLElement>) => {
    this.props.onChange({ selectedItem: this.itemsMap[_.get(e, 'target.value')] })
  }
}

export default KnobsSelect
