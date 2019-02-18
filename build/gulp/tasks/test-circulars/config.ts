import config from '../../../../config'

const reactPackageDist = (filePath: string) =>
  config.paths.packages('react', 'pkg', 'dist-src', filePath)

export const cyclesToSkip = [
  [reactPackageDist('components/Tree/Tree.js'), reactPackageDist('components/Tree/TreeItem.js')],
  [reactPackageDist('components/Menu/Menu.js'), reactPackageDist('components/Menu/MenuItem.js')],
  [
    reactPackageDist('components/Button/Button.js'),
    reactPackageDist('components/Button/ButtonGroup.js'),
  ],
  [
    reactPackageDist('components/Reaction/Reaction.js'),
    reactPackageDist('components/Reaction/ReactionGroup.js'),
  ],
]
