import * as React from 'react';
import { BaseMenuItem } from './BaseMenuItem';

interface IMenuProps {
  className?: string;
  slots?: any;
  slotProps?: any;
}

export const BaseMenu: React.FunctionComponent<IMenuProps> = props => {
  const { slotProps = {}, slots = {}, ...rest } = props;
  const { item: MenuItem = BaseMenuItem, root: Root = 'div' } = slots;
  const { root: rootProps = {}, items = [] } = slotProps;
  const rootClassName = `${rootProps.className || ''}${` ${rest && rest.className}` || ''}`;
  return (
    <Root {...rootProps} {...rest} className={rootClassName}>
      {items.map((item: any) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </Root>
  );
};
