import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import DocPage from '../components/DocPage/DocPage'
import CodeSnippet from '../components/CodeSnippet'
import Button from '../../../src/components/Button/Button'

const header = content => <Header as="h2">{content}</Header>
const subheader = content => <Header as="h3">{content}</Header>

const code = content => <code>{content}</code>
const codeExample = snippet => <CodeSnippet value={snippet} />

const ShorthandProps = props => (
  <DocPage title="Shorthand Props">
    <p>
      It is quite common for Stardust component to have "slots" which accept shorthand values. For
      example, {code('Button')} component has an {code('icon')} slot which value defines the icon
      that will be rendered.
    </p>

    {codeExample(`<Button icon='chess rook' />`)}

    <p>
      There are several forms of shorthand values that can be provided, but all of them share one
      common thing - each is eventually evaluated to React Element. Thus, you can think of shorthand
      values as a recipe to customize rendered React Element at corresponding slot.
    </p>

    {/* SHORTHAND AS AN OBJECT */}
    {header('Shorthand value as Object')}
    <p>
      Each component's slot has associated default element type. For example, by default there is{' '}
      {code('<Icon />')} element rendered for {code('Button')}'s {code('icon')} slot. It is possible
      to customize props of this default element by providing props object as shorthand value:
    </p>

    {codeExample([
      `// 'name' and 'size' will be used as <Icon /> element's props`,
      `<Button icon={{ name: 'chess rook', size: 'small' }} />`,
    ])}

    {/* SHORTHAND AS A PRIMITIVE VALUE */}
    {header('Shorthand value as Primitive')}
    <p>
      There is even shorter way to define default element's props - by using a primitive value. In
      that case provided shorthand value will be taken as a value for 'default prop' of this
      element.
    </p>

    <p>
      This could be much easier seen with an example. Here, again, we have a {code('Button')}{' '}
      element with its icon being defined with shorthand - where provided {code('string')} value
      will be used as icon's {code('name')}:
    </p>

    {codeExample([
      `<>`,
      `  <Button icon='chess rook' />`,
      ``,
      `  {/* has identical effect to the previous one */}`,
      `  <Button icon={{ name: 'chess rook' }} />`,
      `</>`,
    ])}
    <p>
      This works because {code('name')} is the default prop of slot's {code('<Icon />')} element.
    </p>

    {subheader(`Disable slot's rendering`)}
    <p>
      It is also possible to pass falsy values ({code('false')}, {code('null')} or{' '}
      {code('undefined')}) to shorthand prop - in that case there will be nothing rendered for the
      component's slot.
    </p>

    {/* SHORTHAND AS REACT ELEMENT */}
    {header('Shorthand value as React Element')}
    <p>
      There are cases where it might be necessary to customize element tree that will be rendered as
      a slot's value. Returning to {code('Button')} example, we might want to render {code('<i />')}{' '}
      instead of default {code('<Icon />')} element. In that case necessary element might be
      directly provided as shorthand value:
    </p>
    {codeExample([`<Button icon={<i class='my-icon'></i>} />`])}

    <blockquote>
      <strong>
        There is a very important caveat here, though: whenever React Element is directly used as a
        shorthand value, all props that Stardust has created for the slot's Component will be spread
        on the passed element. This means that provided element should be able to handle Stardust
        props - while this requirement is satisfied for all Stardust components, you should be aware
        of that when either HTML or any third-party elements are provided.
      </strong>{' '}
      Due to this limitation, you should strive to use other options for shorthand values whenever
      is possible - for instance, this is how previous example can be rewritten:
    </blockquote>
    {codeExample([`<Button icon={{ as: 'i', className: 'my-icon' }} />`])}

    <p>
      However, there still might be cases where it would be impossible to use object form of the
      shorthand value - for example, you might want to render some custom elements tree for the
      slot, while wanting to preserve calculated styles and accessibility aspects for it. In that
      case {code('render')} callback of function shorthand value should be used.
    </p>

    {/* SHORTHAND AS A FUNCTION */}
    {header('Shorthand value as Function')}
    <p>
      Providing function as a shorthand value is the most involving but, at the same time, the most
      powerful option for customizing component's slot. The only requirements for this function are:
    </p>

    <ul>
      <li>it should finish syncronously</li>
      <li>it should return React Element as a result</li>
    </ul>

    <p>Thus, in its simplest form, it could be used the following way:</p>

    {codeExample([`<Button icon={() => <Icon name='chess rook' />} />`])}

    <p>
      However, if it will be just about that, this function form wouldn't introduce any additional
      value. So, lets take a look on the scenarios where it is really helpful.
    </p>

    {subheader(`'Render' callback argument`)}
    <p>
      When function is provided as a shorthand value, there is a {code('render')} callback provided
      as its argument. This {code('render')} argument is a function that 'knows' how to render all
      the previously considered shorthand types - i.e. primitive values, objects, React Elements.
    </p>

    <p>Here is an example that represents this:</p>

    {codeExample([
      `<>`,
      `  {/* All three have the same effect: */}`,
      `  <Button icon='chess rook' />`,
      ``,
      `  {/* render() transforms string to <Icon /> element */}`,
      `  <Button icon={render => render('chess rook')} />`,
      ``,
      `  {/* render() transforms object to <Icon /> element */}`,
      `  <Button icon={render => render({ name: 'chess rook' })} />`,
      `</>`,
    ])}

    {subheader(`Handle Async data loading scenarios`)}
    <p>
      This 'render callback' arg makes it possible for the client to tackle scenarios where slot's
      data may be fetched asynchronously.
    </p>

    <p>
      Consider the following scenario: suppose we need to render {code('Button')}'s icon, but the
      problem is that icon's name is fetched from some remote source. Thus, we cannot do it as
      simply as that, as icon's name is not known at the moment {code('Button')} is rendered:
    </p>

    {codeExample(`<Button icon={{ name: /* unknown yet */ undefined }} />`)}

    <p>
      It is quite common case that there is some component that is responsible for data fetching
      abstraction - and it is possible to 'tell' this component what should be rendered while data
      is loading, as well as what should be rendered when data is fetched.
    </p>
    {codeExample([
      `<AsyncData`,
      `  getData={fetch('https://some/url')}`,
      `  onLoading={<div>Loading..</div>} // renders when data is loading`,
      `  onLoaded={data => <div>Loaded Data: {data}</div>} // renders once data is fetched`,
      `/>`,
    ])}

    <p>
      Lets suppose that we want to render 'loading' icon before data is fetched, and switch it with
      the icon which {code('name')} will be provided by fetched {code('data')} object. Also, note
      that we have {code('render')} arg that knows <em>how</em> to render {code('Button')}'s icons.
    </p>

    <p>Putting it all together, we will address our async data fetch case:</p>
    {codeExample([
      `<Button`,
      `  icon={render => <AsyncData`,
      `    getData={fetch('https://some/url')}`,
      `    onLoading={<Icon name='loading' />}`,
      `    /* using 'render' arg here to render icon from loaded name */`,
      `    onLoaded={data => render({ name: data.iconName })}`,
      `  />}`,
      `/>`,
    ])}

    <p>
      Note that this example can be further simplified, as {code('render')} can be used to render
      'loading' icon as well:
    </p>
    {codeExample([
      `<Button`,
      `  icon={render => <AsyncData`,
      `    getData={fetch('https://some/url')}`,
      `    /* using 'render' arg here to render loading icon as well */`,
      `    onLoading={render('loading')}`,
      `    onLoaded={data => render({ name: data.iconName })}`,
      `  />}`,
      `/>`,
    ])}

    {subheader(`Customizing rendered tree`)}
    <p>
      There is another use case that {code('render')} callback arg is very useful for - this is the
      case where custom element's tree should be rendered for the slot, but, at the same time, all
      the evaluated styles and accessibility behaviors should be preserved for rendered custom
      element.
    </p>

    <p>
      As you might recall, there is a problem that might happen when React Element is provided
      directly as shorthand value - in that case Stardust props are not propagated to rendered
      element, which may result in broken styles and accessibility. In order to avoid that the
      following strategy should be considered:
    </p>

    {codeExample([
      `<Button icon={render => render(`,
      `  /* what to render */`,
      `  { name: 'chess rook' },`,
      ``,
      `  /* how to render */`,
      `  (ComponentType, props) => (`,
      `    <div class='my-icon-container'>`,
      `      <i class="my-chess-rook-icon" {...props.accessibility.root} />`,
      `    </div>`,
      `  )`,
      `)} />`,
    ])}

    <p>
      Here we are passing a recipe of how evaluated {code('ComponentType')} ({code('Icon')} in our
      case, which is ignored by the rendered tree) and {code('props')} should be passed to custom
      elements tree. Note that {code('props')} object, amongst others, contains all the necessary
      evaluated accessibility attributes that should be applied to rendered element.
    </p>

    <br />
    <Button as={NavLink} content="Quick Start" icon="arrow right" primary to="quick-start" />
  </DocPage>
)

export default ShorthandProps
