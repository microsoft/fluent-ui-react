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
  const { disabled, href, componentRef, onKeyUp } = props;
  const rootRef = React.useRef<HTMLElement>(null);

  React.useImperativeHandle(componentRef, () => ({
    focus: () => {
      rootRef.current && rootRef.current.focus();
    },
  }));

  const onHandleKeyUp = (ev: React.KeyboardEvent) => {
    // If the Link is disabled we need to prevent navigation via 'Enter' key presses.
    if (disabled) {
      ev.preventDefault();
      return;
    }

    if (onKeyUp) {
      onKeyUp(ev);
    }
  };

  const slotProps = mergeSlotProps(Component, props, {
    root: {
      'aria-disabled': disabled,
      href,
      onKeyUp: onHandleKeyUp,
      ref: rootRef,
      role: 'link',
    },
  });

  return {
    slotProps,
    state: props,
  };
};
