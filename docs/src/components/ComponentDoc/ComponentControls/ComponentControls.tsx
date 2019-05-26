import {
  Menu,
  Provider,
  ThemeInput,
  menuAsToolbarBehavior,
  menuAsToolbarButtonBehavior,
} from '@stardust-ui/react'
import * as _ from 'lodash'
import * as React from 'react'
import { NavLink } from 'react-router-dom'

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
  showRtl: boolean
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
    showRtl,
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
        pills
        accessibility={menuAsToolbarBehavior}
        items={[
          {
            key: 'show-code',
            content: <ComponentButton iconName="code" label="Try it" />,
            onClick: onShowCode,
            accessibility: menuAsToolbarButtonBehavior,
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
            accessibility: menuAsToolbarButtonBehavior,
          },
          {
            key: 'show-variables',
            content: <ComponentButton iconName="paint brush" label="Theme it" />,
            onClick: onShowVariables,
            accessibility: menuAsToolbarButtonBehavior,
          },
          {
            key: 'show-transparent',
            content: <ComponentButton iconName="adjust" label="Transparent" />,
            onClick: onShowTransparent,
            accessibility: menuAsToolbarButtonBehavior,
          },
          {
            key: 'show-rtl',
            content: <ComponentButton iconName="align right" label="RTL" />,
            onClick: onShowRtl,
            accessibility: menuAsToolbarButtonBehavior,
          },
          {
            key: 'maximize',
            content: <ComponentButton iconName="external alternate" label="Popout" />,
            as: NavLink,
            to: `/maximize/${_.kebabCase(
              examplePath
                .split('/')
                .slice(-1)
                .pop(),
            )}/${showRtl}`,
            target: '_blank',
            rel: 'noopener noreferrer',
            accessibility: menuAsToolbarButtonBehavior,
          },
          {
            key: 'copy-link',
            content: (
              <CopyToClipboard
                render={(active, onClick) => (
                  <ComponentButton
                    iconName="linkify"
                    label={active ? 'Copied!' : 'Permalink'}
                    onClick={onClick}
                  />
                )}
                value={anchorName}
              />
            ),
            onClick: onCopyLink,
            accessibility: menuAsToolbarButtonBehavior,
          },
        ]}
      />
    </Provider>
  )
}

export default React.memo(ComponentControls)
