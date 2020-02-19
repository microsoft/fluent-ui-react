import { initializeStyling, IColorRamp, ITheme } from './../index';

initializeStyling();

const emptyRamp: IColorRamp = { values: [], index: -1 };
export const theme: ITheme = {
  components: {},
  colors: {
    background: 'white',
    bodyText: 'black',
    subText: 'black',
    disabledText: 'green',
    brand: emptyRamp,
    accent: emptyRamp,
    neutral: emptyRamp,
    success: emptyRamp,
    warning: emptyRamp,
    danger: emptyRamp,
  },
  fonts: {
    default: '',
    userContent: '',
    mono: '',
  },
  fontSizes: {
    base: 1,
    scale: 1,
    unit: 'rem',
  },
  animations: {
    fadeIn: {},
    fadeOut: {},
  },
  direction: 'ltr',
  spacing: {
    base: 0,
    scale: 0,
    unit: 'rem',
  },
  radius: {
    base: 0,
    scale: 0,
    unit: 'rem',
  },
  icons: {},
  schemes: {},
};
