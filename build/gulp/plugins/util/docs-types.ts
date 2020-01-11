// Temporary workaround to prevent having a circular dependency on @fluentui/docs or
// outside-package path imports in several files. Long-term the types and/or docs build scripts
// should move somewhere else.
// TODO (@ecraig12345) - remove relative docs import
export * from '../../.././../docs/src/types'
