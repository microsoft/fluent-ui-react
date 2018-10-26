import * as React from 'react'
import { NavLink } from 'react-router-dom'

import DocPage from '../components/DocPage'
import Button from '../../../src/components/Button/Button'
import Divider from '../../../src/components/Divider/Divider'
import Grid from '../../../src/components/Grid/Grid'
import Header from '../../../src/components/Header/Header'
import CodeSnippet from '../components/CodeSnippet'

const gridStyle = {
  backgroundColor: 'white',
  padding: '15px',
  '>span': { borderBottom: '1px solid gray' },
}

export default () => (
  <DocPage title="Stardust Glossary">
    <Header as="h2" content="Component anatomy" />

    <Header as="h3" content="Types" />
    <p>
      Types are versions of an element that modify the element's standard appearance. Types cannot
      be used simultaneously on the same element. For example, "cats" and "dogs" are types of
      animals, but are mutually exclusive.
    </p>
    <Header as="h3" content="State" />
    <p>
      States are modifications to an element that help indicate a change in{' '}
      <a
        href="http://www.usabilityfirst.com/glossary/affordance/"
        target="_blank"
        rel="noopener nofollow"
      >
        [affordance]
      </a>. Common states include loading, disabled, and active.
    </p>
    <Header as="h3" content="Content" />
    <p>
      Content are parts which only have meaning in the context of a component. Content use names
      which describe the type of expected content like header, description, menu, or item.
    </p>
    <p>
      Content inside a collection or view often includes stubbed versions of other components. For
      example cards let you use image content, which can be extended by using different variations.
    </p>
    <Header as="h3" content="Variations" />
    <p>Variations modify qualities of an element like size or color.</p>
    <p>Variations are mutually inclusive, and can be used together to modify an element.</p>
    <Header as="h2" content="API Design" />
    <Header as="h3" content="Top Level API" />
    <Header as="h4" content="Components" />
    <p>
      A component is a general term used to refer to any user interface element packaged for
      distribution. (Not to be confused with React’s Component)
    </p>

    <Header as="h4" content="Subcomponents" />
    <p>
      Some of the components have subcomponents defined for passing JSX elements for special parts
      of the component. For example the Menu components can contain multiple items inside, that can
      be defined using the Item subcomponent in the following manner:
    </p>
    <CodeSnippet
      label="index.jsx"
      value={[
        '<Menu>',
        '  <Menu.Item active={activeItem === "a"} onClick={this.handleItemClick("a")}>',
        '    Editorials',
        '  </Menu.Item>',
        '  <Menu.Item active={activeItem === "b"} onClick={this.handleItemClick("b")}>',
        '    Reviews',
        '  </Menu.Item>',
        '  <Menu.Item active={activeItem === "c"} onClick={this.handleItemClick("c")}>',
        '    Upcoming Events',
        '  </Menu.Item>',
        '</Menu>',
      ].join('\n')}
    />

    <Header as="h3" content="Props API" />
    <Header as="h4" content="Enum" />
    <p>
      We use enum for properties when multiple values are mutually exclusive. We should use the same
      enums defining the same props across all components for consistency.
    </p>
    <Header as="h4" content="Boolean" />
    <p>
      We use boolean for properties when multiple values are mutually inclusive and don’t need any
      description. This way we are only implying that that property is applied to the component.
    </p>
    <Header as="h2" content="Design language" />

    <Grid columns="20% 80%" css={gridStyle}>
      {[
        <span>
          <strong>Term</strong>
        </span>,
        <span>
          <strong>Description</strong>
        </span>,
        <span>type: primary</span>,
        <span>Used to emphasize a componet's appearance and catch user's attention.</span>,
        <span>type: secondary</span>,
        <span>Used to de-emphasize a component's appearance.</span>,
        <span>type: positive ?</span>,
        <span>Used to hint towards a positive consequence.</span>,
        <span>type: negative ?</span>,
        <span>Used to hint towards a negative consequence.</span>,
        <span>children</span>,
        <span>The primary content of the component.</span>,
        <span>content</span>,
        <span>Shorthand for primary content.</span>,
        <span>as</span>,
        <span>An element type to render as, that can be a function or string.</span>,
        <span>className</span>,
        <span>Additional classes that will be applied to the component.</span>,
        <span>size</span>,
        <span>
          Used to define different sizes of the component. Comment: Should be standize across all
          components with values from 0 to 10 for example.
        </span>,
        <span>role</span>,
        <span>The role of the HTML element generated by the component.</span>,
        <span>color</span>,
        <span>
          Used for defining specific color for the component, by selecting one of the SUI colors
          enum.
        </span>,
        <span>inverted</span>,
        <span>Used to format the component to appear on dark background.</span>,
        <span>basic</span>,
        <span>Used for the component to be less pronounced.</span>,
        <span>floated</span>,
        <span>
          Used for the component to be aligned to the left or right of its container. ('left',
          'right')
        </span>,
        <span>active</span>,
        <span>Used to style the component showing that it is the current user selection.</span>,
        <span>disabled</span>,
        <span>Used to imply that the component is currently unable to be interacted with.</span>,
        <span>loading</span>,
        <span>Used to make the component show some loading indicator.</span>,
        <span>icon</span>,
        <span>Add an Icon by name, props object, or pass an !Icon! .</span>,
        <span>label</span>,
        <span>Add a Label by text, props object, or pass a !Label!.</span>,
        <span>attached</span>,
        <span>
          Used for attaching the component to some component. ('left', 'right', 'top', 'bottom')
        </span>,
        <span>compact</span>,
        <span>
          Used to make the component take up only the space necessary to fit its content.
        </span>,
        <span>fluid</span>,
        <span>Used to make the component takes the width from the parent.</span>,
        <span>fixed</span>,
        <span>
          Used to make the component fixed to a side of it's content. ('left', 'right', 'top',
          'bottom')
        </span>,
        <span>textAlign</span>,
        <span>Align the content. ('left', 'right', 'center', 'justified')</span>,
        <span>vertical</span>,
        <span>Used to make the component display it's content vertically.</span>,
        <span>shape</span>,
        <span>
          Used to describe the shape of the component. For example for the Menu component, beside
          the default, we have the following shapes: ('pills', 'pointing', 'underlined')
        </span>,
      ]}
    </Grid>
    <Header as="h2" content="Accessibility Terms" />
    <Grid columns="20% 80%" css={gridStyle}>
      {[
        <span>
          <strong>Term</strong>
        </span>,
        <span>
          <strong>Description</strong>
        </span>,
        <span>Virtual Cursor</span>,
        <span>
          {' '}
          Method of navigation in JAWS screen reader. Most other screen readers have similar
          navigation modes.
        </span>,
      ]}
    </Grid>
    <Divider />
    <br />
    <Button
      as={NavLink}
      content="Quick Start"
      type="primary"
      icon="arrow left"
      iconPosition="before"
      to="quick-start"
    />
    <Button
      as={NavLink}
      content="Accessibility"
      type="primary"
      icon="arrow right"
      iconPosition="after"
      to="accessibility"
    />
  </DocPage>
)
