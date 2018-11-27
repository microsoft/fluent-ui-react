import { Menu, Popup, toolbarBehavior, popupFocusTrapBehavior, Provider } from '@stardust-ui/react'
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

  render() {
    return (
      <Provider.Consumer
        render={({ siteVariables }) => (
          <Menu
            styles={{
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

              '& a:focus': {
                textDecoration: 'none',
                color: 'inherit',
              },

              '& a': {
                color: 'inherit',
              },
            }}
            iconOnly
            className={cx(this.props.className, this.state.focused ? 'focused' : '')}
            items={[
              { key: 'smile', icon: 'smile', className: 'smile-emoji' },
              { key: 'smile2', icon: 'smile', className: 'smile-emoji' },
              { key: 'smile3', icon: 'smile', className: 'smile-emoji' },
              { key: 'a', icon: 'thumbs up' },
              { key: 'c', icon: 'ellipsis horizontal' },
            ]}
            renderItem={renderContextMenu}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            accessibility={toolbarBehavior}
            data-is-focusable={true}
          />
        )}
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
    <Provider.Consumer
      render={({ siteVariables }) => (
        <Popup
          key={props.key}
          position="below"
          accessibility={popupFocusTrapBehavior}
          trigger={<MenuItem {...props} />}
          content={
            <div
              style={{
                background: siteVariables.white,
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
      )}
    />
  )
}
