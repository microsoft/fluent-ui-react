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

import horizontalRule from './horizontalRule'
import indent from './indent'
import leave from './leave'
import like from './like'
import markAsUnread from './markAsUnread'
import mention from './mention'
import menu from './menu'
import mic from './mic'
import micOff from './micOff'
import more from './more'
import outdent from './outdent'
import participantRemove from './participantRemove'
import redbang from './redbang'
import redo from './redo'
import removeFormat from './removeFormat'
import reply from './reply'
import retry from './retry'
import send from './send'
import strike from './strike'
import teamCreate from './teamCreate'
import teams from './teams'
import translation from './translation'
import trashCan from './trashCan'
import undo from './undo'

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
  'horizontal-rule': horizontalRule,
  indent,
  leave,
  like,
  'mark-as-unread': markAsUnread,
  mention,
  menu,
  mic,
  'mic-off': micOff,
  more,
  outdent,
  'participant-add': addParticipant,
  'participant-remove': participantRemove,
  redbang,
  redo,
  'remove-format': removeFormat,
  reply,
  retry,
  send,
  strike,
  teams,
  translation,
  'trash-can': trashCan,
  'team-create': teamCreate,
  undo,
} as { [iconName: string]: TeamsSvgIconSpec }
