// Game utility functions for PowerLetter Enhanced

/**
 * Generate random letters for the game based on difficulty
 * @param {string} solution - The correct answer
 * @param {string} difficulty - easy, medium, or hard
 * @param {string} language - en or ar
 * @returns {Array} Array of letters including solution letters and random extras
 */
export const generateGameLetters = (solution, difficulty, language = 'en') => {
  const solutionLetters = solution.toUpperCase().split('')
  
  // Define letter pools for different languages
  const letterPools = {
    en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    ar: 'ابتثجحخدذرزسشصضطظعغفقكلمنهوي'
  }
  
  const letterPool = letterPools[language] || letterPools.en
  
  // Determine total letters based on difficulty
  const totalLetters = {
    easy: 10,
    medium: 14,
    hard: 20
  }
  
  const targetCount = totalLetters[difficulty] || 10
  const extraLettersNeeded = Math.max(0, targetCount - solutionLetters.length)
  
  // Generate random extra letters
  const extraLetters = []
  for (let i = 0; i < extraLettersNeeded; i++) {
    const randomIndex = Math.floor(Math.random() * letterPool.length)
    extraLetters.push(letterPool[randomIndex])
  }
  
  // Combine and shuffle all letters
  const allLetters = [...solutionLetters, ...extraLetters]
  return shuffleArray(allLetters)
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Calculate score based on difficulty and hints used
 * @param {string} difficulty - easy, medium, or hard
 * @param {number} hintsUsed - Number of hints used
 * @returns {number} Score points
 */
export const calculateScore = (difficulty, hintsUsed = 0) => {
  const baseScores = {
    easy: 10,
    medium: 20,
    hard: 30
  }
  
  const baseScore = baseScores[difficulty] || 10
  const hintPenalty = hintsUsed * 2
  
  return Math.max(1, baseScore - hintPenalty)
}

/**
 * Check if a word is correctly formed from available letters
 * @param {string} word - Word to check
 * @param {Array} availableLetters - Available letters
 * @returns {boolean} True if word can be formed
 */
export const canFormWord = (word, availableLetters) => {
  const wordLetters = word.toUpperCase().split('')
  const letterCount = {}
  
  // Count available letters
  availableLetters.forEach(letter => {
    letterCount[letter] = (letterCount[letter] || 0) + 1
  })
  
  // Check if word can be formed
  for (const letter of wordLetters) {
    if (!letterCount[letter] || letterCount[letter] === 0) {
      return false
    }
    letterCount[letter]--
  }
  
  return true
}

/**
 * Get hint for the current level
 * @param {string} solution - The correct answer
 * @param {number} hintNumber - Which hint (1, 2, or 3)
 * @returns {string} Hint text
 */
export const getHint = (solution, hintNumber) => {
  const word = solution.toUpperCase()
  
  switch (hintNumber) {
    case 1:
      return `The word has ${word.length} letters`
    case 2:
      return `The word starts with "${word[0]}"`
    case 3:
      return `The word ends with "${word[word.length - 1]}"`
    default:
      return ''
  }
}

/**
 * Format text for RTL languages
 * @param {string} text - Text to format
 * @param {string} language - Language code
 * @returns {string} Formatted text
 */
export const formatTextForLanguage = (text, language) => {
  if (language === 'ar') {
    return text
  }
  return text
}

/**
 * Get language direction
 * @param {string} language - Language code
 * @returns {string} 'rtl' or 'ltr'
 */
export const getLanguageDirection = (language) => {
  return language === 'ar' ? 'rtl' : 'ltr'
}

