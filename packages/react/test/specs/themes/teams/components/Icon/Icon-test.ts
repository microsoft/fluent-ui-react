import * as _ from 'lodash'
import { shallow } from 'enzyme'

import icons, {
  teamsIconSlotClassNames,
} from '../../../../../../src/themes/teams/components/Icon/svg'
import processedIcons from '../../../../../../src/themes/teams/components/Icon/svg/processedIndex'
import { SvgIconSpecWithStyles } from '../../../../../../src/themes/teams/components/Icon/svg/types'

describe('Teams Theme Icon', () => {
  function testIcon(icon) {
    const iconFunc: any = (icon as SvgIconSpecWithStyles).icon
    const component = shallow(
      iconFunc({ classes: { outlinePart: 'TEST-OUTLINE', filledPart: 'TEST-FILLED' } }),
    )

    const outlineByDynamicClass = component.find('.TEST-OUTLINE')
    const outlineByStaticClass = component.find(`.${teamsIconSlotClassNames.outline}`)

    const filledByDynamicClass = component.find('.TEST-FILLED')
    const filledByStaticClass = component.find(`.${teamsIconSlotClassNames.filled}`)

    expect(outlineByDynamicClass).toEqual(outlineByStaticClass)
    expect(filledByDynamicClass).toEqual(filledByStaticClass)
  }

  _.forEach(icons, (icon, iconName) => {
    test(`Teams theme icon '${iconName}' correctly sets static outline and filled classes`, () =>
      testIcon(icon))
  })

  _.forEach(processedIcons, (icon, iconName) => {
    test(`Teams theme processed icon '${iconName}' correctly sets static outline and filled classes`, () =>
      testIcon(icon))
  })
})
