import { CopyToClipboard } from '@fluentui/docs-components'
import { Menu, menuAsToolbarBehavior, Tooltip } from '@fluentui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import ComponentControlsCodeSandbox, {
  CodeSandboxState,
} from './ComponentControlsCodeSandbox/ComponentControlsCodeSandbox'

type ComponentControlsProps = {
  exampleCode: string
  exampleLanguage: ComponentSourceManagerLanguage
  examplePath: string
  anchorName: string
  onCopyLink: (e: React.SyntheticEvent) => void
  onShowCode: (e: React.SyntheticEvent) => void
  onShowRtl: (e: React.SyntheticEvent) => void
  onShowTransparent: (e: React.SyntheticEvent) => void
  onShowVariables: (e: React.SyntheticEvent) => void
  showCode: boolean
  showRtl: boolean
  showVariables: boolean
  showTransparent: boolean
  toolbarAriaLabel?: string
}

const ComponentControls: React.FC<ComponentControlsProps> = props => {
  const {
    anchorName,
    exampleCode,
    exampleLanguage,
    examplePath,
    showCode,
    showRtl,
    showVariables,
    showTransparent,
    onCopyLink,
    onShowCode,
    onShowRtl,
    onShowTransparent,
    onShowVariables,
    toolbarAriaLabel,
    ...rest
  } = props

  return (
    <Menu
      {...rest}
      iconOnly
      accessibility={menuAsToolbarBehavior}
      aria-label={toolbarAriaLabel || null}
      items={[
        {
          key: 'show-code',
          icon: { name: 'code', style: { width: '20px', height: '20px' } },
          onClick: onShowCode,
          active: showCode,
          children: (Component, props) => (
            <Tooltip content="Try it" trigger={<Component {...props} />} />
          ),
        },

        {
          key: 'show-variables',
          icon: { name: 'paint brush', style: { width: '20px', height: '20px' } },
          onClick: onShowVariables,
          active: showVariables,
          children: (Component, props) => (
            <Tooltip content="Theme it" trigger={<Component {...props} />} />
          ),
        },
        {
          key: 'divider-1',
          style: { margin: '0 5px' },
          kind: 'divider',
        },
        {
          key: 'show-transparent',
          icon: { name: 'adjust', style: { width: '20px', height: '20px' } },
          onClick: onShowTransparent,
          active: showTransparent,
          children: (Component, props) => (
            <Tooltip content="Transparent" trigger={<Component {...props} />} />
          ),
        },
        {
          key: 'show-rtl',
          icon: { name: 'align right', style: { width: '20px', height: '20px' } },
          onClick: onShowRtl,
          active: showRtl,
          children: (Component, props) => (
            <Tooltip content="RTL" trigger={<Component {...props} />} />
          ),
        },

        {
          key: 'maximize',
          icon: { name: 'external alternate', style: { width: '20px', height: '20px' } },
          children: (Component, props) => (
            <Tooltip content="Popout" trigger={<Component {...props} />} />
          ),
          as: NavLink,
          to: `/maximize/${_.kebabCase(
            examplePath
              .split('/')
              .slice(-1)
              .pop(),
          )}/${showRtl}`,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          key: 'divider-2',
          style: { margin: '0 5px' },
          kind: 'divider',
        },
        {
          key: 'show-codesandbox',
          children: (Component, props) => (
            <ComponentControlsCodeSandbox
              exampleCode={exampleCode}
              exampleLanguage={exampleLanguage}
              exampleName={examplePath}
            >
              {(state, onClick) => (
                <Tooltip
                  content={
                    state === CodeSandboxState.Default
                      ? 'CodeSandbox'
                      : state === CodeSandboxState.Loading
                      ? 'Exporting...'
                      : 'Click to open'
                  }
                  trigger={<Component {...props} onClick={onClick} />}
                />
              )}
            </ComponentControlsCodeSandbox>
          ),
        },
        //   return (
        // <Tooltip
        //   trigger={<Icon name="checkmark" onClick={this.handleClick} />}
        //   content="Click to open"
        // />
        //     <Tooltip
        //   trigger={<Icon name={loading ? 'spinner' : 'connectdevelop'} />}
        // content={loading ? 'Exporting...' : 'CodeSandbox'}
        // />
        {
          key: 'copy-link',
          icon: { name: 'linkify', style: { width: '20px', height: '20px' } },
          children: (Component, props) => (
            <CopyToClipboard value={anchorName}>
              {(active, onClick) => (
                <Tooltip
                  content={active ? 'Copied!' : 'Permalink'}
                  trigger={
                    <Component
                      {...props}
                      onClick={(e: React.SyntheticEvent) => {
                        onClick()
                        onCopyLink(e)
                      }}
                    />
                  }
                />
              )}
            </CopyToClipboard>
          ),
        },
      ]}
    />
  )
}

export default React.memo(ComponentControls)
