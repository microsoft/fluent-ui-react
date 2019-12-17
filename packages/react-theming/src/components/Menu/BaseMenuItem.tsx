import * as React from 'react';

interface IMenuItemProps {
  className?: string;
  slots?: any;
  slotProps?: any;
}

export const BaseMenuItem: React.FunctionComponent<IMenuItemProps> = props => {
  const { children, slots = {}, slotProps = {}, ...rest } = props;
  const { root: Root = 'div', text: Text, icon: Icon, menu: Menu } = slots;
  const {
    root: rootProps = {},
    text: textProps = {},
    icon: iconProps = {},
    menu: menuProps = {},
  } = slotProps;
  const rootClassName = `${rootProps.className || ''}${` ${rest && rest.className}` || ''}`;
  const content = children || (
    <>
      {Icon && <Icon {...iconProps} />}
      {Text && <Text {...textProps} />}
      {Menu && <Menu {...menuProps} />}
    </>
  );

  return (
    <Root {...rootProps} {...rest} className={rootClassName}>
      {content}
    </Root>
  );
};
