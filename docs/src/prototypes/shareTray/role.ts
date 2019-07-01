const combinedRole = 'menu(mac)+listbox(win)'
export const roleValues = [
  'menu/menuitem',
  'list/listitem',
  'list/listitem/button',
  'listbox/option',
  'toolbar/button',
  'group/button',
]

export const getRoles = roleValue => {
  if (roleValue === combinedRole) {
    return getCombinedRole()
  }

  const roles = roleValue.split('/')
  return roles.length === 3
    ? {
        containerRole: roles[0],
        wrapperRole: roles[1],
        itemRole: roles[2],
      }
    : {
        containerRole: roles[0],
        itemRole: roles[1],
      }
}

const getCombinedRole = () => {
  const mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)

  return mac
    ? {
        containerRole: 'menu',
        itemRole: 'menuitem',
      }
    : {
        containerRole: 'listbox',
        itemRole: 'option',
      }
}
