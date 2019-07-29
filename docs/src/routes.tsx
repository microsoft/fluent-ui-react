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
import FocusZone from './views/FocusZoneDoc'
import FocusTrapZone from './views/FocusTrapZoneDoc'
import AutoFocusZone from './views/AutoFocusZoneDoc'
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
import NestedPopupsAndDialogsPrototype from './prototypes/NestedPopupsAndDialogs'

const Routes = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Switch>
      <Route exact path="/maximize/:exampleName/:rtl?" component={ExternalExampleLayout} />
      <DocsLayout>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route exact path="/:type/:name" component={DocsRoot} sidebar />
          <Route exact path="/quick-start" component={QuickStart} />
          <Route exact path="/prototype-chat-pane" component={ChatPanePrototype} />
          <Route exact path="/prototype-chat-messages" component={ChatMessagesPrototype} />
          <Route exact path="/prototype-custom-toolbar" component={CustomToolbarPrototype} />
          <Route exact path="/prototype-async-shorthand" component={AsyncShorthandPrototype} />
          <Route exact path="/prototype-employee-card" component={EmployeeCardPrototype} />
          <Route exact path="/prototype-meeting-options" component={MeetingOptionsPrototype} />
          <Route exact path="/prototype-search-page" component={SearchPagePrototype} />
          <Route exact path="/prototype-mentions" component={MentionsPrototype} />
          <Route exact path="/prototype-dropdowns" component={DropdownsPrototype} />
          <Route exact path="/prototype-popups" component={PopupsPrototype} />
          <Route exact path="/icon-viewer" component={IconViewerPrototype} />
          <Route exact path="/menu-button" component={MenuButtonPrototype} />
          <Route exact path="/prototype-alerts" component={AlertsPrototype} />
          <Route
            exact
            path="/prototype-nested-popups-and-dialogs"
            component={NestedPopupsAndDialogsPrototype}
          />
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
