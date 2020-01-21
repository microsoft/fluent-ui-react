import React from 'react';
import { CheckboxBase } from '../Checkbox.base';
import { Checkbox, CheckboxFluentTheme } from '../Checkbox';
import { createTheme, ThemeProvider } from '@fluentui/react-theming';
import { FluentTheme } from '../styles/fluent/FluentTheme';

export default {
  component: 'Checkbox',
  title: 'Checkbox',
};

const theme = createTheme(FluentTheme, CheckboxFluentTheme);

export const baseCheckbox = () => (
  <CheckboxBase defaultChecked label="This renders as a checkbox" />
);

export const fluentCheckboxUncontrolled = () => (
  <ThemeProvider theme={theme}>
    <Checkbox label="Uncontrolled, unchecked" />
    <Checkbox disabled label="Uncontrolled, unchecked, disabled" />
    <Checkbox defaultChecked label="Uncontrolled, checked" />
    <Checkbox defaultChecked disabled label="Uncontrolled, checked, disabled" />
    <Checkbox
      label={
        <span>
          I am <b>bold</b>.
        </span>
      }
    />
  </ThemeProvider>
);

export const fluentCheckboxControlled = () => (
  <ThemeProvider theme={theme}>
    <Checkbox checked label="This is a controlled checkbox locked to checked" />
  </ThemeProvider>
);

export const CheckboxWithoutTheme = () => (
  <Checkbox checked label="This is a controlled checkbox locked to checked" />
);
