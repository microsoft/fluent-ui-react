const menuItems = [
  { key: 'editorials', content: 'Editorials' },
  { key: 'review', content: 'Reviews' },
  { key: 'events', content: 'Upcoming Events' },
]

const menuConfig: ScreenerTestsConfig = {
  commonProps: { items: menuItems },
  testProps: [
    'primary',
    'vertical',
    'pointing',
    { pointing: 'start' },
    'primary vertical',
    { pointing: 'start', primary: true },
    { pointing: 'start', primary: true, vertical: true },
    // ...
  ],
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
}

export default menuConfig
