import { createTheme } from '@fluentui/react-theming';

const defaultColorRamp = {
  values: [],
  index: -1,
};

export const FluentTheme = createTheme({
  direction: 'ltr',
  colors: {
    background: 'white',
    bodyText: 'black',
    subText: '#333',
    disabledText: '#ccc',
    brand: defaultColorRamp,
    accent: defaultColorRamp,
    neutral: defaultColorRamp,
    success: defaultColorRamp,
    warning: defaultColorRamp,
    danger: defaultColorRamp,
    text: defaultColorRamp,
  },
  components: {},
  icons: {},
  radius: {
    base: 0,
    scale: 0,
    unit: 'px',
  },
  fonts: {
    default: '',
    userContent: '',
    mono: '',
  },
  fontSizes: {
    base: 0,
    scale: 0,
    unit: 'px',
  },
  animations: {
    fadeIn: {},
    fadeOut: {},
  },
  spacing: {
    base: 0,
    scale: 0,
    unit: 'px',
  },
  schemes: {
    header: {
      colors: {
        background: 'black',
        bodyText: 'white',
      },
    },
  },
});
