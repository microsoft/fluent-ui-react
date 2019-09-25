const config: ScreenerTestsConfig = {
  steps: [builder => builder.focus('iframe').snapshot('Focuses button in iframe')],
}

export default config
