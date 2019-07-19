import * as keyboardKey from 'keyboard-key'
import { Accessibility, treeBehavior, FocusZoneMode, FocusZoneDirection } from '@stardust-ui/react'

const overridenTreeBehavior: Accessibility<any> = props => {
  return {
    ...treeBehavior(props),
    focusZone: {
      mode: FocusZoneMode.Embed,
      props: {
        shouldEnterInnerZone: event => keyboardKey.getCode(event) === keyboardKey.Enter,
        direction: FocusZoneDirection.vertical,
      },
    },
  }
}
export default overridenTreeBehavior
