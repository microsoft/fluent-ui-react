import { ShorthandCollection } from '../../types'
import * as customPropTypes from '@stardust-ui/react-proptypes'
import * as _ from 'lodash'

import ToolbarDivider from './ToolbarDivider'
import ToolbarItem from './ToolbarItem'
import ToolbarGroup from './ToolbarGroup'

export type ToolbarItemShorthandKinds = 'divider' | 'item' | 'button' | 'group'

export type ToolbarItemShorthandCollection = ShorthandCollection<ToolbarItemShorthandKinds>

export const collectionShorthandToolbarItem = () =>
  customPropTypes.collectionShorthandWithKindProp(['divider', 'item', 'button', 'group'])

export const renderToolbarItems = items => {
  return _.map(items, (item, index) => {
    const kind = _.get(item, 'kind', 'item')

    switch (kind) {
      case 'divider':
        return ToolbarDivider.create(item)
      case 'group':
        return ToolbarGroup.create(item)
      default:
        return ToolbarItem.create(item)
    }
  })
}
