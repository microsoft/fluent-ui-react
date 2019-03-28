import { ThemeIcons, ThemeIconSpec } from '../../../types'

const fontIcon = (content: string, fontFamily: string): ThemeIconSpec => ({
  icon: { content: `'\\${content}'`, fontFamily },
})

const normal = (content: string) => fontIcon(content, '"Font Awesome 5 Free"')

// Originally generated from:
// https://github.com/Semantic-Org/Semantic-UI-CSS/blob/master/components/icon.css
// Corrections were made to duplicate icon names and incorrectly mapped alternates
const fontAwesomeIcons: ThemeIcons = {
  'stardust-close': normal('f00d'),
  'stardust-arrow-down': normal('f0d7'),
  'stardust-arrow-end': normal('f0da'),
  'stardust-arrow-up': normal('f0d8'),
}

const emptyIcon = { icon: { content: '?', fontFamily: '' } }

export default (name: string): ThemeIconSpec => fontAwesomeIcons[name] || emptyIcon
