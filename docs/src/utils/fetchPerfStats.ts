import config from 'docs/src/config'

export default () => fetch(config.getStatsUri).then(response => response.json())
