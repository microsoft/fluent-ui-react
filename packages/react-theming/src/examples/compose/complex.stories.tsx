import React from 'react';

import { ThemeProvider } from './../../components/ThemeProvider/ThemeProvider';
import { compose } from './../../compose';
import { Variant } from './../../variant';
import { theme } from './../theme';

export default {
  component: 'complex compose',
  title: 'Slightly More Complex Compose Demos',
};

const BaseDisplay: React.FunctionComponent<{
  classes: any;
  slots: any;
  slotProps: any;
  title: string;
}> = props => {
  return (
    <div className={props.classes.root}>
      <props.slots.header className={props.classes.header}>{props.title}</props.slots.header>
      {props.children}
    </div>
  );
};

const ComposedDisplay = compose(BaseDisplay as any, {
  slots: {
    header: 'h2',
  },
  tokens: {
    fontWeight: 300,
    borderRadius: 0,
    disabled: false,
  },
  styles: (tokens: any) => {
    const style: any = {
      root: {
        background: 'red',
        borderRadius: tokens.borderRadius,
        margin: 10,
        padding: 10,
      },
      header: {
        fontWeight: tokens.fontWeight,
      },
    };
    if (!tokens.disabled) {
      style.root['&:hover'] = {
        background: 'blue',
      };
      style.header['&:hover'] = {
        textDecoration: 'underline',
      };
    } else {
      style.root.background = '#ddd';
      style.root.color = '#333';
    }
    return style;
  },
  variants: {
    disabled: Variant.boolean({ disabled: true }),
    strong: Variant.boolean({ fontWeight: 700 }),
    rounded: Variant.boolean({ borderRadius: 30 }),
  },
});

export const composedDemo = () => (
  <ThemeProvider theme={theme}>
    <ComposedDisplay>I am children</ComposedDisplay>
  </ThemeProvider>
);

export const variantDemo = () => {
  return (
    <ThemeProvider theme={theme}>
      <ComposedDisplay title="Lorem Ipsum">Default control</ComposedDisplay>
      <ComposedDisplay title="Lorem Ipsum" strong>
        Strong variant
      </ComposedDisplay>
      <ComposedDisplay title="Lorem Ipsum" rounded>
        Rounded variant
      </ComposedDisplay>
      <ComposedDisplay title="Lorem Ipsum" strong rounded>
        Strong &amp; rounded variants
      </ComposedDisplay>
      <ComposedDisplay title="Lorem Ipsum" disabled>
        Disabled variant
      </ComposedDisplay>
      <ComposedDisplay title="Lorem Ipsum" strong disabled>
        Strong &amp; Disabled variant
      </ComposedDisplay>
      <ComposedDisplay title="Lorem Ipsum" rounded disabled>
        Rounded &amp; Disabled variant
      </ComposedDisplay>
      <ComposedDisplay title="Lorem Ipsum" strong rounded disabled>
        Strong &amp; Rounded &amp; Disabled variants
      </ComposedDisplay>
    </ThemeProvider>
  );
};
