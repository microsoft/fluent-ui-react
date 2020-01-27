import { configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { addDecorator } from '@storybook/react';

addDecorator(withInfo());

const req = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  return req.keys().map(req);
}

configure(loadStories, module);
