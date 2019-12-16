import { CopyToClipboard } from '@fluentui/docs-components'
import { Icon, Menu, menuAsToolbarBehavior, Tooltip } from '@fluentui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import ComponentControlsCodeSandbox from './ComponentControlsCodeSandbox/ComponentControlsCodeSandbox'

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
          content: (
            <ComponentControlsCodeSandbox
              exampleCode={exampleCode}
              exampleLanguage={exampleLanguage}
              exampleName={examplePath}
            />
          ),
        },

        {
          key: 'copy-link',
          icon: { name: 'linkify', style: { width: '20px', height: '20px' } },
          onClick: onCopyLink,
          children: (Component, props) => (
            <CopyToClipboard value={anchorName}>
              {(active, onClick) => (
                <Tooltip
                  content={active ? 'Copied!' : 'Permalink'}
                  trigger={<Component onClick={onClick} {...props} />}
                />
              )}
            </CopyToClipboard>
          ),
        },

        {
          key: 'copy-link',
          content: (
            <CopyToClipboard value={anchorName}>
              {(active, onClick) => (
                <Tooltip
                  content={active ? 'Copied!' : 'Permalink'}
                  trigger={
                    <Icon
                      name="linkify"
                      onClick={onClick}
                      style={{ width: '20px', height: '20px' }}
                    />
                  }
                />
              )}
            </CopyToClipboard>
          ),
          onClick: onCopyLink,
        },
      ]}
    />
  )
}

export default React.memo(ComponentControls)
