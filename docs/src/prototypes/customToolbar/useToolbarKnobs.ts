import { useBooleanKnob, useSelectKnob } from '@stardust-ui/docs-components'
import { CustomToolbarProps } from './CustomToolbar'

const useToolbarKnobs = () => {
  const [rtl] = useBooleanKnob({
    name: 'RTL',
    initialValue: false,
  })
  const [themeName] = useSelectKnob({
    name: 'themeName',
    values: ['teamsDark', 'teamsHighContrast'],
    initialValue: 'teamsDark',
  })

  const availableLayouts: CustomToolbarProps['layout'][] = [
    'standard',
    'desktop-share',
    'powerpoint-presenter',
  ]
  const [layout] = useSelectKnob({
    name: 'layout',
    values: availableLayouts,
    initialValue: undefined,
  })

  const [isRecording] = useBooleanKnob({
    name: 'isRecording',
    initialValue: false,
  })
  const [cameraActive, onCameraChange] = useBooleanKnob({
    name: 'cameraActive',
    initialValue: true,
  })
  const [micActive, onMicChange] = useBooleanKnob({ name: 'micActive', initialValue: true })
  const [screenShareActive, onScreenShareChange] = useBooleanKnob({
    name: 'screenShareActive',
    initialValue: false,
  })
  const [sidebarSelected, onSidebarChange] = useSelectKnob<'false' | 'chat' | 'participant-add'>({
    name: 'sidebarSelected',
    values: ['false', 'chat', 'participant-add'],
    initialValue: 'false',
  })
  const [chatHasNotification] = useBooleanKnob({ name: 'chatHasNotification', initialValue: false })

  return {
    rtl,
    themeName,
    layout,
    isRecording,
    cameraActive,
    onCameraChange,
    micActive,
    onMicChange,
    screenShareActive,
    onScreenShareChange,
    sidebarSelected,
    onSidebarChange,
    chatHasNotification,
  }
}

export default useToolbarKnobs
