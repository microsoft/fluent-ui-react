import { ColorNames } from 'src/themes/types'

interface Category {
  description: string
  color?: ColorNames
}

const categories: { [name: string]: Category } = {
  actionable: {
    description: 'Actionable components execute action when clicked',
    color: 'red',
  },
  input: {
    description: 'Input components allow user to enter data',
    color: 'green',
  },
  content: {
    description:
      'Content components provide information and content. Typically not actionable, can be used inside of actionable components',
    color: 'grey',
  },
  surface: {
    description: 'Surface components create additional surface in the page',
    color: 'orange',
  },
  layout: {
    description: 'Layout components arrange children components in the page',
    color: 'yellow',
  },
  utility: {
    description: 'Helpers',
  },
}

export default categories
