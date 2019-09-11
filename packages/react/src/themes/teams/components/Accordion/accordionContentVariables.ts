export interface AccordionContentVariables {
  active: string
}

export default (): AccordionContentVariables => {
  const vars: any = {}

  vars.active = 'display:block'

  return vars
}
