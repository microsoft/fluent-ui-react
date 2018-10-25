import { pxToRem } from 'src/lib'
import { ICSSInJSStyle } from 'src/themes/types'
import siteVars from '../reactiveConfSpeakers/siteVariables'

export type TChatPeoplePickerStyles = {
  containerDiv: ICSSInJSStyle
  containerDivFocused: ICSSInJSStyle
  addedPeopleLabel: {
    styles: ICSSInJSStyle
    variables: {}
  }
  peopleLabel: {
    styles: ICSSInJSStyle
    variables: {}
  }
  inputComp: {
    styles: ICSSInJSStyle
    variables: {}
  }
  inputSlot: {
    styles: ICSSInJSStyle
  }
  labelIcon: {
    variables: {}
  }
  listboxUL: ICSSInJSStyle
  ariaLive: ICSSInJSStyle
}

export const peoplePickerStyles: TChatPeoplePickerStyles = {
  containerDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    outline: 0,
    border: 0,
    borderRadius: `${pxToRem(5)}`,
    borderBottom: `${pxToRem(3)} solid transparent`,
    backgroundColor: siteVars.black,
    borderColor: 'transparent',
    width: '30rem',
  },
  containerDivFocused: {
    borderColor: siteVars.green,
  },
  addedPeopleLabel: {
    styles: { margin: '.4rem 0 0 .4rem' },
    variables: { color: siteVars.white, backgroundColor: siteVars.gray },
  },
  peopleLabel: {
    styles: { fontSize: pxToRem(16), fontWeight: 'bold' },
    variables: { color: siteVars.white, backgroundColor: siteVars.black },
  },
  inputComp: {
    styles: {
      flexBasis: '100px',
      flexGrow: 1,
    },
    variables: {
      fontColor: siteVars.white,
      backgroundColor: siteVars.black,
      inputFocusBorderColor: 'transparent',
    },
  },
  inputSlot: {
    styles: {
      width: '100%',
    },
  },
  labelIcon: {
    variables: { color: siteVars.white },
  },
  listboxUL: {
    position: 'absolute',
    zIndex: 1000,
    maxHeight: '20rem',
    overflowY: 'hidden',
    width: '30rem',
  },
  ariaLive: {
    border: '0px',
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    margin: '-1px',
    overflow: 'hidden',
    padding: '0px',
    width: '1px',
    position: 'absolute',
  },
}
