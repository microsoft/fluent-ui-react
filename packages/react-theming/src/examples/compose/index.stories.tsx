import React from 'react';

import { initalize } from './../..';
import { ThemeProvider } from './../../components/ThemeProvider/ThemeProvider';
import { compose } from './../../compose';
import { Variant } from './../../variant';
import { ITheme, IColorRamp } from '../../theme.types';

initalize();

export default {
  component: 'compose',
  title: 'Compose Demos',
};

const emptyRamp: IColorRamp = { values: [], index: -1 };
const theme: ITheme = {
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

const BaseDiv: React.FunctionComponent<{ classes: any }> = props => {
  return <div className={props.classes.root}>{props.children}</div>;
};

const ComposedDiv = compose(BaseDiv as any, {
  tokens: {
    fontWeight: 300,
    borderRadius: 0,
  },
  styles: (tokens: any) => {
    return {
      root: {
        background: 'red',
        fontWeight: tokens.fontWeight,
        borderRadius: tokens.borderRadius,
        margin: 10,
        padding: 10,
      },
    };
  },
  variants: {
    strong: Variant.boolean({ fontWeight: 700 }),
    rounded: Variant.boolean({ borderRadius: 30 }),
  },
});

export const composedDemo = () => (
  <ThemeProvider theme={theme}>
    <ComposedDiv>I am children</ComposedDiv>
  </ThemeProvider>
);

export const variantDemo = () => {
  return (
    <ThemeProvider theme={theme}>
      <ComposedDiv>Default control</ComposedDiv>
      <ComposedDiv strong>Strong variant</ComposedDiv>
      <ComposedDiv rounded>Rounded variant</ComposedDiv>
      <ComposedDiv strong rounded>
        Strong &amp; rounded variants
      </ComposedDiv>
    </ThemeProvider>
  );
};
