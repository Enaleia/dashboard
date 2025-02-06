export function formatCamelCaseString(label: string) { 
  return label
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, c => c.toUpperCase());
}