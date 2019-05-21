import * as React from 'react'
import { Dropdown } from '@stardust-ui/react'

const inputItems = [
  {
    header: 'Bruce Wayne',
    image: 'public/images/avatar/small/matt.jpg',
    content: 'Software Engineer',
  },
  {
    header: 'Natasha Romanoff',
    image: 'public/images/avatar/small/jenny.jpg',
    content: 'UX Designer 2',
  },
  {
    header: 'Steven Strange',
    image: 'public/images/avatar/small/joe.jpg',
    content: 'Principal Software Engineering Manager',
  },
  {
    header: 'Alfred Pennyworth',
    image: 'public/images/avatar/small/justen.jpg',
    content: 'Technology Consultant',
  },
  {
    header: `Scarlett O'Hara`,
    image: 'public/images/avatar/small/laura.jpg',
    content: 'Software Engineer 2',
  },
  {
    header: 'Imperator Furiosa',
    image: 'public/images/avatar/small/veronika.jpg',
    content: 'Boss',
  },
  {
    header: 'Bruce Banner',
    image: 'public/images/avatar/small/chris.jpg',
    content: 'Senior Computer Scientist',
  },
  {
    header: 'Peter Parker',
    image: 'public/images/avatar/small/daniel.jpg',
    content: 'Partner Software Engineer',
  },
  {
    header: 'Selina Kyle',
    image: 'public/images/avatar/small/ade.jpg',
    content: 'Graphic Designer',
  },
]

const DropdownExampleSearchMultipleImageAndContent = () => (
  <Dropdown
    multiple
    search
    items={inputItems}
    placeholder="Start typing a name"
    getA11ySelectionMessage={getA11ySelectionMessage}
    getA11yStatusMessage={getA11yStatusMessage}
    noResultsMessage="We couldn't find any matches."
  />
)

const getA11ySelectionMessage = {
  onAdd: item => `${item.header} has been selected.`,
  onRemove: item => `${item.header} has been removed.`,
}

const getA11yStatusMessage = ({
  isOpen,
  itemToString,
  previousResultCount,
  resultCount,
  selectedItem,
}) => {
  if (!isOpen) {
    return selectedItem ? itemToString(selectedItem) : ''
  }
  if (!resultCount) {
    return `Aucun résultat trouvé.`
  }
  if (resultCount !== previousResultCount) {
    return `${resultCount} résultat${
      resultCount === 1 ? ' est disponible' : 's sont disponibles'
    }, touches fléchées ascendante et descendante pour naviguer. Appuyez sur la touche Entrée pour sélectionner. Appuyez sur les touches fléchées gauche et droite pour parcourir les options sélectionnées.`
  }
  return ''
}

export default DropdownExampleSearchMultipleImageAndContent
