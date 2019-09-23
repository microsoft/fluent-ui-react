export default (
  <Toolbar
    style={{background: "#fff", padding: "0 1rem"}}
    items={[
      {
        key: "bold",
        kind: "toggle",
        icon: {
          name: "bold",
          outline: true
        }
      },
      {
        key: "italic",
        kind: "toggle",
        icon: {
          name: "italic",
          outline: true
        }
      },
      {
        key: "underline",
        kind: "toggle",
        icon: {
          name: "underline",
          outline: true
        }
      }
    ]}
  />
)
