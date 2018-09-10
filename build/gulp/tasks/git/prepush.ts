import { execSync } from 'child_process'

// naive check is implemented for now - this checks if Semantic UI tags are present
const hasWrongTags = (gitTagsList): boolean => {
  // this one is guaranteed being relevant to Semantic UI only
  const SemanticUiVersionTag = 'v0.1.2'

  return gitTagsList.includes(SemanticUiVersionTag)
}

type Error = string

export default (): Error => {
  const gitTagsList = `${execSync('git tag -l')}`
  if (hasWrongTags(gitTagsList)) {
    const errorMessage = [
      '!! YOUR LOCAL REPO CONTAINS WRONG GIT TAGS !!',
      '-----------------------------------------------',
      'To prevent wrong git tags from being pushed, please, consider to do the following steps:',
      ' - delete all local tags: git tag -l | xargs git tag -d',
      ' - pull all remote tags: git fetch --tags',
      ' - verify your tags ($ git tag -l) match NPM releases: https://www.npmjs.com/package/@stardust-ui/react?activeTab=versions',
      '-----------------------------------------------',
    ].join('\n')

    return errorMessage
  }

  return undefined
}
