import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ExternalExampleLayout from './components/ExternalExampleLayout'
import DocsLayout from './components/DocsLayout'
import DocsRoot from './components/DocsRoot'
import MarkdownPage from 'docs/src/components/MarkdownPage'

import * as Composition from './pages/Composition.mdx'
import Accessibility from './views/Accessibility'
import Colors from './views/Colors'
import ColorPalette from './views/ColorPalette'
import ColorSchemes from './views/ColorSchemes'

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
            component={ChatPanePrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-chat-messages"
            path="/prototype-chat-messages"
            component={ChatMessagesPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-custom-toolbar"
            path="/prototype-custom-toolbar"
            component={CustomToolbarPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-async-shorthand"
            path="/prototype-async-shorthand"
            component={AsyncShorthandPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-employee-card"
            path="/prototype-employee-card"
            component={EmployeeCardPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-meeting-options"
            path="/prototype-meeting-options"
            component={MeetingOptionsPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-search-page"
            path="/prototype-search-page"
            component={SearchPagePrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-mentions"
            path="/prototype-mentions"
            component={MentionsPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-dropdowns"
            path="/prototype-dropdowns"
            component={DropdownsPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-popups"
            path="/prototype-popups"
            component={PopupsPrototype}
          />,
          <DocsLayout
            exact
            key="/icon-viewer"
            path="/icon-viewer"
            component={IconViewerPrototype}
          />,
          <DocsLayout
            exact
            key="/menu-button"
            path="/menu-button"
            component={MenuButtonPrototype}
          />,
          <DocsLayout
            exact
            key="/prototype-alerts"
            path="/prototype-alerts"
            component={AlertsPrototype}
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
        <MarkdownPage exact path="/composition" page={Composition} />
        <DocsLayout exact path="/colors" component={Colors} />
        <DocsLayout exact path="/color-palette" component={ColorPalette} />
        <DocsLayout exact path="/color-schemes" component={ColorSchemes} />
        <DocsLayout exact path="/*" component={PageNotFound} />
      </Switch>
    </Switch>
  </BrowserRouter>
)

export default Router
