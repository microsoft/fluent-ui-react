import { TeamsSvgIconSpec } from '../types'

import bold from './bold'
import call from './call'
import callEnd from './callEnd'
import callVideo from './callIncomingVideo'
import callVideoOff from './callIncomingVideoOff'
import callStartPresenting from './callControlPresentNew'
import callStopPresenting from './callControlStopPresentingNew'
import callMicrophone from './callMicrophone'
import callMicrophoneOff from './callMicrophoneOff'
import more from './more'
import teamCreate from './teamCreate'
import umbrella from './umbrella'
import teams from './teams'

export default {
  bold,
  call,
  'call-end': callEnd,
  'call-video': callVideo,
  'call-video-off': callVideoOff,
  'call-start-presenting': callStartPresenting,
  'call-stop-presenting': callStopPresenting,
  'call-microphone': callMicrophone,
  'call-microphone-off': callMicrophoneOff,
  more,
  'team-create': teamCreate,
  umbrella,
  teams,
} as { [iconName: string]: TeamsSvgIconSpec }
