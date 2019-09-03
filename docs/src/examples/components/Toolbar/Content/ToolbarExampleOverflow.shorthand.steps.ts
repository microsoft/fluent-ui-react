const config: ScreenerTestsConfig = {
  themes: ['teams', 'teamsDark', 'teamsHighContrast'],
  steps: [builder => builder.wait(2000).snapshot('Shows responsive toolbar')],
}

export default config
