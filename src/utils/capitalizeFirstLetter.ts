export const capitalizeFirstLetter = (word: string) => {
  if ( word.length === 0 ) return ''
  const wordxd = word.split('-')

  if (wordxd.length > 1) {
    return wordxd.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  return word.charAt(0).toUpperCase() + word.slice(1)
}

