import config from '../config'

export default () => fetch(config.getStatsUri).then(response => response.json())
