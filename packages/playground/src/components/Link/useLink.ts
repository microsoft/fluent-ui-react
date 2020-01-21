import React from 'react';
import { mergeSlotProps, IStateProps } from '@fluentui/react-theming';
import { ILinkProps, ILinkSlots } from './Link.types';
import { IComponentWithExtras } from '@fluentui/react-theming/src/slots.types';

export interface ILinkState {
  onKeyDown: (ev: KeyboardEvent) => void;
  rootRef: React.Ref<Element>;
}

export const useLink = (
  Component: IComponentWithExtras<ILinkSlots>,
  props: IStateProps<ILinkProps>,
) => {
  const { disabled, href } = props;
  const rootRef = React.useRef<HTMLElement>(null);

  React.useImperativeHandle(props.componentRef, () => ({
    focus: () => {
      rootRef.current && rootRef.current.focus();
    },
  }));

  const onHandleKeyDown = (ev: KeyboardEvent) => {
    // If the Link is disabled we need to prevent navigation via 'Enter' key presses.
    if (disabled) {
      ev.preventDefault();
    }
  };

  const slotProps = mergeSlotProps(Component, props, {
    root: {
      'aria-disabled': disabled,
      href,
      onKeyDown: onHandleKeyDown,
      ref: rootRef,
      role: 'link',
      tabIndex: 0,
      type: 'link',
    },
  });

  return {
    slotProps,
    state: props,
  };
};
