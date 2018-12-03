import { TeamsSvgIconSpec } from '../types'

import add from './add'
import addParticipant from './addParticipant'
import bookmark from './bookmark'
import bullets from './bullets'
import calendar from './calendar'
import call from './call'
import screenshare from './screenshare'
import screenshareStop from './screenshareStop'
import callEnd from './callEnd'
import callVideo from './callVideo'
import callVideoOff from './callVideoOff'
import edit from './edit'
import error from './error'
import fontColor from './fontColor'
import fontSize from './fontSize'
import format from './format'
import gallery from './gallery'
import giphy from './giphy'
import highlight from './highlight'
import leave from './leave'
import thumbsUp from './thumbsUp'
import markAsUnread from './markAsUnread'
import mention from './mention'
import menu from './menu'
import mic from './mic'
import micOff from './micOff'
import more from './more'
import participantRemove from './participantRemove'
import redbang from './redbang'
import reply from './reply'
import retry from './retry'
import send from './send'
import teamCreate from './teamCreate'
import teams from './teams'
import translation from './translation'
import trashCan from './trashCan'

export default {
  add,
  bookmark,
  bullets,
  calendar,
  call,
  'call-end': callEnd,
  'call-video': callVideo,
  'call-video-off': callVideoOff,
  edit,
  error,
  format,
  'font-color': fontColor,
  'font-size': fontSize,
  gallery,
  giphy,
  highlight,
  leave,
  'thumbs-up': thumbsUp,
  'mark-as-unread': markAsUnread,
  mention,
  menu,
  mic,
  'mic-off': micOff,
  more,
  'participant-add': addParticipant,
  'participant-remove': participantRemove,
  redbang,
  reply,
  retry,
  screenshare,
  'screenshare-stop': screenshareStop,
  send,
  teams,
  translation,
  'trash-can': trashCan,
  'team-create': teamCreate,
} as { [iconName: string]: TeamsSvgIconSpec }
