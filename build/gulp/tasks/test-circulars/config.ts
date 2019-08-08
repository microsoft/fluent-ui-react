import config from '../../../../config'

const reactPackageDist = (filePath: string) => config.paths.packageDist('react', 'es', filePath)

export const cyclesToSkip = [
  [
    reactPackageDist('components/HierarchicalTree/HierarchicalTree.js'),
    reactPackageDist('components/HierarchicalTree/HierarchicalTreeItem.js'),
  ],
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
