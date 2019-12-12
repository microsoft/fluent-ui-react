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
          content: (
            <Tooltip
              content="Try it"
              trigger={<Icon name="code" style={{ width: '20px', height: '20px' }} />}
            />
          ),
          onClick: onShowCode,
          active: showCode,
        },
        {
          key: 'show-variables',
          content: (
            <Tooltip
              content="Theme it"
              trigger={<Icon name="paint brush" style={{ width: '20px', height: '20px' }} />}
            />
          ),
          onClick: onShowVariables,
          active: showVariables,
        },
        {
          key: 'divider-1',
          style: { margin: '0 5px' },
          kind: 'divider',
        },
        {
          key: 'show-transparent',
          content: (
            <Tooltip
              content="Transparent"
              trigger={<Icon name="adjust" style={{ width: '20px', height: '20px' }} />}
            />
          ),
          onClick: onShowTransparent,
          active: showTransparent,
        },
        {
          key: 'show-rtl',
          content: (
            <Tooltip
              content="RTL"
              trigger={<Icon name="align right" style={{ width: '20px', height: '20px' }} />}
            />
          ),
          onClick: onShowRtl,
          active: showRtl,
        },
        {
          key: 'maximize',
          content: (
            <Tooltip
              content="Popout"
              trigger={<Icon name="external alternate" style={{ width: '20px', height: '20px' }} />}
            />
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
