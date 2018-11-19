import * as _ from 'lodash'

export const imageNames = [
  'ade',
  'chris',
  'christian',
  'daniel',
  'elliot',
  'helen',
  'jenny',
  'joe',
  'justen',
  'laura',
  'matt',
  'nan',
  'nom',
  'stevie',
  'steve',
  'tom',
  'veronika',
]

export const arrayOfStickerImagesNames = [
  [
    'ade',
    'chris',
    'christian',
    'daniel',
    'elliot',
    'helen',
    'jenny',
    'joe',
    'justen',
    'laura',
    'matt',
    'nan',
    'nom',
    'stevie',
    'steve',
    'tom',
    'veronika',
  ],
  ['joe', 'justen', 'laura', 'matt', 'nan', 'nom', 'stevie', 'steve', 'tom', 'veronika'],
  ['chris', 'christian', 'elliot', 'joe', 'justen', 'laura', 'matt', 'stevie', 'steve', 'tom'],
  [
    'ade',
    'chris',
    'christian',
    'daniel',
    'elliot',
    'helen',
    'jenny',
    'joe',
    'justen',
    'laura',
    'matt',
    'nan',
    'nom',
    'stevie',
    'steve',
    'tom',
    'veronika',
  ],
  ['chris', 'elliot', 'helen', 'jenny', 'stevie', 'steve', 'tom'],
  ['jenny', 'joe', 'justen', 'nan', 'nom', 'stevie'],
]

const handleSelection = e => {
  if (!e.target) return
  const img = e.target.nodeName !== 'IMG' ? e.target.querySelector('img') : e.target
  const selectedItem = img && img.getAttribute('aria-label')
  if (!selectedItem) return
  alert(`Selected item is: ${selectedItem}`)
}

export const getItemsData = (images, ariaLabelPart) => {
  return _.map(images, image => ({
    imageSrc: `public/images/avatar/large/${image}.jpg`,
    title: `${ariaLabelPart} ${image}`,
    onClick: handleSelection,
  }))
}
