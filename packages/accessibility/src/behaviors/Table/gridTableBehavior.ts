// import * as keyboardKey from 'keyboard-key'
import { Accessibility } from '../../types'
import { FocusZoneMode, FocusZoneDirection } from '../../focusZone/types'

const gridTableBehavior: Accessibility = (props: any) => ({
  attributes: {
    root: {
      role: 'grid',
    },
  },
  focusZone: {
    mode: FocusZoneMode.Embed,
    props: {
      direction: FocusZoneDirection.bidirectional,
    },
  },
  // keyActions: {
  //   root: {
  //     moveNextColumn: {
  //       keyCombinations: [{ keyCode: keyboardKey.ArrowRight }],
  //     },
  //     movePreviousColumn: {
  //       keyCombinations: [{ keyCode: keyboardKey.ArrowLeft }],
  //     },
  //     moveNextRow: {
  //       keyCombinations: [{ keyCode: keyboardKey.ArrowDown }],
  //     },
  //     movePreviousRow: {
  //       keyCombinations: [{ keyCode: keyboardKey.ArrowUp }],
  //     },
  //   },
  // },
})

export default gridTableBehavior
