import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ExternalExampleLayout from './components/ExternalExampleLayout'
import DocsLayout from './components/DocsLayout'
import DocsRoot from './components/DocsRoot'

import Accessibility from './views/Accessibility'
import ColorPalette from './views/ColorPalette'

import FAQ from './views/FAQ'
import ShorthandProps from './views/ShorthandProps'
import Introduction from './views/Introduction'
import PageNotFound from './views/PageNotFound'
import QuickStart from './views/QuickStart'
import Theming from './views/Theming'
import ThemingExamples from './views/ThemingExamples'
import LayoutGuide from './views/Layout'
import IntegrateCustomComponents from './views/IntegrateCustomComponents'
import AccessibilityBehaviors from './views/AccessibilityBehaviors'
import FocusZone from './views/FocusZone'
import FocusTrapZone from './views/FocusTrapZone'
import AutoFocusZone from './views/AutoFocusZone'

const Router = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Switch>
      <Route exact path="/maximize/:exampleName/:rtl?" component={ExternalExampleLayout} />
      <Switch>
        <DocsLayout exact path="/" component={Introduction} />
        <DocsLayout exact path="/:type/:name" component={DocsRoot} sidebar />
        <DocsLayout exact path="/quick-start" component={QuickStart} />
        {process.env.NODE_ENV !== 'production' && [
          <DocsLayout
            exact
            key="/prototype-chat-pane"
            path="/prototype-chat-pane"
            component={require('./prototypes/chatPane/index').default}
          />,
          <DocsLayout
            exact
            key="/prototype-chat-messages"
            path="/prototype-chat-messages"
            component={require('./prototypes/chatMessages/index').default}
          />,
          ,
          <DocsLayout
            exact
            key="/prototype-async-shorthand"
            path="/prototype-async-shorthand"
            component={require('./prototypes/AsyncShorthand/index').default}
          />,
          <DocsLayout
            exact
            key="/prototype-employee-card"
            path="/prototype-employee-card"
            component={require('./prototypes/employeeCard/index').default}
          />,
          <DocsLayout
            exact
            key="/prototype-meeting-options"
            path="/prototype-meeting-options"
            component={require('./prototypes/meetingOptions/index').default}
          />,
          <DocsLayout
            exact
            key="/prototype-search-page"
            path="/prototype-search-page"
            component={require('./prototypes/SearchPage/index').default}
          />,
          <DocsLayout
            exact
            key="/prototype-dropdowns"
            path="/prototype-dropdowns"
            component={require('./prototypes/dropdowns/index').default}
          />,
          <DocsLayout
            exact
            key="/prototype-popups"
            path="/prototype-popups"
            component={require('./prototypes/popups/index').default}
          />,
          <DocsLayout
            exact
            key="/icon-viewer"
            path="/icon-viewer"
            component={require('./prototypes/IconViewer/index').default}
          />,
          <DocsLayout
            exact
            key="/menu-button"
            path="/menu-button"
            component={require('./prototypes/MenuButton/index').default}
          />,
          <DocsLayout
            exact
            key="/prototype-alerts"
            path="/prototype-alerts"
            component={require('./prototypes/alerts/index').default}
          />,
        ]}
        <DocsLayout exact path="/faq" component={FAQ} />
        <DocsLayout exact path="/accessibility" component={Accessibility} />
        <DocsLayout exact path="/accessibility-behaviors" component={AccessibilityBehaviors} />
        <DocsLayout exact path="/focus-zone" component={FocusZone} />
        <DocsLayout exact path="/focus-trap-zone" component={FocusTrapZone} />
        <DocsLayout exact path="/auto-focus-zone" component={AutoFocusZone} />
        <DocsLayout exact path="/theming" component={Theming} />
        <DocsLayout exact path="/theming-examples" component={ThemingExamples} />
        <DocsLayout exact path="/layout" component={LayoutGuide} />
        <DocsLayout exact path="/shorthand-props" component={ShorthandProps} />
        <DocsLayout
          exact
          path="/integrate-custom-components"
          component={IntegrateCustomComponents}
        />
        <DocsLayout exact path="/color-palette" component={ColorPalette} />
        <DocsLayout exact path="/*" component={PageNotFound} />
      </Switch>
    </Switch>
  </BrowserRouter>
)

export default Router
