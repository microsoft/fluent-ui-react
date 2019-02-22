import * as React from 'react'
import * as _ from 'lodash'
import cx from 'classnames'
import {
  createComponent,
  Provider,
  Chat,
  Icon,
  IconProps,
  RenderStardustResultConfig,
} from '@stardust-ui/react'

type ObjectOf<T> = { [key: string]: T }
type ShorthandValue<P = ObjectOf<any>> = React.ReactNode | P

const adjustedStyles: React.CSSProperties = {
  marginTop: '17px',
  marginRight: '14px',
}

interface ControlMessageProps {
  icon?: ShorthandValue<IconProps>
  expanded?: boolean
  content?: ShorthandValue
  expandedContent?: ShorthandValue[]
  onExpandIconClick?: (event: React.SyntheticEvent, data: ControlMessageProps) => void
}

interface ControlMessageState {
  expanded: boolean
}

class ControlMessageInner extends React.Component<
  ControlMessageProps &
    React.HTMLAttributes<HTMLElement> & { stardust: RenderStardustResultConfig },
  ControlMessageState
> {
  state = {
    expanded: false,
  }

  render() {
    const {
      className,
      icon,
      content,
      expandedContent,
      // onExpandIconClick,
      stardust: { classes, rtl },
      // ...rest
    } = this.props
    const { expanded } = this.state

    const showCaret = expandedContent && expandedContent.length > 1
    const renderedContent = <>{showCaret && expanded ? expandedContent : content}</>

    return (
      <Chat.Item
        className={cx(className, classes.root)}
        gutter={{
          content: (
            <>
              <Icon
                name={expanded ? 'caret down' : rtl ? 'caret left' : 'caret right'}
                size="small"
                onClick={() => this.setState({ expanded: !expanded })}
                style={{ visibility: showCaret ? 'visible' : 'hidden', ...adjustedStyles }}
              />
              {Icon.create(icon, {
                defaultProps: { style: _.pick(adjustedStyles, 'marginTop') },
              })}
            </>
          ),
        }}
        message={{ content: <Chat.Message content={{ content: renderedContent }} /> }}
        // {...rest}
      />
    )

    // return (
    //   <Chat.Message
    //     className={cx(className, classes.root)}
    //     avatar={
    //       <>
    //         <Icon
    //           name={expanded ? 'caret down' : rtl ? 'caret left' : 'caret right'}
    //           size="small"
    //           onClick={() => this.setState({ expanded: !expanded })}
    //           style={{ visibility: showCaret ? 'visible' : 'hidden', ...adjustedStyles }}
    //         />
    //         {Icon.create(icon, {
    //           defaultProps: { style: _.pick(adjustedStyles, 'marginTop') },
    //         })}
    //       </>
    //     }
    //     content={renderedContent}
    //     {...rest}
    //   />
    // )
  }
}

// const StyledButton = createComponent({
//   displayName: 'StyledButton',
//   render: ({ stardust, className, children }) => {
//     const { classes } = stardust
//     return <button className={classes.root}>{children}</button>
//   },
// })

export const ControlMessage = createComponent<ControlMessageProps & ObjectOf<any>>({
  displayName: 'ControlMessage',

  render(props) {
    return <ControlMessageInner {...props} />
  },
})

export const CustomProvider: React.FC = props => (
  <Provider
    theme={{
      componentStyles: {
        ChatMessage: {
          root: { ':focus': { '& .ui-chat__message__messageBody': { outline: 0 } } },
          messageBody: { backgroundColor: 'inherit' },
        },
        Text: {
          root: ({ theme: { siteVariables } }) => ({
            color: siteVariables.gray03,
            marginRight: adjustedStyles.marginRight,
            ':hover': {
              textDecoration: 'underline',
            },
          }),
        },
        Icon: {
          root: { margin: 'auto' },
        },
      },
      componentVariables: {
        Icon: siteVars => ({ color: siteVars.gray02, outline: true }),
      },
    }}
  >
    {props.children}
  </Provider>
)
