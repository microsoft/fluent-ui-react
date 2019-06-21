import * as React from 'react'
import { Toolbar, Provider } from '@stardust-ui/react'

const UBar = ({ time = '', onCallVideo = undefined, onMic = undefined, ...rest }) => {
  const [callVideo, setCallVideo] = React.useState(true)
  const [mic, setMic] = React.useState(true)

  const createToggleButtonConfig = ({ iconOn, iconOff, isOn, setOn, onChange }) => ({
    icon: {
      name: isOn ? iconOn : iconOff,
      size: 'large',
    },
    onClick: () => {
      onChange(!isOn)
      setOn(!isOn)
    },
  })

  const items = [
    <div style={{ margin: '8px 16px' }}>{time}</div>,
    { kind: 'divider' },
    createToggleButtonConfig({
      iconOn: 'call-video',
      iconOff: 'call-video-off',
      isOn: callVideo,
      setOn: setCallVideo,
      onChange: onCallVideo,
    }),
    createToggleButtonConfig({
      iconOn: 'mic',
      iconOff: 'mic-off',
      isOn: mic,
      setOn: setMic,
      onChange: onMic,
    }),

    {
      icon: {
        name: 'chat',
        outline: true,
        size: 'large',
      },
      variables: { background: 'rgba(41,40,40,.9)', noFillOnHover: true },
    },
    { kind: 'divider' },
    {
      icon: {
        name: 'participant-add',
        outline: true,
        size: 'large',
      },
      variables: { background: 'rgba(41,40,40,.9)', noFillOnHover: true },
    },

    {
      icon: { name: 'call-end', size: 'large' },
      variables: siteVariables => {
        // console.log(siteVariables)
        return {
          background: '#9d2f42',
          backgroundHover: siteVariables.colorScheme.red.backgroundHover,
          foregroundHover: siteVariables.colorScheme.red.foregroundHover,
        }
      },
    },
  ]

  // having
  const theme = {
    componentStyles: {
      Toolbar: {
        root: {
          background: 'rgba(59,58,58,.95)',
          borderRadius: '3px',
          overflow: 'hidden',
        },
      },
      ToolbarItem: {
        root: ({ variables }) => ({
          ...(variables.noFillOnHover && {
            '&:hover .ui-icon__filled': {
              display: 'none',
            },
            '&:hover .ui-icon__outline': {
              display: 'block',
            },
          }),
          height: '52px',
          width: '52px',
        }),
      },
      ToolbarDivider: {
        root: ({ theme }) => ({
          borderColor: theme.siteVariables.colorScheme.default.border3,
        }),
      },
    },
  }

  return (
    <Provider {...rest} theme={theme} variables={{ background: 'transparent' }}>
      <Toolbar
        variables={{
          dividerMargin: 0,
          backgroundHover: '#343441',
          borderRadius: 0,
        }}
        items={items}
      />
    </Provider>
  )
}

export default UBar
