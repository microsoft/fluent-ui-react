import { TeamsSvgIconSpec } from '../types'

import checkmark from './checkmark'
import plus from './plus'
import addParticipant from './addParticipant'
import analytics from './analytics'
import announcement from './announcement'
import apps from './apps'

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
import format from './format'
import giphy from './giphy'
import fontColor from './fontColor'
import fontSize from './fontSize'
import highlight from './highlight'

export default {
  checkmark,
  plus,
  addParticipant,
  analytics,
  announcement,
  apps,
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
  format,
  giphy,
  highlight,
  'font-color': fontColor,
  'font-size': fontSize,
} as { [iconName: string]: TeamsSvgIconSpec }
