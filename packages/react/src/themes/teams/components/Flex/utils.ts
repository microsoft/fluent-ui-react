export const toFlexAlignment = propValue => {
  const trimmedValue = propValue.trim()

  if (trimmedValue === 'start' || trimmedValue === 'end') {
    return `flex-${trimmedValue}`
  }

  return trimmedValue
}

export const toFlexItemSizeValues = sizeValue => {
  return {
    flexBasis: sizeValue,
  }
}
