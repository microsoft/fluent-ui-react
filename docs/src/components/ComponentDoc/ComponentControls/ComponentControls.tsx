import {
  Menu,
  Provider,
  ThemeInput,
  toolbarBehavior,
  toolbarButtonBehavior,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

import { updateForKeys } from 'docs/src/hoc'
import ComponentButton from './ComponentButton'
import { ComponentSourceManagerLanguage } from 'docs/src/components/ComponentDoc/ComponentSourceManager'
import ComponentControlsCodeSandbox from './ComponentControlsCodeSandbox/ComponentControlsCodeSandbox'
import CopyToClipboard from 'docs/src/components/CopyToClipboard'

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
  showTransparent: boolean
  showVariables: boolean
}

const controlsTheme: ThemeInput = {
  componentStyles: {
    MenuItem: {
      root: {
        padding: '0.25rem',
      },
      wrapper: {
        display: 'inline-table',
        ':last-child': {
          margin: 0,
        },
      },
    },
    Text: {
      root: {
        whiteSpace: 'nowrap',
      },
    },
  },
}

const ComponentControls: React.FC<ComponentControlsProps> = props => {
  const {
    anchorName,
    exampleCode,
    exampleLanguage,
    examplePath,
    showCode,
    showRtl,
    showTransparent,
    showVariables,
    onCopyLink,
    onShowCode,
    onShowRtl,
    onShowTransparent,
    onShowVariables,
    ...rest
  } = props

  return (
    <Provider theme={controlsTheme} as={React.Fragment}>
      <Menu
        {...rest}
        fluid
        color="green"
        icon="labeled"
        size="tiny"
        pills
        accessibility={toolbarBehavior}
        items={[
          {
            key: 'show-code',
            content: <ComponentButton iconName="code" label="Try it" active={showCode} />,
            onClick: onShowCode,
            accessibility: toolbarButtonBehavior,
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
            accessibility: toolbarButtonBehavior,
          },
          {
            key: 'show-variables',
            content: (
              <ComponentButton iconName="paint brush" label="Theme it" active={showVariables} />
            ),
            onClick: onShowVariables,
            accessibility: toolbarButtonBehavior,
          },
          {
            key: 'show-transparent',
            content: (
              <ComponentButton iconName="adjust" label="Transparent" active={showTransparent} />
            ),
            onClick: onShowTransparent,
            accessibility: toolbarButtonBehavior,
          },
          {
            key: 'show-rtl',
            content: <ComponentButton iconName="align right" label="RTL" active={showRtl} />,
            onClick: onShowRtl,
            accessibility: toolbarButtonBehavior,
          },
          {
            key: 'maximize',
            content: (
              <ComponentButton iconName="external alternate" label="Popout" active={false} />
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
            accessibility: toolbarButtonBehavior,
          },
          {
            key: 'copy-link',
            content: (
              <CopyToClipboard
                render={(active, onClick) => (
                  <ComponentButton
                    iconName="linkify"
                    label={active ? 'Copied!' : 'Permalink'}
                    active={active}
                    onClick={onClick}
                  />
                )}
                value={anchorName}
              />
            ),
            onClick: onCopyLink,
            accessibility: toolbarButtonBehavior,
          },
        ]}
      />
    </Provider>
  )
}

export default updateForKeys([
  'exampleCode',
  'examplePath',
  'showRtl',
  'showCode',
  'showTransparent',
  'showVariables',
])(ComponentControls, ComponentButton)
