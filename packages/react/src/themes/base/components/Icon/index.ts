import { ThemeIcons, ThemeIconSpec } from '../../../types'

const fontIcon = (content: string): ThemeIconSpec => ({
  icon: { content: `'\\${content}'` },
})

export const icons: ThemeIcons = {
  'stardust-close': fontIcon('2715'),
  'stardust-arrow-down': fontIcon('25BE'),
  'stardust-arrow-end': fontIcon('25B8'),
  'stardust-arrow-up': fontIcon('25B4'),
  'stardust-pause': fontIcon('25B6'),
  'stardust-play': fontIcon('23F8'),
}

const emptyIcon = { icon: { content: '?' } }

export default (name: string): ThemeIconSpec => icons[name] || emptyIcon
