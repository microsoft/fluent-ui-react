import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ExternalExampleLayout from './components/ExternalExampleLayout'
import DocsLayout from './components/DocsLayout'
import DocsRoot from './components/DocsRoot'
import MarkdownPage from 'docs/src/components/MarkdownPage'

import * as Composition from './pages/Composition.mdx'
import * as Layout from './pages/Layout.mdx'
import Accessibility from './views/Accessibility'
import Colors from './views/Colors'
import ColorPalette from './views/ColorPalette'
import ColorSchemes from './views/ColorSchemes'

import FAQ from './views/FAQ'
import * as ShorthandProps from './pages/ShorthandProps.mdx'
import Introduction from './views/Introduction'
import PageNotFound from './views/PageNotFound'
import QuickStart from './views/QuickStart'
import Theming from './views/Theming'
import ThemingExamples from './views/ThemingExamples'
import IntegrateCustomComponents from './views/IntegrateCustomComponents'
import AccessibilityBehaviors from './views/AccessibilityBehaviors'
import FocusZone from './views/FocusZone'
import FocusTrapZone from './views/FocusTrapZone'
import AutoFocusZone from './views/AutoFocusZone'
import CustomToolbarPrototype from './prototypes/customToolbar'
import ChatPanePrototype from './prototypes/chatPane'
import ChatMessagesPrototype from './prototypes/chatMessages'
import AsyncShorthandPrototype from './prototypes/AsyncShorthand'
import EmployeeCardPrototype from './prototypes/employeeCard'
import MeetingOptionsPrototype from './prototypes/meetingOptions'
import SearchPagePrototype from './prototypes/SearchPage'
import MentionsPrototype from './prototypes/mentions'
import DropdownsPrototype from './prototypes/dropdowns'
import PopupsPrototype from './prototypes/popups'
import IconViewerPrototype from './prototypes/IconViewer'
import MenuButtonPrototype from './prototypes/MenuButton'
import AlertsPrototype from './prototypes/alerts'
import BadgesPrototype from './prototypes/badges'

const Routes = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Switch>
      <Route exact path="/maximize/:exampleName/:rtl?" component={ExternalExampleLayout} />
      <DocsLayout>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route exact path="/:type/:name" component={DocsRoot} sidebar />
          <Route exact path="/quick-start" component={QuickStart} />
          {process.env.NODE_ENV !== 'production' && [
            <Route
              exact
              key="/prototype-chat-pane"
              path="/prototype-chat-pane"
              component={ChatPanePrototype}
            />,
            <Route
              exact
              key="/prototype-chat-messages"
              path="/prototype-chat-messages"
              component={ChatMessagesPrototype}
            />,
            <Route
              exact
              key="/prototype-custom-toolbar"
              path="/prototype-custom-toolbar"
              component={CustomToolbarPrototype}
            />,
            <Route
              exact
              key="/prototype-async-shorthand"
              path="/prototype-async-shorthand"
              component={AsyncShorthandPrototype}
            />,
            <Route
              exact
              key="/prototype-employee-card"
              path="/prototype-employee-card"
              component={EmployeeCardPrototype}
            />,
            <Route
              exact
              key="/prototype-meeting-options"
              path="/prototype-meeting-options"
              component={MeetingOptionsPrototype}
            />,
            <Route
              exact
              key="/prototype-search-page"
              path="/prototype-search-page"
              component={SearchPagePrototype}
            />,
            <Route
              exact
              key="/prototype-mentions"
              path="/prototype-mentions"
              component={MentionsPrototype}
            />,
            <Route
              exact
              key="/prototype-dropdowns"
              path="/prototype-dropdowns"
              component={DropdownsPrototype}
            />,
            <Route
              exact
              key="/prototype-popups"
              path="/prototype-popups"
              component={PopupsPrototype}
            />,
            <Route exact key="/icon-viewer" path="/icon-viewer" component={IconViewerPrototype} />,
            <Route exact key="/menu-button" path="/menu-button" component={MenuButtonPrototype} />,
            <Route
              exact
              key="/prototype-alerts"
              path="/prototype-alerts"
              component={AlertsPrototype}
            />,
            <Route
              exact
              key="/prototype-badges"
              path="/prototype-badges"
              component={BadgesPrototype}
            />,
          ]}
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/accessibility" component={Accessibility} />
          <Route exact path="/accessibility-behaviors" component={AccessibilityBehaviors} />
          <Route exact path="/focus-zone" component={FocusZone} />
          <Route exact path="/focus-trap-zone" component={FocusTrapZone} />
          <Route exact path="/auto-focus-zone" component={AutoFocusZone} />
          <Route exact path="/theming" component={Theming} />
          <Route exact path="/theming-examples" component={ThemingExamples} />
          <Route exact path="/layout">
            <MarkdownPage page={Layout} />
          </Route>
          <Route exact path="/shorthand-props">
            <MarkdownPage page={ShorthandProps} />
          </Route>
          <Route exact path="/integrate-custom-components" component={IntegrateCustomComponents} />
          <Route exact path="/composition">
            <MarkdownPage page={Composition} />
          </Route>
          <Route exact path="/colors" component={Colors} />
          <Route exact path="/color-palette" component={ColorPalette} />
          <Route exact path="/color-schemes" component={ColorSchemes} />
          <Route exact path="/*" component={PageNotFound} />
        </Switch>
      </DocsLayout>
    </Switch>
  </BrowserRouter>
)

export default Routes
