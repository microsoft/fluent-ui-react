const uncapitalize = (str?: string): string => {
  if (!str || str.length === 0) {
    return str
  }

  return str.charAt(0).toLowerCase() + str.substr(1)
}

export default uncapitalize
