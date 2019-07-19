import * as React from 'react'
import { TreeFlat } from '@stardust-ui/react'

type TreeProps = {
  items?: Object[]
  title?: string
  level?: number
  size?: number
  id?: string
  updateOpenItemsNumber?: Function
}

type TreeState = {
  open?: boolean
  openItemsNumber?: number
}

// class Tree extends React.Component<TreeProps, TreeState> {
//   constructor(props) {
//     super(props)

//     this.state = {
//       open: !this.props.level,
//       openItemsNumber: this.props.level ? 1 : props.items.length,
//     }
//   }

//   handleClick = () => {
//     const { items } = this.props
//     if (items && items.length) {
//       const numberUpdate = this.state.open ? 1 - this.state.openItemsNumber : items.length
//       this.setState(
//         state => {
//           const open = !state.open
//           const openItemsNumber = open ? items.length + 1 : 1
//           return {
//             open,
//             openItemsNumber,
//           }
//         },
//         () => {
//           _.invoke(this.props, 'updateOpenItemsNumber', numberUpdate)
//         },
//       )
//     }
//   }

//   handleOpenItemsNumber = (newNumber: number) => {
//     this.setState(
//       state => ({
//         openItemsNumber: state.openItemsNumber + newNumber,
//       }),
//       () => {
//         _.invoke(this.props, 'updateOpenItemsNumber', newNumber)
//       },
//     )
//   }

//   render() {
//     const { title, items, level = 0, ...rest } = this.props
//     const { open } = this.state

//     if (!level) {
//       return (
//         <div style={{ paddingLeft: '10px' }} role="tree">
//           {open &&
//             items.map((item, index) => (
//               <Tree
//                 {...item}
//                 level={level + 1}
//                 aria-posinset={index}
//                 id={`item-${level}-${index}`}
//                 updateOpenItemsNumber={this.handleOpenItemsNumber}
//               />
//             ))}
//         </div>
//       )
//     }

//     return (
//       <>
//         <div
//           tabIndex={0}
//           aria-level={level}
//           style={{ paddingLeft: `${(level - 1) * 10}px` }}
//           onClick={this.handleClick}
//           aria-expanded={open}
//           role="treeitem"
//           aria-owns={
//             open && items && items.length
//               ? _.times(items.length, index => `item-${level}-${index}`).reduce(
//                   (acc, item) => `${acc} ${item}`,
//                   '',
//                 )
//               : undefined
//           }
//           {...rest}
//         >
//           {title}
//         </div>
//         {open &&
//           items &&
//           items.map((item, index) => (
//             <Tree
//               {...item}
//               level={level + 1}
//               updateOpenItemsNumber={this.handleOpenItemsNumber}
//               aria-posinset={index + 1}
//               id={`item-${level}-${index}`}
//             />
//           ))}
//       </>
//     )
//   }
// }

const items = [
  {
    key: '1',
    content: 'House Lannister',
    items: [
      {
        key: '11',
        content: 'Tywin',
        items: [
          {
            key: '111',
            content: 'Jaime',
          },
          {
            key: '112',
            content: 'Cersei',
          },
          {
            key: '113',
            content: 'Tyrion',
          },
        ],
      },
      {
        key: '21',
        content: 'Kevan',
        items: [
          {
            key: '211',
            content: 'Lancel',
          },
          {
            key: '212',
            content: 'Willem',
          },
          {
            key: '213',
            content: 'Martyn',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    content: 'House Targaryen',
    items: [
      {
        key: '21',
        content: 'Aerys',
        items: [
          {
            key: '211',
            content: 'Rhaegar',
          },
          {
            key: '212',
            content: 'Viserys',
          },
          {
            key: '213',
            content: 'Daenerys',
          },
        ],
      },
    ],
  },
]

const TreeExampleShorthand = () => (
  <>
    <TreeFlat items={items} />
  </>
)

export default TreeExampleShorthand
