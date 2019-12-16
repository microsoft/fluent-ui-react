import { BaseMenuItem } from './BaseMenuItem'
import { compose } from './compose'
// import { FluentMenu } from './'

export const FluentMenuItem = compose(
  'FluentMenuItem',
  BaseMenuItem,
  // {
  //   slots: {
  //     menu: FluentMenu,
  //   }
  // }
)
