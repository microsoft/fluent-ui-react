import { ThemeAnimations } from '../../types'

export const animations: ThemeAnimations = {
  'stardust-menu-animation': 'fadeEnterFast',
  'stardust-popup-animation': 'fadeEnterFast',
  'stardust-other-animation': 'fadeEnterFast',
}

export const emptyAnimation: string = ''

export default (name: string): string => animations[name] || emptyAnimation
