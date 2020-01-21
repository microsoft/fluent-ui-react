import * as React from 'react';
import { IComponentWithSlotsAndRef, getSlots } from '@fluentui/react-theming';
import { ILinkProps, ILinkSlots } from './Link.types';
import { useLink } from './useLink';

export const LinkBase: IComponentWithSlotsAndRef<ILinkProps, ILinkSlots> = React.forwardRef(
  (props: ILinkProps, componentRef: React.Ref<HTMLElement>) => {
    const { children } = props;
    const slots = getSlots(LinkBase, props);
    const { slotProps } = useLink(LinkBase, { ...props, componentRef });

    return <slots.root {...slotProps.root}>{children}</slots.root>;
  },
) as any;

LinkBase.slots = {
  root: 'a',
};

LinkBase.variants = ['disabled'];
