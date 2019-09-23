export default (
  <Menu
    style={{background: "#fff"}}
    items={[
      {
        as: "div",
        key: "review",
        content: "Reviews"
      },
      {
        as: "div",
        key: "events",
        content: "Events"
      }
    ]}
    primary
    pointing
    defaultActiveIndex={1}
  />
)
