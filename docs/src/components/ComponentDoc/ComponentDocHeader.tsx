import * as PropTypes from 'prop-types'
import * as React from 'react'
import * as _ from 'lodash'
import { Flex, Header, Label, Popup } from '@stardust-ui/react'
import categories from './categories'

const Category = props => {
  const { name } = props
  const category = categories[name]
  const label = (
    <Label content={name} color={category && category.color} styles={{ marginBottom: '1.75rem' }} />
  )
  return category && category.description ? (
    <Popup
      pointing
      position="below"
      on="hover"
      trigger={label}
      content={{ content: category.description }}
    />
  ) : (
    label
  )
}

export default class ComponentDocHeader extends React.PureComponent<any, any> {
  static propTypes = {
    info: PropTypes.object.isRequired,
  }

  render() {
    const { info } = this.props
    const categoryTag = _.find(info.docblock.tags, { title: 'category' }) as any
    const category = categoryTag && categoryTag.description && categoryTag.description.trim()

    return (
      <Flex vAlign="end" gap="gap.small">
        <Header as="h1" aria-level={2} content={info.displayName} variables={{ color: 'black' }} />
        {category && <Category name={category} />}
      </Flex>
    )
  }
}
