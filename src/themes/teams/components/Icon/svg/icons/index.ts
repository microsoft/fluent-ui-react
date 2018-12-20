import { TeamsSvgIconSpec } from '../types'

import add from './add'
import addParticipant from './addParticipant'
import bold from './bold'
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
import codeSnippet from './codeSnippet'
import edit from './edit'
import emoji from './emoji'
import error from './error'
import fontColor from './fontColor'
import fontSize from './fontSize'
import format from './format'
import gallery from './gallery'
import giphy from './giphy'
import highlight from './highlight'
import horizontalRule from './horizontalRule'
import indent from './indent'
import italic from './italic'
import leave from './leave'
import like from './like'
import link from './link'
import markAsUnread from './markAsUnread'
import meetingNew from './meetingNew'
import mention from './mention'
import menu from './menu'
import mic from './mic'
import micOff from './micOff'
import more from './more'
import numberList from './numberList'
import outdent from './outdent'
import participantRemove from './participantRemove'
import quote from './quote'
import redbang from './redbang'
import redo from './redo'
import removeFormat from './removeFormat'
import reply from './reply'
import retry from './retry'
import send from './send'
import sticker from './sticker'
import strike from './strike'
import table from './table'
import tableAdd from './tableAdd'
import tableDelete from './tableDelete'
import teamCreate from './teamCreate'
import teams from './teams'
import translation from './translation'
import trashCan from './trashCan'
import underline from './underline'
import undo from './undo'

export default {
  add,
  bold,
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
  'code-snippet': codeSnippet,
  edit,
  emoji,
  error,
  format,
  'font-color': fontColor,
  'font-size': fontSize,
  gallery,
  giphy,
  highlight,
  'horizontal-rule': horizontalRule,
  indent,
  italic,
  leave,
  like,
  link,
  'mark-as-unread': markAsUnread,
  'meeting-new': meetingNew,
  mention,
  menu,
  mic,
  'mic-off': micOff,
  more,
  'number-list': numberList,
  outdent,
  'participant-add': addParticipant,
  'participant-remove': participantRemove,
  quote,
  redbang,
  redo,
  'remove-format': removeFormat,
  reply,
  retry,
  send,
  sticker,
  strike,
  table,
  'table-add': tableAdd,
  'table-delete': tableDelete,
  teams,
  translation,
  'trash-can': trashCan,
  'team-create': teamCreate,
  underline,
  undo,
} as { [iconName: string]: TeamsSvgIconSpec }
