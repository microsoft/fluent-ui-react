import * as React from 'react'
import { Link } from 'react-router-dom'
import { Alert } from '@stardust-ui/react'

import Types from './Types'

const HeaderExamples = () => (
  <>
    <Alert styles={{ display: 'block' }} warning>
      <p>
        <code>Box</code> component should be used carefully, in almost all cases you don't need it.
      </p>
      <ul>
        <li>
          For layouts and positioning refer to <Link to="/components/flex">Flex</Link> and{' '}
          <Link to="/components/grid">Grid</Link> components (and general{' '}
          <Link to="/layout">Layout guide</Link>).
        </li>
        <li>
          Consider to use <Link to="/components/text">Text</Link> component to wrap text.
        </li>
        <li>In other cases consider to style existing components via theming features.</li>
        <li>
          You also can{' '}
          <Link to="/integrate-custom-components">create your own custom component</Link> for custom
          behaviors.
        </li>
      </ul>
      <p>
        Remember that <code>styles</code> prop applied directly to an element most probably will
        break theme switching scenarios - thus, prefer to use <code>variables</code> instead of{' '}
        <code>styles</code> for overrides.
      </p>
    </Alert>

    <Types />
  </>
)

export default HeaderExamples
