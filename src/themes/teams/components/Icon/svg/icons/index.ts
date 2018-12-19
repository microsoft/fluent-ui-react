import { TeamsSvgIconSpec } from '../types'

import add from './add'
import addParticipant from './addParticipant'
import bookmark from './bookmark'
import bullets from './bullets'
import calendar from './calendar'
import call from './call'
import callControlPresentNew from './callControlPresentNew'
import callControlStopPresentingNew from './callControlStopPresentingNew'
import callEnd from './callEnd'
import callRecording from './callRecording'
import callVideo from './callVideo'
import callVideoOff from './callVideoOff'
import canvasAddPage from './canvasAddPage'
import edit from './edit'
import error from './error'
import fontColor from './fontColor'
import fontSize from './fontSize'
import format from './format'
import gallery from './gallery'
import giphy from './giphy'
import highlight from './highlight'
import leave from './leave'
import like from './like'
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
import tableAdd from './tableAdd'
import tableDelete from './tableDelete'
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
  'call-control-present-new': callControlPresentNew,
  'call-control-stop-presenting-new': callControlStopPresentingNew,
  'call-recording': callRecording,
  'canvas-add-page': canvasAddPage,
  edit,
  error,
  format,
  'font-color': fontColor,
  'font-size': fontSize,
  gallery,
  giphy,
  highlight,
  leave,
  like,
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
  send,
  'table-add': tableAdd,
  'table-delete': tableDelete,
  teams,
  translation,
  'trash-can': trashCan,
  'team-create': teamCreate,
} as { [iconName: string]: TeamsSvgIconSpec }
