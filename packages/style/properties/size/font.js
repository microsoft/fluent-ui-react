const scale = 4

module.exports = {
  size: {
    padding: {
      smallest: { value: scale * 0.7 },
      smaller: { value: scale * 0.8 },
      small: { value: scale * 0.9 },
      medium: { value: scale * 1 },
      large: { value: scale * 1.2 },
      larger: { value: scale * 1.5 },
      largest: { value: scale * 2 },
    },

    margin: {
      smallest: { value: scale * 0.7 },
      smaller: { value: scale * 0.8 },
      small: { value: scale * 0.9 },
      medium: { value: scale * 1 },
      large: { value: scale * 1.2 },
      larger: { value: scale * 1.5 },
      largest: { value: scale * 2 },
    },

    border: {},

    font: {
      small: {
        value: '0.75',
        comment: 'the small size of the font',
      },
      medium: {
        value: '1',
        comment: 'the medium size of the font',
      },
      large: {
        value: '2',
        comment: 'the large size of the font',
      },
      base: {
        value: '{size.font.medium.value}',
        comment: 'the base size of the font',
      },
    },
  },
}
