import * as React from 'react'
import { Menu, Popup, toolbarBehavior, popupFocusTrapBehavior } from '@stardust-ui/react'

export interface PopoverProps {
  className?: string
}

class Popover extends React.Component<PopoverProps> {
  render() {
    return (
      <Menu
        styles={{
          transition: 'opacity 0.2s',
          position: 'absolute',
          top: '-20px',
          right: '5px',
          background: '#fff',
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
        }}
        iconOnly
        className={this.props.className}
        items={[
          { key: 'smile', icon: 'smile', className: 'smile-emoji' },
          { key: 'smile2', icon: 'smile', className: 'smile-emoji' },
          { key: 'smile3', icon: 'smile', className: 'smile-emoji' },
          { key: 'a', icon: 'thumbs up' },
          { key: 'c', icon: 'ellipsis horizontal' },
        ]}
        renderItem={renderContextMenu}
        onFocus={handleFocus}
        onBlur={handleBlur}
        accessibility={toolbarBehavior}
        data-is-focusable={true}
      />
    )
  }
}

export default Popover

const renderContextMenu = (MenuItem, props) => {
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
        <div
          style={{
            background: '#fff',
            boxShadow: '0 0.2rem 1.6rem 0 rgba(37,36,35,.3)',
            borderRadius: '.3rem',
            marginTop: '5px',
          }}
        >
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
        </div>
      }
    />
  )
}

export const handleFocus = e => {
  const currentTarget = e.currentTarget
  if (!currentTarget.classList.contains('focused')) {
    currentTarget.classList.add('focused')
  }
}

export const handleBlur = e => {
  const currentTarget = e.currentTarget
  const relatedTarget = e.relatedTarget

  if (currentTarget.contains(relatedTarget)) {
    if (!currentTarget.classList.contains('focused')) {
      currentTarget.classList.add('focused')
    }
  } else {
    currentTarget.classList.remove('focused')
  }
}
