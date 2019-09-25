const config: ScreenerTestsConfig = {
  steps: [
    (builder, keys) => builder.keys('body', keys.tab).snapshot('Focuses attachment in iframe'),
  ],
}

export default config
