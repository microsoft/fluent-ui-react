import * as _ from 'lodash'
import * as React from 'react'
import { Button, Box, Omit, Toolbar, ToolbarItemProps } from '@stardust-ui/react'

// TODO: NEXT STEPS
//  - [ ] Remove CustomToolbarTimer
//  - [ ] Simplify CustomToolbar.tsx helper funcs, use stupid code
//  - [ ] Add more toolbar items
//  - [ ] Continue updating styles
//  - [ ] Update inline styles/variables below to use TMP format (bool vars, styles elsewhere)

export interface CustomToolbarProps {
  layout?: 'whiteboard' | 'powerpoint-presenter'

  cameraActive?: boolean
  micActive?: boolean
  screenShareActive?: boolean
  chatActive?: boolean

  onCameraChange?: (state: boolean) => void
  onMicChange?: (state: boolean) => void
  onScreenShareChange?: (state: boolean) => void
  onChatChange?: (state: boolean) => void

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
    _.invoke(props, 'on' + _.upperFirst(name) + 'Change', !props[name + 'Active'])
  },
  active: props[name + 'Active'],

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

const screenShareItem = createActionableItem('screenShare', {
  icon: 'call-control-close-tray',
  iconActive: 'call-control-present-new',
  primary: true,
})

const moreItem = createDumbItem('more', { icon: 'more', primary: true })

const chatItem = createActionableItem('chat', {
  icon: 'chat',
  iconActive: 'chat',
})

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
    variables: { primary: true },
  },

  { key: 'timer-divider', kind: 'divider' },

  {
    active: props.cameraActive,
    icon: {
      name: props.cameraActive ? 'call-video' : 'call-video-off',
      size: 'large',
    },
    key: 'camera',
    onClick: () => _.invoke(props, 'onCameraChange', !props.cameraActive),
    variables: { primary: true },
  },
  {
    active: props.micActive,
    icon: {
      name: props.micActive ? 'mic' : 'mic-off',
      size: 'large',
    },
    key: 'mic',
    onClick: () => _.invoke(props, 'onMicChange', !props.micActive),
    variables: { primary: true },
  },

  screenShareItem(props),
  moreItem(props),
  { key: 'primary-section-divider', kind: 'divider' },
  chatItem(props),

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

  // multi-window-call

  endCallItem(props),
]

//
// PP
//

const powerPointPresenterLayout: CustomToolbarLayout = props =>
  [
    ...commonLayout(props),

    // touch item
    stopSharingItem(props),
    // slider

    // // double focus
    // {
    //   key: 'stop-sharing-button',
    //   as: 'div',
    //   children: <Button content="Stop Sharing" />,
    //   // TODO: this is not allowed on the TMP side, make it like theirs
    //   styles: { padding: '0 1rem' },
    // },

    render =>
      render(
        <Box
          styles={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(41,40,40,.9)',
          }}
        >
          <Button content="Stop Sharing" styles={{ margin: '0 1rem' }} />
        </Box>,
      ),

    endCallItem(props),
  ] as any // FIXME

const layouts: Record<CustomToolbarProps['layout'], CustomToolbarLayout> = {
  'powerpoint-presenter': powerPointPresenterLayout,
  whiteboard: whiteboardLayout,
}

const CustomToolbar: React.FunctionComponent<CustomToolbarProps> = props => {
  const { layout = 'whiteboard' } = props

  return <Toolbar variables={{ uBar: true }} items={layouts[layout](props)} />
}

export default CustomToolbar
