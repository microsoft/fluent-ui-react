export default {
  root: ({ props: { textAlign, background, color }, variables: v }) => {
    const headerColor = color || v.color
    const headerBackground = background || v.background
    return {
      display: 'block',
      textAlign,
      color: headerColor,
      background: headerBackground,
    }
  },
}
