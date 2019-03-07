export default function generateDisplayName(component) {
  var displayName = component.displayName || component.name;

  if (displayName) {
    return 'Fela' + displayName;
  }

  return 'ConnectedFelaComponent';
}