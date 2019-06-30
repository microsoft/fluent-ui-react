const combinedRole = 'menu(mac)+listbox(win)'
export const roleValues = [combinedRole, 'menu/menuitem', 'list/listitem', 'listbox/option']

export const getRoles = roleValue => {
  if (roleValue === combinedRole) {
    return getCombinedRole()
  }

  const roles = roleValue.split('/')
  return {
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
