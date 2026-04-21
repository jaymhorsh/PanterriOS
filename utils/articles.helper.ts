export const extractAltOrText = (input: string) => {
  if (!input) return '';

  // Check if it looks like HTML
  if (input.includes('<img')) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    return doc.querySelector('img')?.getAttribute('alt') || '';
  }

  // Otherwise assume it's already plain text
  return input.trim();
};
