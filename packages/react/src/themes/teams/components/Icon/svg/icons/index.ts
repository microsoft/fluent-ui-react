import { TeamsSvgIconSpec } from '../types'

import accept from './accept'
import add from './add'
import addParticipant from './addParticipant'
import arrowUp from './arrowUp'
import arrowDown from './arrowDown'
import ban from './ban'
import bold from './bold'
import bookmark from './bookmark'
import bullets from './bullets'
import calendar from './calendar'
import call from './call'
import callControlPresentNew from './callControlPresentNew'
import callControlStopPresentingNew from './callControlStopPresentingNew'
import callEnd from './callEnd'
import callPstn from './callPstn'
import callRecording from './callRecording'
import callVideo from './callVideo'
import callVideoOff from './callVideoOff'
import canvasAddPage from './canvasAddPage'
import callMissedLine from './callMissedLine'
import chat from './chat'
import chevronDown from './chevronDown'
import close from './close'
import codeSnippet from './codeSnippet'
import filesAftereffects from './filesAftereffects'
import filesCode from './filesCode'
import filesEmpty from './filesEmpty'
import filesFlash from './filesFlash'
import filesGif from './filesGif'
import filesIllustrator from './filesIllustrator'
import filesImage from './filesImage'
import filesIndesign from './filesIndesign'
import filesPdf from './filesPdf'
import filesPhotoshop from './filesPhotoshop'
import filesSketch from './filesSketch'
import filesSound from './filesSound'
import filesTxt from './filesTxt'
import filesVideo from './filesVideo'
import filesZip from './filesZip'
import flag from './flag'
import download from './download'
import edit from './edit'
import email from './email'
import emoji from './emoji'
import error from './error'
import exclamationCircle from './exclamationCircle'
import eye from './eye'
import eyeSlash from './eyeSlash'
import filesExcel from './filesExcel'
import filesExcelBrand from './filesExcelBrand'
import filesOneNote from './filesOneNote'
import filesOneNoteBrand from './filesOneNoteBrand'
import filesPowerPoint from './filesPowerPoint'
import filesPowerPointBrand from './filesPowerPointBrand'
import filesWord from './filesWord'
import filesWordBrand from './filesWordBrand'
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
import lock from './lock'
import markAsUnread from './markAsUnread'
import meetingNew from './meetingNew'
import mention from './mention'
import menu from './menu'
import mic from './mic'
import micOff from './micOff'
import more from './more'
import numberList from './numberList'
import outdent from './outdent'
import pause from './pause'
import paperclip from './paperclip'
import participantRemove from './participantRemove'
import phoneClock from './phoneClock'
import play from './play'
import quote from './quote'
import readAloud from './read-aloud'
import redbang from './redbang'
import redo from './redo'
import removeFormat from './removeFormat'
import reply from './reply'
import retry from './retry'
import skypeLogo from './skypeLogo'
import search from './search'
import send from './send'
import settings from './settings'
import star from './star'
import sticker from './sticker'
import strike from './strike'
import table from './table'
import tableAdd from './tableAdd'
import tableDelete from './tableDelete'
import teamCreate from './teamCreate'
import teams from './teams'
import translation from './translation'
import trashCan from './trashCan'
import triangleDown from './triangleDown'
import triangleRight from './triangleRight'
import triangleUp from './triangleUp'
import underline from './underline'
import undo from './undo'
import urgent from './urgent'
import videoCameraEmphasis from './videoCameraEmphasis'

export default {
  accept,
  add,
  'arrow-up': arrowUp,
  'arrow-down': arrowDown,
  ban,
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
  'call-missed-line': callMissedLine,
  'call-pstn': callPstn,
  'call-recording': callRecording,
  'canvas-add-page': canvasAddPage,
  chat,
  'chevron-down': chevronDown,
  close,
  'code-snippet': codeSnippet,
  'files-aftereffects': filesAftereffects,
  'files-code': filesCode,
  'files-empty': filesEmpty,
  'files-flash': filesFlash,
  'files-gif': filesGif,
  'files-illustrator': filesIllustrator,
  'files-image': filesImage,
  'files-indesign': filesIndesign,
  'files-pdf': filesPdf,
  'files-photoshop': filesPhotoshop,
  'files-sketch': filesSketch,
  'files-sound': filesSound,
  'files-txt': filesTxt,
  'files-video': filesVideo,
  'files-zip': filesZip,
  flag,
  download,
  edit,
  email,
  emoji,
  error,
  'exclamation-circle': exclamationCircle,
  eye,
  'eye-slash': eyeSlash,
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
  lock,
  'mark-as-unread': markAsUnread,
  'meeting-new': meetingNew,
  mention,
  menu,
  mic,
  'mic-off': micOff,
  more,
  'number-list': numberList,
  outdent,
  paperclip,
  'participant-add': addParticipant,
  'participant-remove': participantRemove,
  pause,
  'phone-clock': phoneClock,
  play,
  quote,
  'read-aloud': readAloud,
  redbang,
  redo,
  'remove-format': removeFormat,
  reply,
  retry,
  'skype-logo': skypeLogo,
  search,
  send,
  settings,
  star,
  sticker,
  strike,
  table,
  'table-add': tableAdd,
  'table-delete': tableDelete,
  teams,
  translation,
  'trash-can': trashCan,
  'triangle-down': triangleDown,
  'triangle-right': triangleRight,
  'triangle-up': triangleUp,
  'team-create': teamCreate,
  underline,
  undo,
  urgent,
  'video-camera-emphasis': videoCameraEmphasis,

  // Office icons
  word: filesWord,
  excel: filesExcel,
  powerpoint: filesPowerPoint,
  onenote: filesOneNote,

  'word-color': filesWordBrand,
  'excel-color': filesExcelBrand,
  'powerpoint-color': filesPowerPointBrand,
  'onenote-color': filesOneNoteBrand,
} as { [iconName: string]: TeamsSvgIconSpec }
