/**
 * Calculates the similarity between two strings using the Levenshtein distance algorithm
 * @param str1 First string
 * @param str2 Second string
 * @returns A value between 0 and 1, where 1 is an exact match
 */
export function calculateStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  // If the strings are identical, return 1
  if (s1 === s2) return 1;
  
  // If either string is empty, the similarity is 0
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // Calculate Levenshtein distance
  const matrix: number[][] = [];
  
  // Initialize the matrix
  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }
  
  // Fill the matrix
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1.charAt(i - 1) === s2.charAt(j - 1) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,       // deletion
        matrix[i][j - 1] + 1,       // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }
  
  // The Levenshtein distance is the value in the bottom-right cell
  const distance = matrix[s1.length][s2.length];
  
  // Convert distance to similarity score (0-1)
  const maxLength = Math.max(s1.length, s2.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

/**
 * Extracts keywords from a string
 * @param text The input text
 * @returns Array of keywords
 */
export function extractKeywords(text: string): string[] {
  // Remove punctuation and convert to lowercase
  const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');
  
  // Split into words
  const words = cleanedText.split(/\s+/);
  
  // Filter out common stop words
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 
    'be', 'been', 'being', 'to', 'of', 'for', 'with', 'about', 'against', 
    'between', 'into', 'through', 'during', 'before', 'after', 'above', 
    'below', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 
    'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 
    'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 
    'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 
    'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 
    'now', 'do', 'does', 'did', 'doing', 'i', 'me', 'my', 'myself', 'we', 
    'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 
    'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 
    'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 
    'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 
    'those', 'am', 'have', 'has', 'had', 'having', 'would', 'could', 'should'
  ]);
  
  return words.filter(word => !stopWords.has(word) && word.length > 2);
}