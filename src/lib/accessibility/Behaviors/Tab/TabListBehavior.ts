import { Accessibility } from '../../interfaces'

const TabListBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'tablist',
    },
  },
})

export default TabListBehavior
