import { IClasses, ISlotProps, IWithSlots, IWithClasses } from '@fluentui/react-theming';

export interface ICheckboxSlots {
  /** Intended to contain the Checkbox. */
  root: string | React.ReactType;

  /** The checkbox box containing the icon. */
  box: string | React.ReactType;

  /** Custom icon that defines the checkmark rendered by the checkbox. */
  icon: string | React.ReactType;

  /** The text content next to the checkbox. */
  label: string | React.ReactType;

  /** The input element that represents the actual checkbox. */
  input: string | React.ReactType;
}

export type ICheckboxSlotProps = ISlotProps<ICheckboxSlots>;

export interface ICheckboxClasses extends IClasses<ICheckboxSlots> {
  disabled: string;
  checked: string;
  focused: string;
}

export interface ICheckboxProps
  extends IWithSlots<ICheckboxSlots>,
    IWithClasses<ICheckboxClasses>,
    React.HTMLAttributes<any> {
  id?: string;

  as?: string;

  className?: string;

  /** Defines whether default value of the checkbox is checked or unchecked. (Controlled) */
  checked?: boolean;

  /** Defines the default value of the checkbox for uncontrolled scenarios. */
  defaultChecked?: boolean;

  /** Defines whether the Checkbox is in an enabled or disabled state. */
  disabled?: boolean;

  /** Defines the label position (start or end.) */
  labelPosition?: 'start' | 'end';

  /** Content rendered in the label area. */
  label?: string | JSX.Element;

  /** Defines a callback that is triggered when the Checkbox is toggled. */
  onChange?: (ev: React.FormEvent, checked?: boolean) => void;
}
