export default {
  root: ({ props: { textAlign, background, color }, variables }) => {
    const headerColor = color || variables.color
    const headerBackground = background || variables.background
    return {
      display: 'block',
      textAlign,
      color: headerColor,
      background: headerBackground,
    }
  },
}
