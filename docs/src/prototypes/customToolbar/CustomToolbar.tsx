import * as _ from 'lodash'
import * as React from 'react'
import { Button, Omit, Toolbar, ToolbarItemProps } from '@stardust-ui/react'

// TODO: NEXT STEPS
//  - [ ] Remove CustomToolbarTimer
//  - [ ] Simplify CustomToolbar.tsx helper funcs, use stupid code
//  - [ ] Add more toolbar items
//  - [ ] Continue updating styles
//  - [ ] Update inline styles/variables below to use TMP format (bool vars, styles elsewhere)

import CustomToolbarTimer from './CustomToolbarTimer'

export interface CustomToolbarProps {
  layout?: 'whiteboard' | 'powerpoint-presenter'

  cameraActive?: boolean
  micActive?: boolean
  screenShareActive?: boolean

  onCameraChange?: (state: boolean) => void
  onMicChange?: (state: boolean) => void
  onScreenShareChange?: (state: boolean) => void

  onEndCallClick?: () => void
}

type CustomToolbarItem = ToolbarItemProps & { as?: any; key: string }
type CustomToolbarLayout = (props: CustomToolbarProps) => CustomToolbarItem[]

//
// Standard
//

type CreateItemConfig = {
  icon: string
  iconActive?: string

  danger?: true
  primary?: true
}

const createActionableItem = (name: string, config: CreateItemConfig) => (
  props: CustomToolbarProps,
): CustomToolbarItem => ({
  key: name,

  // TODO: find better way to define it, propName, callbackName???
  icon: {
    name: props[name + 'Active'] && config.iconActive ? config.iconActive : config.icon,
    size: 'large',
  },
  onClick: () => {
    _.invoke(props, 'on' + _.startCase(name) + 'Change', !props[name + 'Active'])
  },

  variables: {
    danger: config.danger,
    primary: config.primary,
  },
})

const createDumbItem = (name: string, config: Omit<CreateItemConfig, 'iconActive'>) => (
  props: CustomToolbarProps,
): CustomToolbarItem => ({
  key: name,

  icon: {
    name: config.icon,
    size: 'large',
  },

  onClick: () => {
    _.invoke(props, 'on' + _.startCase(name) + 'Click')
  },

  variables: {
    danger: config.danger,
    primary: config.primary,
  },
})

const cameraItem = createActionableItem('camera', {
  icon: 'call-video-off',
  iconActive: 'call-video',
  primary: true,
})

const micItem = createActionableItem('mic', {
  icon: 'mic-off',
  iconActive: 'mic',
  primary: true,
})

const screenShareItem = createActionableItem('screenShare', {
  icon: 'call-control-close-tray',
  iconActive: 'call-control-present-new',
  primary: true,
})

const moreItem = createDumbItem('more', { icon: 'more', primary: true })

const endCallItem = createDumbItem('endCall', { icon: 'call-end', danger: true })

//
// Common
//

const commonLayout: CustomToolbarLayout = props => [
  // recording indic
  {
    key: 'timer',
    as: 'span',
    children: '10:45',
    'data-is-focusable': true,
    styles: { userSelect: 'none' },
  },

  cameraItem(props),
  micItem(props),
  screenShareItem(props),
  moreItem(props),

  // comments
  // add to call someone
]

//
//
// Whiteboard
//
//
//

const stopSharingItem = createDumbItem('stopSharing', { icon: 'call-control-stop-presenting-new' })

const whiteboardLayout: CustomToolbarLayout = props => [
  ...commonLayout(props),

  { key: 'divider', kind: 'divider' },

  // multi-window-call

  endCallItem(props),
]

//
// PP
//

const powerPointPresenterLayout: CustomToolbarLayout = props => [
  ...commonLayout(props),

  { key: 'divider', kind: 'divider' },

  // touch item
  stopSharingItem(props),
  // slider

  {
    key: 'stop-sharing-button',
    as: 'div',
    children: <Button content="Stop Sharing" />,
    // TODO: this is not allowed on the TMP side, make it like theirs
    styles: { padding: '0 1rem' },
  },

  endCallItem(props),
]

const layouts: Record<CustomToolbarProps['layout'], CustomToolbarLayout> = {
  'powerpoint-presenter': powerPointPresenterLayout,
  whiteboard: whiteboardLayout,
}

const CustomToolbar: React.FunctionComponent<CustomToolbarProps> = props => {
  const { layout = 'whiteboard' } = props

  return <Toolbar items={layouts[layout](props)} />
}

export default CustomToolbar
