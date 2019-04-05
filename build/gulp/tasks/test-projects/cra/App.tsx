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
          <Avatar src="//placehold.it" />
          <Button content="Click me" />
          <Divider />
          <Header content="This is " />
          <Image src="//placehold.it" />
          <Input placeholder="Type here" />
          <Popup trigger={<Button content="Popup" />} content="Popup content" />
        </div>
      </Provider>
    )
  }
}

export default App
