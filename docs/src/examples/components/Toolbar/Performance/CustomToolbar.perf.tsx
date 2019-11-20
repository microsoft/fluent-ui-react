import * as _ from 'lodash'
import * as React from 'react'
import {
  Button,
  Text,
  Toolbar,
  ShorthandCollection,
  Status,
  ToolbarItemShorthandKinds,
  SizeValue,
  ShorthandValue,
  ComponentStyleFunctionParam,
  ThemeInput,
  ToolbarProps,
  ToolbarItemProps,
  ToolbarCustomItemProps,
  ToolbarDividerProps,
  StatusProps,
  pxToRem,
  Provider,
  themes,
  mergeThemes,
  Tooltip,
  tooltipAsLabelBehavior,
} from '@fluentui/react'

type CustomStatusVariables = {
  isRecordingIndicator?: boolean

  recordingIndicatorBorderColor?: string
  recordingIndicatorBorderStyle?: string
  recordingIndicatorBorderWidth?: string
}

type CustomToolbarVariables = {
  isCt?: boolean

  isCtItemDanger?: boolean
  isCtItemPrimary?: boolean
  isCtItemIconNoFill?: boolean
  isCtItemIndicator?: boolean
  isCtItemWithNotification?: boolean

  ctBorderRadius: string
  ctBorderStyle: string
  ctBorderWidth: string
  ctHeight: string

  ctItemBackground: string
  ctItemBackgroundHover: string
  ctItemBorderColorFocus: string
  ctItemColor: string
  ctItemColorFocus: string
  ctItemColorHover: string

  ctItemActiveColor: string
  ctItemActiveBackground: string
  ctItemActiveBackgroundOverlay: string

  ctItemDangerBackground: string
  ctItemDangerColorHover: string
  ctItemDangerBackgroundHover: string

  ctItemIndicatorPadding: string

  ctItemNotificationBackgroundColor: string
  ctItemNotificationSize: string

  ctItemPrimaryBackground: string
  ctItemPrimaryBackgroundHover: string
  ctItemPrimaryColorHover: string
}

const darkThemeOverrides: ThemeInput = {
  componentVariables: {
    Status: (siteVars): CustomStatusVariables => ({
      recordingIndicatorBorderColor: siteVars.colors.white,
      recordingIndicatorBorderStyle: 'solid',
      recordingIndicatorBorderWidth: '2px',
    }),

    Toolbar: (siteVars): CustomToolbarVariables => ({
      ctBorderRadius: '4px',
      ctBorderStyle: 'solid',
      ctBorderWidth: '2px',
      ctHeight: '4rem',

      ctItemBackground: siteVars.colorScheme.default.background1,
      ctItemBackgroundHover: siteVars.colorScheme.brand.backgroundHover1,
      ctItemBorderColorFocus: siteVars.colorScheme.default.borderFocus,
      ctItemColor: siteVars.colorScheme.default.foreground,
      ctItemColorFocus: siteVars.colorScheme.default.foregroundFocus,
      ctItemColorHover: siteVars.colorScheme.default.foregroundHover,

      ctItemActiveBackground: siteVars.colorScheme.default.backgroundActive1,
      // FIXME: use variables for colors!
      ctItemActiveBackgroundOverlay:
        'linear-gradient(90deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(135deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 70%),linear-gradient(180deg,rgba(60,62,93,.6) 70%,rgba(60,62,93,0) 94%),linear-gradient(225deg,rgba(60,62,93,.6) 33%,rgba(60,62,93,0) 73%),linear-gradient(270deg,rgba(60,62,93,.6),rgba(60,62,93,0) 33%),linear-gradient(0deg,rgba(98,100,167,.75) 6%,rgba(98,100,167,0) 70%)',
      ctItemActiveColor: siteVars.colorScheme.default.foregroundActive1,

      ctItemDangerBackground: siteVars.colorScheme.red.background2,
      ctItemDangerBackgroundHover: siteVars.colorScheme.red.backgroundHover,
      ctItemDangerColorHover: siteVars.colorScheme.red.foregroundHover,

      ctItemIndicatorPadding: pxToRem(8),

      ctItemNotificationBackgroundColor: siteVars.colors.red[400],
      ctItemNotificationSize: pxToRem(8),

      ctItemPrimaryBackground: siteVars.colorScheme.default.background3,
      ctItemPrimaryBackgroundHover: siteVars.colorScheme.brand.backgroundHover1,
      ctItemPrimaryColorHover: siteVars.colorScheme.brand.foregroundHover1,
    }),
  },

  componentStyles: {
    Status: {
      root: ({
        variables: v,
      }: ComponentStyleFunctionParam<StatusProps, CustomStatusVariables>) => ({
        ...(v.isRecordingIndicator && {
          boxSizing: 'content-box',
          borderColor: v.recordingIndicatorBorderColor,
          borderStyle: v.recordingIndicatorBorderStyle,
          borderWidth: v.recordingIndicatorBorderWidth,
        }),
      }),
    },
    Toolbar: {
      root: ({
        variables: v,
      }: ComponentStyleFunctionParam<ToolbarProps, CustomToolbarVariables>) => ({
        ...(v.isCt && {
          borderRadius: v.ctBorderRadius,
          height: v.ctHeight,
          overflow: 'hidden',
        }),
      }),
    },

    ToolbarCustomItem: {
      root: ({
        props: p,
        variables: v,
      }: ComponentStyleFunctionParam<ToolbarCustomItemProps, CustomToolbarVariables>) => ({
        ...(v.isCt && {
          background: v.ctItemBackground,
          borderStyle: v.ctBorderStyle,
          borderWidth: v.ctBorderWidth,
          height: v.ctHeight,

          ...(v.isCtItemPrimary && { background: v.ctItemPrimaryBackground }),
          ...(v.isCtItemIndicator && { padding: v.ctItemIndicatorPadding }),

          ':focus-visible': {
            background: v.ctItemBackgroundHover,
            borderColor: v.ctItemBorderColorFocus,
            color: v.ctItemColorFocus,
          },
        }),
      }),
    },

    ToolbarItem: {
      root: ({
        props: p,
        variables: v,
      }: ComponentStyleFunctionParam<ToolbarItemProps, CustomToolbarVariables>) => {
        return {
          ...(v.isCt && {
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',

            background: v.ctItemBackground,
            borderStyle: v.ctBorderStyle,
            borderWidth: v.ctBorderWidth,
            borderRadius: 0,
            height: v.ctHeight,
            minWidth: v.ctHeight,
            color: v.ctItemColor,

            ...(p.active &&
              !v.isCtItemPrimary && {
                // active intentionally before primary and danger, only affects regular items
                color: v.ctItemActiveColor,
                background: v.ctItemActiveBackground,

                '::before': {
                  content: `''`,
                  position: 'absolute',
                  top: `-${v.ctBorderWidth}`,
                  left: `-${v.ctBorderWidth}`,
                  bottom: `-${v.ctBorderWidth}`,
                  right: `-${v.ctBorderWidth}`,
                  background: v.ctItemActiveBackgroundOverlay,

                  ':focus-visible': {
                    borderStyle: v.ctBorderStyle,
                    borderWidth: v.ctBorderWidth,
                    borderColor: v.ctItemBorderColorFocus,
                  },
                },
              }),

            ...(v.isCtItemDanger && {
              background: v.ctItemDangerBackground,
            }),

            ...(v.isCtItemPrimary && {
              background: v.ctItemPrimaryBackground,
            }),

            ':hover': {
              color: v.ctItemColorHover,
              background: v.ctItemBackgroundHover,

              ...(v.isCtItemDanger && {
                color: v.ctItemDangerColorHover,
                background: v.ctItemDangerBackgroundHover,
              }),

              ...(v.isCtItemPrimary && {
                color: v.ctItemPrimaryColorHover,
                background: v.ctItemPrimaryBackgroundHover,
              }),
            },

            ...(v.isCtItemWithNotification && {
              '::after': {
                content: `''`,
                position: 'absolute',
                width: v.ctItemNotificationSize,
                height: v.ctItemNotificationSize,
                borderRadius: '50%',
                background: v.ctItemNotificationBackgroundColor,
                transform: 'translateX(100%) translateY(-100%)',
              },
            }),

            ':focus-visible': {
              background: v.ctItemBackgroundHover,
              borderColor: v.ctItemBorderColorFocus,
              color: v.ctItemColorFocus,

              ...(v.isCtItemDanger && {
                color: v.ctItemDangerColorHover,
                background: v.ctItemDangerBackgroundHover,
              }),

              ...(v.isCtItemPrimary && {
                color: v.ctItemPrimaryColorHover,
                background: v.ctItemPrimaryBackgroundHover,
              }),
            },
          }),

          ...(v.isCtItemIconNoFill && {
            '& .ui-icon__filled': {
              display: 'none',
            },
            '& .ui-icon__outline': {
              display: 'block',
            },
            '&:hover .ui-icon__filled': {
              display: 'none',
            },
            '&:hover .ui-icon__outline': {
              display: 'block',
            },
          }),
        }
      },
    },

    ToolbarDivider: {
      root: ({
        props: p,
        variables: v,
      }: ComponentStyleFunctionParam<ToolbarDividerProps, CustomToolbarVariables>) => ({
        ...(v.isCt && {
          margin: 0,
        }),
      }),
    },
  },
}

const tooltips = {
  videoOn: 'Turn camera off',
  videoOff: 'Turn camera on',
  micOn: 'Mute',
  micOff: 'Unmute',
  share: 'Share',
  shareStop: 'Stop sharing',
  endCall: 'Hang up',
  moreActions: 'More actions',
  chat: 'Show conversation',
  addParticipants: 'Add participants',
  pptNext: 'Navigate forward',
  pptPrevious: 'Navigate back',
}

interface CustomToolbarProps {
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

  chatHasNotification?: boolean

  pptSlide?: string
  onPptPrevClick?: () => void
  onPptNextClick?: () => void

  onEndCallClick?: () => void
}

type CustomToolbarLayout = (
  props: CustomToolbarProps,
) => ShorthandCollection<ToolbarItemProps | ToolbarCustomItemProps, ToolbarItemShorthandKinds>

const commonLayout: CustomToolbarLayout = props =>
  [
    props.isRecording && {
      key: 'recording',
      kind: 'custom' as ToolbarItemShorthandKinds,
      focusable: true,
      content: (
        <Status state="error" title="Recording" variables={{ isRecordingIndicator: true }} />
      ),
      variables: { isCtItemPrimary: true, isCtItemIndicator: true },
    },

    {
      key: 'timer-custom',
      kind: 'custom' as ToolbarItemShorthandKinds,
      focusable: true,
      content: <Text>10:45</Text>,
      variables: { isCtItemPrimary: true, isCtItemIndicator: true },
    },

    { key: 'timer-divider', kind: 'divider' as ToolbarItemShorthandKinds },

    {
      tooltip: props.cameraActive ? tooltips.videoOn : tooltips.videoOff,
      active: props.cameraActive,
      icon: {
        name: props.cameraActive ? 'call-video' : 'call-video-off',
        size: 'large' as SizeValue,
      },
      key: 'camera',
      onClick: () => _.invoke(props, 'onCameraChange', !props.cameraActive),
      variables: { isCtItemPrimary: true },
    },

    {
      tooltip: props.micActive ? tooltips.micOn : tooltips.micOff,
      active: props.micActive,
      icon: {
        name: props.micActive ? 'mic' : 'mic-off',
        size: 'large' as SizeValue,
      },
      key: 'mic',
      onClick: () => _.invoke(props, 'onMicChange', !props.micActive),
      variables: { isCtItemPrimary: true },
    },

    {
      tooltip: props.screenShareActive ? tooltips.shareStop : tooltips.share,
      active: props.screenShareActive,
      icon: {
        name: props.screenShareActive ? 'call-control-close-tray' : 'call-control-present-new',
        size: 'large' as SizeValue,
      },
      key: 'screen-share',
      onClick: () => _.invoke(props, 'onScreenShareChange', !props.screenShareActive),
      variables: { isCtItemPrimary: true },
    },

    {
      tooltip: tooltips.moreActions,
      key: 'more',
      icon: {
        name: 'more',
        size: 'large' as SizeValue,
      },
      onClick: () => _.invoke(props, 'onMoreClick'),
      variables: { isCtItemPrimary: true },
    },
  ].filter(Boolean)

const sidebarButtons: CustomToolbarLayout = props => [
  {
    tooltip: tooltips.chat,
    active: props.sidebarSelected === 'chat',
    icon: {
      name: 'chat',
      outline: true,
      size: 'large' as SizeValue,
    },
    key: 'chat',
    onClick: () =>
      _.invoke(props, 'onSidebarChange', props.sidebarSelected === 'chat' ? false : 'chat'),
    variables: { isCtItemWithNotification: props.chatHasNotification, isCtItemIconNoFill: true },
  },
  {
    tooltip: tooltips.addParticipants,
    active: props.sidebarSelected === 'participant-add',
    icon: {
      name: 'participant-add',
      outline: true,
      size: 'large' as SizeValue,
    },
    key: 'participant-add',
    onClick: () =>
      _.invoke(
        props,
        'onSidebarChange',
        props.sidebarSelected === 'participant-add' ? false : 'participant-add',
      ),
    variables: { isCtItemIconNoFill: true },
  },
]

const layoutItems: ShorthandValue<ToolbarItemProps> = {
  endCall: props => ({
    tooltip: tooltips.endCall,
    key: 'end-call',
    icon: {
      name: 'call-end',
      size: 'large',
    },
    onClick: () => _.invoke(props, 'onEndCallClick'),
    variables: { isCtItemDanger: true },
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

    {
      tooltip: tooltips.shareStop,
      key: 'stop-sharing',
      icon: {
        name: 'call-control-stop-presenting-new',
        size: 'large',
      },
      onClick: () => _.invoke(props, 'onStopSharingClick'),
    },

    {
      'aria-label': `${props.pptSlide} ${tooltips.pptPrevious}`,
      tooltip: tooltips.pptPrevious,
      key: 'ppt-prev',
      icon: {
        name: 'chevron-down',
        rotate: 90,
        outline: true,
      },
      onClick: () => _.invoke(props, 'onPptPrevClick'),
    },

    {
      key: 'ppt-slide-number',
      kind: 'custom',
      fitted: true,
      content: <Text size="small">{props.pptSlide}</Text>,
    },

    {
      'aria-label': `${props.pptSlide} ${tooltips.pptNext}`,
      tooltip: tooltips.pptNext,
      key: 'ppt-next',
      icon: {
        name: 'chevron-down',
        rotate: -90,
        outline: true,
      },
      onClick: () => _.invoke(props, 'onPptNextClick'),
    },

    layoutItems.endCall(props),
  ],
}

const CustomToolbar: React.FunctionComponent<CustomToolbarProps> = props => {
  const { layout = 'standard' } = props

  const items = layouts[layout](props).map(item =>
    _.isNil((item as any).tooltip)
      ? item
      : render =>
          render(
            item, // rendering Tooltip for the Toolbar Item
            (ToolbarItem, props) => {
              const { tooltip, key, ...rest } = props // Adding tooltipAsLabelBehavior as the ToolbarItems contains only icon

              return (
                <Tooltip
                  key={key}
                  trigger={<ToolbarItem {...rest} />}
                  accessibility={tooltipAsLabelBehavior}
                  content={tooltip}
                />
              )
            },
          ),
  )

  return <Toolbar variables={{ isCt: true }} items={items} />
}

const CustomToolbarPrototype: React.FunctionComponent = () => {
  let theme = {}
  theme = mergeThemes(themes.teamsDark, darkThemeOverrides)

  return (
    <Provider theme={theme}>
      <CustomToolbar
        layout="standard"
        isRecording={true}
        cameraActive={true}
        micActive={true}
        screenShareActive={true}
        sidebarSelected={false}
        chatHasNotification={true}
        pptSlide={`${1} of ${2}`}
      />
    </Provider>
  )
}

export default CustomToolbarPrototype
