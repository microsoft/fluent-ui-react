export default {
  root: ({ props }) => ({
    textAlign: props.textAlign,
    display: 'block',
    ...(props.subheader && { marginBottom: 0 }),
  }),
}
