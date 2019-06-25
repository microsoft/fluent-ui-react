import * as _ from 'lodash'
import * as React from 'react'
import { Button, Box, Text, Toolbar, ToolbarItemProps } from '@stardust-ui/react'

// TODO: NEXT STEPS
//  - [x] Remove CustomToolbarTimer
//  - [x] Simplify CustomToolbar.tsx helper funcs, use stupid code
//  - [ ] Add more toolbar items
//  - [ ] Continue updating styles
//  - [ ] Update inline styles/variables below to use TMP format (bool vars, styles elsewhere)

export interface CustomToolbarProps {
  layout?: 'standard' | 'desktop-share' | 'powerpoint-presenter'

  cameraActive?: boolean
  onCameraChange?: (state: boolean) => void

  micActive?: boolean
  onMicChange?: (state: boolean) => void

  screenShareActive?: boolean
  onScreenShareChange?: (state: boolean) => void

  sidebarSelected: false | 'chat' | 'participant-add'
  onSidebarChange?: (state: false | 'chat' | 'participant-add') => void

  chatHasDot?: boolean

  pptSlide?: string
  onPptPrevClick?: () => void
  onPptNextClick?: () => void

  onEndCallClick?: () => void
}

type CustomToolbarItem = (ToolbarItemProps & { as?: any; key: string }) | ((render: any) => any)
type CustomToolbarLayout = (props: CustomToolbarProps) => CustomToolbarItem[]

const commonLayout: CustomToolbarLayout = props => [
  // recording indic
  {
    key: 'timer',
    as: 'span',
    children: '10:45',
    'data-is-focusable': true,
    role: undefined,
    styles: {
      userSelect: 'none',
      cursor: 'default',
      ':hover': {
        /* TODO: reset styles */
      },
    },
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

  {
    active: props.screenShareActive,
    icon: {
      name: props.screenShareActive ? 'call-control-close-tray' : 'call-control-present-new',
      size: 'large',
    },
    key: 'screen-share',
    onClick: () => _.invoke(props, 'onScreenShareChange', !props.screenShareActive),
    variables: { primary: true },
  },

  {
    key: 'more',
    icon: {
      name: 'more',
      size: 'large',
    },

    onClick: () => {
      _.invoke(props, 'onMoreClick')
    },

    variables: {
      primary: true,
    },
  },
]

const sidebarButtons: CustomToolbarLayout = props => [
  {
    active: props.sidebarSelected === 'chat',
    icon: {
      name: 'chat',
      outline: 'true',
      size: 'large',
    },
    key: 'chat',
    onClick: () =>
      _.invoke(props, 'onSidebarChange', props.sidebarSelected === 'chat' ? false : 'chat'),
    variables: { hasDot: props.chatHasDot, noFillOnHover: true },
  },
  {
    active: props.sidebarSelected === 'participant-add',
    icon: {
      name: 'participant-add',
      outline: 'true',
      size: 'large',
    },
    key: 'participant-add',
    onClick: () =>
      _.invoke(
        props,
        'onSidebarChange',
        props.sidebarSelected === 'participant-add' ? false : 'participant-add',
      ),
    variables: { noFillOnHover: true },
  },
]

const layoutItems = {
  endCall: props => ({
    key: 'end-call',
    icon: {
      name: 'call-end',
      size: 'large',
    },

    onClick: () => {
      _.invoke(props, 'onEndCallClick')
    },

    variables: {
      danger: true,
    },
  }),
}

const layouts: Record<CustomToolbarProps['layout'], CustomToolbarLayout> = {
  standard: props => [...commonLayout(props), ...sidebarButtons(props), layoutItems.endCall(props)],

  'desktop-share': props => [
    ...commonLayout(props),
    ...sidebarButtons(props),
    { key: 'divider-sidebar', kind: 'divider' },
    // HUH: double focus
    // {
    //   key: 'stop-sharing-button',
    //   as: 'div',
    //   children: <Button content="Stop Sharing" />,
    //   // TODO: this is not allowed on the TMP side, make it like theirs
    //   styles: { padding: '0 1rem' },
    // },

    // HUH: ugly, styles "leak" to other components
    render =>
      render(
        {
          content: 'Stop Sharing',
          key: 'stop-sharing',
        },
        (_, props) => (
          <Box variables={{ uBarButtonWrapper: true, verticalPaddingMedium: true }}>
            <Button {...props} />
          </Box>
        ),
      ),

    layoutItems.endCall(props),
  ],
  'powerpoint-presenter': props => [
    ...commonLayout(props),
    ...sidebarButtons(props),
    { key: 'divider-sidebar', kind: 'divider' },

    // touch item
    {
      key: 'stop-sharing',
      icon: {
        name: 'call-control-stop-presenting-new',
        size: 'large',
      },

      onClick: () => {
        _.invoke(props, 'onStopSharingClick')
      },
    },

    {
      key: 'ppt-prev',
      icon: {
        name: 'chevron-down',
        rotate: 90,
        outline: true,
      },

      onClick: () => {
        _.invoke(props, 'onPptPrevClick')
      },
    },

    render =>
      render({}, () => (
        <Box variables={{ uBarButtonWrapper: true, verticalPaddingSmall: true }}>
          <Text size="small">{props.pptSlide}</Text>
        </Box>
      )),

    {
      key: 'ppt-next',
      icon: {
        name: 'chevron-down',
        rotate: -90,
        outline: true,
      },

      onClick: () => {
        _.invoke(props, 'onPptNextClick')
      },
    },

    layoutItems.endCall(props),
  ],
}

const CustomToolbar: React.FunctionComponent<CustomToolbarProps> = props => {
  const { layout = 'standard' } = props

  return (
    <Toolbar
      variables={{ dividerMargin: 0, borderRadius: 0, uBar: true }}
      items={layouts[layout](props)}
    />
  )
}

export default CustomToolbar
