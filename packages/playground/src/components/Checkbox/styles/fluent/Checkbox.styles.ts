import { ICheckboxClasses } from '../../Checkbox.types';

export type IStylesFor<TClasses> = {
  [key in keyof TClasses]?: any;
};

export const CheckboxStyles: IStylesFor<ICheckboxClasses> = {
  // Default slot styling
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    '&:hover $icon': {
      opacity: 1,
    },
    padding: 4,
  },

  box: {
    width: 20,
    height: 20,
    boxSizing: 'border-box',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(50,49,48)',
    borderRadius: 2,
    transitionProperty: 'background, border, border-color',
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4,0,0.23,1)',
  },

  icon: {
    color: 'rgb(96, 94, 92)',
  },

  label: {
    marginLeft: 8,
  },

  input: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    border: 'none',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    background: 'red',
  },

  focused: {
    '&:after': {
      pointerEvents: 'none',
      position: 'absolute',
      content: '""',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'rgb(50,49,48)',
      borderRadius: 3,
    },
  },

  // Variants
  checked: {
    '& $box': {
      backgroundColor: 'rgb(0, 120, 212)',
      borderColor: 'rgb(0, 120, 212)',
    },
    '&:hover $box': {
      backgroundColor: 'rgb(0, 90, 158)',
      borderColor: 'rgb(0, 90, 158)',
    },
  },

  disabled: {
    pointerEvents: 'none',
    '& $box': {
      backgroundColor: 'rgb(0, 120, 212)',
      borderColor: 'rgb(0, 120, 212)',
    },
    '&$checked $box': {
      backgroundColor: 'rgb(0, 120, 212)',
      borderColor: 'rgb(0, 120, 212)',
    },
  },
};
