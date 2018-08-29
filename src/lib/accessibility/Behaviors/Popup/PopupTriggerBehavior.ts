import { Accessibility } from '../../interfaces'
import ButtonBehavior from '../Button/ButtonBehavior'
import callable from '../../../callable'

const PopupTriggerBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      ...callable(ButtonBehavior)(props).attributes.root,
      tabIndex: props.as === 'button' ? undefined : 0,
      'aria-haspopup': 'true',
    },
  },
})

export default PopupTriggerBehavior
