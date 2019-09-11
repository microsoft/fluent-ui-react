import { ResizeProperty } from 'csstype'

export interface TextAreaVariables {
  margin: string
  resize: ResizeProperty
}

export default (siteVars): TextAreaVariables => ({
  margin: '0',
  resize: 'vertical',
})
