import { compose } from '@fluentui/react-theming';
import { CheckboxBase } from './Checkbox.base';
import { CheckboxStyles } from './styles/fluent/Checkbox.styles';

export const CheckboxThemeName = 'Checkbox';

export const Checkbox = compose(CheckboxBase, { name: CheckboxThemeName });

// Use the Fluent Icon for the Fluent Checkbox.
// Checkbox.slots.icon = Icon;

/**
 * Option A: separate theme from themable component.
 * Option B: themable component comes with default.
 */
export const CheckboxFluentTheme = {
  components: {
    [CheckboxThemeName]: {
      styles: CheckboxStyles,
    },
  },
};
