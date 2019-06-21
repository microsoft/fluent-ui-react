import * as _ from 'lodash'
import * as React from 'react'
import { Omit, Toolbar, ToolbarItemProps } from '@stardust-ui/react'

export interface CustomToolbarProps {
  layout?: 'desktop-share' | 'whiteboard' | 'powerpoint-presenter'

  cameraActive?: boolean
  micActive?: boolean
  screenShareActive?: boolean

  onCameraChange?: (state: boolean) => void
  onMicChange?: (state: boolean) => void
  onScreenShareChange?: (state: boolean) => void

  onEndCallClick?: () => void
}

type CustomToolbarItem = ToolbarItemProps & { key: string }
type CustomToolbarLayout = (props: CustomToolbarProps) => CustomToolbarItem[]

//
//
// Standard
//
//
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
  icon: props[name + 'Active'] && config.iconActive ? config.iconActive : config.icon,
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

  icon: config.icon,
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
  // timer

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

  endCallItem(props),
]

const layouts: Record<CustomToolbarProps['layout'], CustomToolbarLayout> = {
  'desktop-share': commonLayout,
  'powerpoint-presenter': powerPointPresenterLayout,
  whiteboard: whiteboardLayout,
}

const CustomToolbar: React.FunctionComponent<CustomToolbarProps> = props => {
  // SHOULD WE HANDLE STATE?
  const { layout = 'desktop-share' } = props

  return <Toolbar items={layouts[layout](props)} />
}

export default CustomToolbar
