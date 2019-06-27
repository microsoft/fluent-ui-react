import * as _ from 'lodash'
import * as React from 'react'
import {
  Button,
  Flex,
  Text,
  Toolbar,
  ToolbarItemProps,
  ToolbarCustomItemProps,
  Status,
  ToolbarItemShorthandKinds,
  isFromKeyboard,
} from '@stardust-ui/react'

// TODO:
//  - [x] Remove CustomToolbarTimer
//  - [x] Simplify CustomToolbar.tsx helper funcs, use stupid code
//  - [x] Add more toolbar items
//  - [x] Update inline styles/variables below to use TMP format (bool vars, styles elsewhere)
//  - [x] Add kind: 'custom', non-focusable container that renders any control
//  - [ ] Add all toolbar items (menu, etc)
//  - [ ] Consider exporting IS_FOCUSABLE_ATTRIBUTE, it is also shown in our accessibility docs

export interface CustomToolbarProps {
  layout?: 'standard' | 'desktop-share' | 'powerpoint-presenter'

  isRecording?: boolean

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

type CustomToolbarItem =
  | ((ToolbarItemProps | ToolbarCustomItemProps) & {
      as?: any
      key: string
      kind?: ToolbarItemShorthandKinds
    })
  | ((render: any) => any)
type CustomToolbarLayout = (props: CustomToolbarProps) => CustomToolbarItem[]

const FocusableFlexBox = ({ variables = undefined, ...props }) => {
  const [fromKeyboard, setFromKeyboard] = React.useState(false)
  return (
    <Flex
      data-is-focusable
      {...props}
      variables={{ focusable: true, isFromKeyboard: fromKeyboard, ...variables }}
      onFocus={(...args) => {
        setFromKeyboard(isFromKeyboard())
        _.invoke(props, 'onFocus', args)
      }}
    />
  )
}

const FocusableStatus = ({ variables = undefined, ...props }) => {
  const [fromKeyboard, setFromKeyboard] = React.useState(false)

  return (
    <Status
      data-is-focusable
      {...props}
      variables={{ focusable: true, isFromKeyboard: fromKeyboard, ...variables }}
      onFocus={(...args) => {
        setFromKeyboard(isFromKeyboard())
        _.invoke(props, 'onFocus', args)
      }}
    />
  )
}

const commonLayout: CustomToolbarLayout = props => [
  ...((props.isRecording
    ? [
        // Status has focus
        {
          key: 'recording1',
          kind: 'custom',
          fitted: 'horizontally',
          content: <FocusableStatus state="error" title="Recording" styles={{ margin: '0 9px' }} />,
          variables: { primary: true },
        },
        // Flexbox has focus
        {
          key: 'recording2',
          kind: 'custom',
          fitted: 'horizontally',
          content: (
            <FocusableFlexBox fill gap="gap.medium" vAlign="center">
              <Status state="error" title="Recording" />
            </FocusableFlexBox>
          ),
          variables: { primary: true },
        },
        // Magic - status has focus, Flexbox draws focus ring
        {
          key: 'recording3',
          kind: 'custom',
          fitted: 'horizontally',
          content: (
            <FocusableFlexBox fill gap="gap.medium" vAlign="center" data-is-focusable={false}>
              <FocusableStatus
                state="error"
                title="Recording"
                variables={{ isFromKeyboard: false }}
              />
            </FocusableFlexBox>
          ),
          variables: { primary: true },
        },
      ]
    : []) as any),
  {
    key: 'timer-custom',
    kind: 'custom',
    variables: { primary: true },
    fitted: 'horizontally',
    content: (
      <FocusableFlexBox fill gap="gap.medium" vAlign="center">
        10:45
      </FocusableFlexBox>
    ),
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
    // TODO: odd to have icon style implementation details leaking here.  works for now, investigate other options.
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
    {
      key: 'stop-sharing',
      kind: 'custom',
      content: <Button content="Stop Sharing" />,
    },

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

    {
      key: 'ppt-slide-number',
      kind: 'custom',
      fitted: true,
      content: <Text size="small">{props.pptSlide}</Text>,
    },

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
      variables={{ dividerMargin: 0, borderRadius: 0, itemHeight: '4rem', uBar: true }}
      items={layouts[layout](props)}
    />
  )
}

export default CustomToolbar
