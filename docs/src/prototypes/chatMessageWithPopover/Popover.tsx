import {
  Menu,
  Popup,
  toolbarBehavior,
  popupFocusTrapBehavior,
  createComponent,
  ComponentSlotStyle,
  ComponentVariablesInput,
} from '@stardust-ui/react'
import { ReactChildren } from 'types/utils'
import * as React from 'react'
import * as cx from 'classnames'

export interface PopoverProps {
  className?: string
}

class Popover extends React.Component<PopoverProps> {
  state = {
    focused: false,
  }

  changeFocusState = (isFocused: boolean) => {
    this.state.focused !== isFocused && this.setState({ focused: isFocused })
  }

  handleFocus = () => {
    this.changeFocusState(true)
  }

  handleBlur = e => {
    const shouldPreserveFocusState = e.currentTarget.contains(e.relatedTarget)
    this.changeFocusState(shouldPreserveFocusState)
  }

  menuStyles = ({ theme: { siteVariables } }) => ({
    transition: 'opacity 0.2s',
    position: 'absolute',
    top: '-20px',
    right: '5px',
    background: siteVariables.white,
    boxShadow: '0px 2px 4px #ddd',
    borderRadius: '.3rem',
    opacity: 0,

    '& .smile-emoji': {
      display: 'none',
    },

    '&.focused .smile-emoji': {
      display: 'flex',
    },

    '&:hover .smile-emoji': {
      display: 'flex',
    },
  })

  render() {
    return (
      <Menu
        styles={this.menuStyles}
        iconOnly
        className={cx(this.props.className, this.state.focused ? 'focused' : '')}
        items={[
          { key: 'smile', icon: 'smile', className: 'smile-emoji' },
          { key: 'smile2', icon: 'smile', className: 'smile-emoji' },
          { key: 'smile3', icon: 'smile', className: 'smile-emoji' },
          { key: 'a', icon: 'thumbs up' },
          { key: 'c', icon: 'ellipsis horizontal' },
        ]}
        renderItem={renderItemOrContextMenu}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        accessibility={toolbarBehavior}
        data-is-focusable={true}
      />
    )
  }
}

export default Popover

const ContextMenu = createComponent<ContextMenuProps>({
  displayName: 'ContextMenu',
  render: ({ stardust, className, children }) => {
    const { classes } = stardust
    return <div className={cx(className, classes.root)}>{children}</div>
  },
})

interface ContextMenuProps {
  className?: string
  styles?: ComponentSlotStyle
  variables?: ComponentVariablesInput
  children?: ReactChildren
}

const renderItemOrContextMenu = (MenuItem, props) => {
  if (props.icon !== 'ellipsis horizontal') {
    return <MenuItem {...props} />
  }

  return (
    <Popup
      key={props.key}
      position="below"
      accessibility={popupFocusTrapBehavior}
      trigger={<MenuItem {...props} />}
      content={
        <ContextMenu>
          <Menu
            vertical
            pills
            className="actions"
            items={[
              { key: 'bookmark', icon: 'folder', content: 'Save this message' },
              { key: 'linkify', icon: 'linkify', content: 'Copy link' },
              { key: 'translate', icon: 'translate', content: 'Translate' },
            ]}
          />
        </ContextMenu>
      }
    />
  )
}
