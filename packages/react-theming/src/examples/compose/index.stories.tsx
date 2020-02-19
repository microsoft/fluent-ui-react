import React from 'react';

import { ThemeProvider } from './../../components/ThemeProvider/ThemeProvider';
import { compose } from './../../compose';
import { Variant } from './../../variant';
import { theme } from './../theme';

export default {
  component: 'compose',
  title: 'Compose Demos',
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
