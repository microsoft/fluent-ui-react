export default (
  <Chat
    items={[
      {
        key: 1,
        gutter: <Avatar image="/images/avatar-placeholder.jpg" color="green" />,
        message: (
          <Chat.Message content="Hey there!" author="Michael Scott" mine />
        )
      }
    ]}
  />
)
