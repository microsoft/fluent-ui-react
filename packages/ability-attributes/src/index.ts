import { DevEnv } from 'ability-attributes'

export * from './schema'

export function setup(settings?: DevEnv.DevEnvSettings) {
  if (process.env.NODE_ENV !== 'production') {
    DevEnv.setup({ ...{ enforceClasses: false, ignoreUnknownClasses: true }, ...settings })
  }
}
