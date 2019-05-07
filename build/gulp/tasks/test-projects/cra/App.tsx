import {
  Accordion,
  Animation,
  Attachment,
  Avatar,
  Button,
  Divider,
  Header,
  Icon,
  Image,
  Input,
  Popup,
  Provider,
  Text,
  themes,
} from '@stardust-ui/react'
import * as React from 'react'

class App extends React.Component {
  public render() {
    return (
      <Provider theme={themes.teams}>
        <div>
          <Accordion panels={[{ title: 'Title', content: 'Content' }]} />
          <Animation name="spinner">
            <Icon name="umbrella" circular bordered />
          </Animation>
          <Attachment header="Document.docx" />
          <Avatar image={{ src: '//placehold.it' }} />
          <Button content="Click me" />
          <Divider />
          <Header content="This is " />
          <Image src="//placehold.it" />
          <Input placeholder="Type here" />
          <Popup trigger={<Button content="Popup" />} content="Popup content" />
          <Divider />
          <TypeChecksSection />
        </div>
      </Provider>
    )
  }
}

const TypeChecksSection = () => (
  <>
    {/* prop types should be extended with props of 'as' component type. */}
    <Header
      as={Text}
      weight="semibold"
      content="Stardust"
      description="Contains all the tools to build your dreams."
    />

    {/* in case if unknown type is provided to 'as', all props should be allowed. */}
    <Button as={NonTypedLink} to="https://stardust-ui.github.io/react/">
      Go to Stardust page ->
    </Button>
  </>
)

/** This variable intentionally has 'any' type visible for TS type system. */
const NonTypedLink = ((({ to, children }) => (
  <a href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)) as React.FunctionComponent<{ to: string }>) as any

export default App
