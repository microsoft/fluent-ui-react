import { Accessibility } from '../../interfaces'

export const ImageBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: props['alt'] ? undefined : 'presentation',
    },
  },
})
