import { ICSSInJSStyle } from 'types/theme'
import { pxToRem } from 'src/lib'

export type TChatPeoplePickerStyles = {
  containerDiv: any
  containerDivFocused: any
  personContainerLabel: ICSSInJSStyle
  addPeopleLabel: ICSSInJSStyle
  editText: {
    input: ICSSInJSStyle
    div: any
    variables: { inputFocusBorderColor: any }
  }
  listboxUL: ICSSInJSStyle
  ariaLive: ICSSInJSStyle
  buttons: {
    both: ICSSInJSStyle
    add: ICSSInJSStyle
    cancel: ICSSInJSStyle
  }
}

export const peoplePickerStyles: TChatPeoplePickerStyles = {
  containerDiv: {
    display: 'flex',
    flexWrap: 'wrap',
    outline: 0,
    border: 0,
    borderRadius: `${pxToRem(3)}`,
    borderBottom: `${pxToRem(2)} solid transparent`,
    color: '#252423',
    backgroundColor: '#F3F2F1',
    borderColor: 'transparent',
  },
  personContainerLabel: { margin: '.4rem 0 0 .4rem' },
  containerDivFocused: {
    borderColor: '#6264A7',
    borderRadius: '0.2143rem 0.2143rem 0.1429rem 0.1429rem',
  },
  addPeopleLabel: { backgroundColor: '#f7f7f7' },
  editText: {
    input: {
      width: '100%',
    },
    variables: {
      inputFocusBorderColor: 'transparent',
    },
    div: {
      flexBasis: '100px',
      flexGrow: 1,
    },
  },
  listboxUL: {
    position: 'absolute',
    zIndex: 1000,
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
  buttons: {
    both: {
      marginTop: `${pxToRem(8)}`,
      textAlign: 'right',
    },
    add: {
      margin: `0 0 0 ${pxToRem(8)}`,
    },
    cancel: {
      margin: '0',
    },
  },
}
