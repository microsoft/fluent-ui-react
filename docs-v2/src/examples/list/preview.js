export default (
  <List
    truncateHeader
    truncateContent
    style={{maxWidth: "100%"}}
    items={[
      {
        key: 1,
        media: (
          <Avatar
            name="John Doe"
            image="/images/avatar-placeholder.jpg"
            size="small"
          />
        ),
        header: "First Item",
        content: "Description for the first item"
      },
      {
        key: 2,
        media: (
          <Avatar
            name="John Doe"
            image="/images/avatar-placeholder.jpg"
            size="small"
          />
        ),
        header: "Second Item",
        content: "Description for the second item"
      }
    ]}
  />
)
