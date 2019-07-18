import * as React from 'react'
import * as _ from 'lodash'
import { Tree as StardustTree } from '@stardust-ui/react'

type TreeProps = {
  items?: Object[]
  title?: string
  level?: number
  size?: number
  id?: string
}

type TreeState = {
  open?: boolean
}

class Tree extends React.Component<TreeProps, TreeState> {
  constructor(props) {
    super(props)

    this.state = {
      open: !this.props.level,
    }
  }

  handleClick = () => {
    if (this.props.items && this.props.items.length) {
      this.setState(state => ({
        open: !state.open,
      }))
    }
  }

  render() {
    const { title, items, level = 0, ...rest } = this.props
    const { open } = this.state

    if (!level) {
      return (
        <div style={{ paddingLeft: '10px' }} role="tree">
          {open &&
            items.map((item, index) => (
              <Tree
                {...item}
                level={level + 1}
                aria-posinset={index}
                id={`item-${level}-${index}`}
              />
            ))}
        </div>
      )
    }

    return (
      <>
        <div
          tabIndex={0}
          aria-level={level}
          style={{ paddingLeft: `${(level - 1) * 10}px` }}
          onClick={this.handleClick}
          aria-expanded={open}
          role="treeitem"
          aria-owns={
            open && items && items.length
              ? _.times(items.length, index => `item-${level}-${index}`).reduce(
                  (acc, item) => `${acc} ${item}`,
                  '',
                )
              : undefined
          }
          {...rest}
        >
          {title}
        </div>
        {open &&
          items &&
          items.map((item, index) => (
            <Tree {...item} level={level + 1} aria-posinset={index} id={`item-${level}-${index}`} />
          ))}
      </>
    )
  }
}

const items = [
  {
    key: '1',
    title: 'House Lannister',
    items: [
      {
        key: '11',
        title: 'Tywin',
        items: [
          {
            key: '111',
            title: 'Jaime',
          },
          {
            key: '112',
            title: 'Cersei',
          },
          {
            key: '113',
            title: 'Tyrion',
          },
        ],
      },
      {
        key: '21',
        title: 'Kevan',
        items: [
          {
            key: '211',
            title: 'Lancel',
          },
          {
            key: '212',
            title: 'Willem',
          },
          {
            key: '213',
            title: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    title: 'House Targaryen',
    items: [
      {
        key: '21',
        title: 'Aerys',
        items: [
          {
            key: '211',
            title: 'Rhaegar',
          },
          {
            key: '212',
            title: 'Viserys',
          },
          {
            key: '213',
            title: 'Daenerys',
          },
        ],
      },
    ],
  },
]

const TreeExampleShorthand = () => (
  <>
    <Tree items={items} aria-setsize={4} />
    <StardustTree items={items} />
  </>
)

export default TreeExampleShorthand
