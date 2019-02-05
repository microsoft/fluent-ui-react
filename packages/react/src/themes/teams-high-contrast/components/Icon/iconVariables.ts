import avatarVariables from '../Avatar/avatarVariables'
import { callable } from '../../../../lib'

export default siteVars => ({
  avatarBorderWidth: callable(avatarVariables)(siteVars).avatarBorderWidth,
})
