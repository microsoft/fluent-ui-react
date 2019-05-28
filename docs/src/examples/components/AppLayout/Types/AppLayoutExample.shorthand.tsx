import * as faker from 'faker'
import * as _ from 'lodash'
import * as React from 'react'
import { AppLayout, Avatar, Chat, Divider, Image, List, Menu } from '@stardust-ui/react'

const LAYOUT_TEMPLATES = {
  CALLING: `
    "header header header header" 40px
    "main   main   main   main"   1fr
    "main   main   main   main"   1fr
    "main   main   main   main" /
     60px   1fr    1fr    1fr
  `,

  CALLING_FULL: `
    header header header header 
    full   full   full   full  
    full   full   full   full  
    full   full   full   full
  `,

  CALLING_WITH_CHAT: `
    "header header header header" 40px
    "main   main   main   end"    1fr
    "main   main   main   end"    1fr
    "main   main   main   end" /
     60px   1fr    1fr    320px
  `,

  CHAT_WITH_CALLING: `
    "header header header header" 40px
    "nav    tile   main   main"   160px
    "nav    start  main   main"   1fr
    "nav    start  main   main" /
     60px   320px  1fr    1fr
  `,

  FILE: `
    "header header header header" 40px
    "nav    main   main   main"   1fr
    "nav    main   main   main"   1fr
    "nav    main   main   main" /
     60px   1fr    1fr    1fr
  `,

  FILE_WITH_CHAT: `
    "header header header header" 40px
    "nav    main   main   end"    1fr
    "nav    main   main   end"    1fr
    "nav    main   main   end" /
     60px   1fr    1fr    1fr
  `,

  CHAT: `
    "header header header header" 40px
    "nav    start  main   main"   1fr
    "nav    start  main   main"   1fr
    "nav    start  main   main" /
     60px   320px  1fr    1fr
  `,
}

const layoutTimeline = [
  LAYOUT_TEMPLATES.CHAT,
  LAYOUT_TEMPLATES.FILE,
  LAYOUT_TEMPLATES.FILE_WITH_CHAT,
  LAYOUT_TEMPLATES.FILE,
  LAYOUT_TEMPLATES.CHAT,
  LAYOUT_TEMPLATES.CALLING_WITH_CHAT,
  LAYOUT_TEMPLATES.CALLING,
  LAYOUT_TEMPLATES.CHAT,
  LAYOUT_TEMPLATES.CHAT_WITH_CALLING,
  LAYOUT_TEMPLATES.CALLING_FULL,
]

const VIDEO_BACKGROUND_URL = `https://st2.depositphotos.com/1039548/11162/v/600/depositphotos_111622818-stock-video-businesswoman-making-a-video-call.jpg`

const janeAvatar = {
  image: 'public/images/avatar/small/ade.jpg',
  status: { color: 'green', icon: 'check' },
}

const ChatPane = () => (
  <Chat
    items={[
      {
        message: {
          content: (
            <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
          ),
        },
        contentPosition: 'end',
        attached: 'top',
        key: 'message-id-1',
      },
      {
        message: {
          content: (
            <Chat.Message
              content="I'm back!"
              author="John Doe"
              timestamp="Yesterday, 10:15 PM"
              mine
            />
          ),
        },
        contentPosition: 'end',
        attached: true,
        key: 'message-id-2',
      },
      {
        message: {
          content: (
            <Chat.Message
              content="Thanks for waiting!"
              author="John Doe"
              timestamp="Yesterday, 10:15 PM"
              mine
            />
          ),
        },
        contentPosition: 'end',
        attached: 'bottom',
        key: 'message-id-3',
      },
      {
        gutter: { content: <Avatar {...janeAvatar} /> },
        message: {
          content: <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />,
        },
        attached: 'top',
        key: 'message-id-4',
      },
      {
        gutter: { content: <Avatar {...janeAvatar} /> },
        message: {
          content: (
            <Chat.Message content="No problem!" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />
          ),
        },
        attached: true,
        key: 'message-id-5',
      },
      {
        gutter: { content: <Avatar {...janeAvatar} /> },
        message: {
          content: (
            <Chat.Message content="What's up?" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />
          ),
        },
        attached: 'bottom',
        key: 'message-id-6',
      },
      {
        message: {
          content: (
            <Chat.Message
              content="Would you like to grab a lunch?"
              author="John Doe"
              timestamp="Yesterday, 10:16 PM"
              mine
            />
          ),
        },
        contentPosition: 'end',
        key: 'message-id-7',
      },
      {
        gutter: { content: <Avatar {...janeAvatar} /> },
        message: {
          content: (
            <Chat.Message
              content="Sure! Let's try the new place downtown."
              author="Jane Doe"
              timestamp="Yesterday, 10:15 PM"
            />
          ),
        },
        key: 'message-id-8',
      },
      {
        children: <Divider content="Today" color="primary" important />,
        key: 'message-id-9',
      },
      {
        message: {
          content: (
            <Chat.Message
              content="Ok, let's go."
              author="John Doe"
              timestamp="Today, 11:15 PM"
              mine
            />
          ),
        },
        contentPosition: 'end',
        key: 'message-id-10',
      },
    ]}
  />
)

const ChatList = () => (
  <List
    selectable
    items={_.times(50, i => ({
      key: i,
      media: <Image avatar src={faker.image.avatar()} />,
      header: faker.name.findName(),
      headerMedia: faker.date.recent().toLocaleTimeString(),
      content: faker.hacker.phrase(),
      truncateHeader: true,
      truncateContent: true,
    }))}
  />
)

class AppLayoutExample extends React.Component {
  state = {
    index: 0,
    playing: false,
  }

  timer

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    this.pause()
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      this.next()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      this.prev()
    }
  }

  change = indexOffset => {
    const { index } = this.state

    const next = (index + indexOffset) % layoutTimeline.length

    this.setState({
      index: next === -1 ? layoutTimeline.length - 1 : next,
    })
  }

  next = () => {
    this.change(1)
  }

  prev = () => {
    this.change(-1)
  }

  play = () => {
    this.next()
    this.timer = setInterval(this.next, 1500)
    this.setState({ playing: true })
  }

  pause = () => {
    clearInterval(this.timer)
    this.setState({ playing: false })
  }

  renderHeader = () => 'HEADER'
  renderTile = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: `url(${VIDEO_BACKGROUND_URL})`,
        backgroundSize: 'cover',
        cursor: 'pointer',
      }}
      onClick={this.handleTileClick}
    >
      TILE
    </div>
  )
  renderNav = () => Menu
  renderFull = () => (
    <div
      style={{
        background: `url(${VIDEO_BACKGROUND_URL})`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
      }}
    >
      FULL
    </div>
  )
  renderStart = () => <ChatList />
  renderMain = () => <ChatPane />
  renderEnd = () => <ChatList />
  renderControls = () => {
    const { index, playing } = this.state

    return (
      <div style={{ padding: '1rem' }}>
        {playing ? (
          <button onClick={this.pause}>Pause</button>
        ) : (
          <button onClick={this.play}>Play</button>
        )}
        &emsp;
        <button onClick={this.prev}>{'<-'} Prev</button>
        <button onClick={this.next}>Next {'->'}</button>
        &emsp;
        {index + 1} / {layoutTimeline.length}&emsp;
      </div>
    )
  }

  handleTileClick = () => {
    this.setState({ index: layoutTimeline.indexOf(LAYOUT_TEMPLATES.CALLING_FULL) })
  }

  render() {
    const { index, playing } = this.state
    console.log('AppLayoutExample', { index, playing })

    return (
      <AppLayout
        // mode="" // default | focus | fullscreen

        template={layoutTimeline[index]}
        slots={{
          controls: {
            content: this.renderControls(),
          },
          full: {
            styles: { background: '#555' },
            // transitions: { in: false, out: false },
            content: this.renderFull(),
          },
          tile: {
            styles: { background: '#222' },
            // transitions: { in: false, out: false },
            content: this.renderTile(),
          },
          header: {
            styles: { background: 'rgb(70, 72, 113)' },
            content: this.renderHeader(),
          },
          start: {
            styles: { background: '#fff' },
            content: this.renderStart(),
          },
          main: {
            styles: { background: 'rgb(243, 242, 241)' },
            // transitions: { move: false },
            content: this.renderMain(),
          },
          nav: {
            styles: { background: 'rgb(49, 50, 69)' },
            content: this.renderNav(),
          },
          end: {
            styles: { background: '#fff' },
            content: this.renderEnd(),
          },
        }}
      />
    )
  }
}

export default AppLayoutExample
