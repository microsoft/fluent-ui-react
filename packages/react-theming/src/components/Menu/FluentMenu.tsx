import { BaseMenu } from './BaseMenu';
import { FluentMenuItem } from './FluentMenuItem';
import { createComponent } from '../../create-component/createComponent';

export const FluentMenu = createComponent('FluentMenu', BaseMenu, {
  slots: {
    item: FluentMenuItem,
  },
});
