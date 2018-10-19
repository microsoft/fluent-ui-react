const items = [
  {
    name: 'Bruce Wayne',
    image: 'public/images/avatar/small/matt.jpg',
    position: 'Software Engineer',
  },
  {
    name: 'Natasha Romanoff',
    image: 'public/images/avatar/small/jenny.jpg',
    position: 'UX Designer 2',
  },
  {
    name: 'Steven Strange',
    image: 'public/images/avatar/small/joe.jpg',
    position: 'Principal Software Engineering Manager',
  },
  {
    name: 'Alfred Pennyworth',
    image: 'public/images/avatar/small/justen.jpg',
    position: 'Technology Consultant',
  },
  {
    name: `Scarlett O'Hara`,
    image: 'public/images/avatar/small/laura.jpg',
    position: 'Software Engineer 2',
  },
  {
    name: 'Imperator Furiosa',
    image: 'public/images/avatar/small/veronika.jpg',
    position: 'Boss',
  },
  {
    name: 'Bruce Banner',
    image: 'public/images/avatar/small/chris.jpg',
    position: 'Senior Computer Scientist',
  },
  {
    name: 'Peter Parker',
    image: 'public/images/avatar/small/daniel.jpg',
    position: 'Partner Software Engineer',
  },
  {
    name: 'Selina Kyle',
    image: 'public/images/avatar/small/ade.jpg',
    position: 'Graphic Designer',
  },
]

const getUnselectedItems = (selected: { name: string }[]) => {
  return items.filter(item => {
    for (const selectedItem of selected) {
      if (selectedItem.name === item.name) {
        return false
      }
      continue
    }

    return true
  })
}

const peopleSupplier = (inputValue: string, selected: { name: string }[]) => {
  return getUnselectedItems(selected).filter(
    item => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()),
  )
}

export default peopleSupplier
