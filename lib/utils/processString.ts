export const processString = (
  string: string,
  min: number,
  max: number
): string => {
  // trim whitespaces from original string
  const originalString = string.trim()

  // create test string with trimmed
  const testString = originalString.substring(0, min)

  if (originalString.length < min) {
    // return trimmed string if less than min. chars
    return originalString
  } else if (
    originalString.length >= min &&
    originalString.length <= max &&
    /\s/.test(testString) === false
  ) {
    // return shortened string if:
    // length b/w min. and max.
    // && has no white spaces in between
    const processedString = `${testString}...`
    return processedString
  } else if (originalString.length <= max) {
    const processedString = originalString.substring(0, max).trim()
    return processedString
  } else {
    // length of string above max: return shortened string
    const processedString = `${originalString.substring(0, max).trim()}...`
    return processedString
  }
  return originalString
}
