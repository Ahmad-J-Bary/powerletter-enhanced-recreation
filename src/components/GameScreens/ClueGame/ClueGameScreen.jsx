import { useState, useEffect } from 'react'
import { useGameMode } from '@/contexts/GameModeContext'
import { generateGameLetters, calculateScore, getHint } from '@/lib/gameUtils'
import SolutionBoxes from './SolutionBoxes'
import LetterGrid from './LetterGrid'
import GameControls from './GameControls'

// Import level data
import enLevels from '@/data/en/clueLevels.json'
import arLevels from '@/data/ar/clueLevels.json'

const ClueGameScreen = () => {
  const { 
    language, 
    gameMode, 
    teams, 
    currentTeamIndex, 
    scores, 
    updateTeamScore, 
    nextTurn, 
    currentLevel, 
    setCurrentLevel 
  } = useGameMode()

  // Game state
  const [gameLetters, setGameLetters] = useState([])
  const [selectedLetters, setSelectedLetters] = useState([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState('')
  const [gameMessage, setGameMessage] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  // Get current level data
  const levelData = language === 'ar' ? arLevels : enLevels
  const currentLevelData = levelData.levels[currentLevel]

  // Initialize game letters when level changes
  useEffect(() => {
    if (currentLevelData) {
      const letters = generateGameLetters(
        currentLevelData.solution, 
        currentLevelData.difficulty, 
        language
      )
      setGameLetters(letters)
      setSelectedLetters([])
      setCurrentAnswer('')
      setHintsUsed(0)
      setShowHint('')
      setGameMessage('')
      setIsCorrect(false)
    }
  }, [currentLevel, currentLevelData, language])

  // Handle letter selection
  const handleLetterClick = (letter, index) => {
    if (selectedLetters.includes(index)) return

    const newSelectedLetters = [...selectedLetters, index]
    const newAnswer = currentAnswer + letter

    setSelectedLetters(newSelectedLetters)
    setCurrentAnswer(newAnswer)
  }

  // Handle letter removal
  const handleRemoveLetter = (indexToRemove) => {
    const newSelectedLetters = selectedLetters.filter((_, i) => i !== indexToRemove)
    const newAnswer = newSelectedLetters.map(index => gameLetters[index]).join('')
    
    setSelectedLetters(newSelectedLetters)
    setCurrentAnswer(newAnswer)
  }

  // Clear all letters
  const handleClear = () => {
    setSelectedLetters([])
    setCurrentAnswer('')
  }

  // Get hint
  const handleHint = () => {
    if (hintsUsed < 3 && currentLevelData) {
      const hint = getHint(currentLevelData.solution, hintsUsed + 1)
      setShowHint(hint)
      setHintsUsed(prev => prev + 1)
    }
  }

  // Check answer
  const handleCheckAnswer = () => {
    if (!currentLevelData) return

    const isAnswerCorrect = currentAnswer.toUpperCase() === currentLevelData.solution.toUpperCase()
    
    if (isAnswerCorrect) {
      setIsCorrect(true)
      setGameMessage(language === 'ar' ? 'إجابة صحيحة!' : 'Correct!')
      
      // Calculate and update score
      const points = calculateScore(currentLevelData.difficulty, hintsUsed)
      
      if (gameMode === 'competitive' && teams.length > 0) {
        const currentTeam = teams[currentTeamIndex]
        updateTeamScore(currentTeam.id, points)
        setGameMessage(
          language === 'ar' 
            ? `إجابة صحيحة! ${currentTeam.name} حصل على ${points} نقطة`
            : `Correct! ${currentTeam.name} earned ${points} points`
        )
      } else {
        setGameMessage(
          language === 'ar' 
            ? `إجابة صحيحة! حصلت على ${points} نقطة`
            : `Correct! You earned ${points} points`
        )
      }
    } else {
      setGameMessage(language === 'ar' ? 'إجابة خاطئة، حاول مرة أخرى' : 'Incorrect, try again')
    }
  }

  // Show solution
  const handleShowSolution = () => {
    if (currentLevelData) {
      setCurrentAnswer(currentLevelData.solution.toUpperCase())
      setGameMessage(language === 'ar' ? 'تم عرض الحل' : 'Solution revealed')
      setIsCorrect(true)
    }
  }

  // Next level
  const handleNextLevel = () => {
    if (currentLevel < levelData.levels.length - 1) {
      setCurrentLevel(prev => prev + 1)
      if (gameMode === 'competitive') {
        nextTurn()
      }
    } else {
      setGameMessage(language === 'ar' ? 'تهانينا! أكملت جميع المستويات' : 'Congratulations! You completed all levels')
    }
  }

  if (!currentLevelData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          {language === 'ar' ? 'لا توجد مستويات متاحة' : 'No levels available'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Game Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {language === 'ar' ? 'لعبة الدلائل' : 'Clue Game'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'المستوى' : 'Level'} {currentLevel + 1} / {levelData.levels.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'الصعوبة:' : 'Difficulty:'}
            </div>
            <div className={`font-semibold ${
              currentLevelData.difficulty === 'easy' ? 'text-green-600' :
              currentLevelData.difficulty === 'medium' ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {currentLevelData.difficulty === 'easy' ? (language === 'ar' ? 'سهل' : 'Easy') :
               currentLevelData.difficulty === 'medium' ? (language === 'ar' ? 'متوسط' : 'Medium') :
               (language === 'ar' ? 'صعب' : 'Hard')}
            </div>
          </div>
        </div>

        {/* Current Team (Competitive Mode) */}
        {gameMode === 'competitive' && teams.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-800 dark:text-blue-300 font-semibold">
              {language === 'ar' ? 'دور الفريق:' : 'Current Team:'} {teams[currentTeamIndex]?.name}
            </p>
          </div>
        )}

        {/* Clue */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            {language === 'ar' ? 'الدليل:' : 'Clue:'}
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {currentLevelData.clue}
          </p>
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300">
              💡 {showHint}
            </p>
          </div>
        )}

        {/* Game Message */}
        {gameMessage && (
          <div className={`mb-4 p-3 rounded-lg ${
            isCorrect 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
          }`}>
            <p>{gameMessage}</p>
          </div>
        )}
      </div>

      {/* Solution Boxes */}
      <SolutionBoxes 
        answer={currentAnswer}
        onRemoveLetter={handleRemoveLetter}
        language={language}
      />

      {/* Letter Grid */}
      <LetterGrid 
        letters={gameLetters}
        selectedIndices={selectedLetters}
        onLetterClick={handleLetterClick}
        language={language}
      />

      {/* Game Controls */}
      <GameControls 
        onHint={handleHint}
        onClear={handleClear}
        onCheck={handleCheckAnswer}
        onShowSolution={handleShowSolution}
        onNextLevel={handleNextLevel}
        hintsUsed={hintsUsed}
        canUseHint={hintsUsed < 3}
        hasAnswer={currentAnswer.length > 0}
        isCorrect={isCorrect}
        isLastLevel={currentLevel >= levelData.levels.length - 1}
        language={language}
      />

      {/* Score Display (Competitive Mode) */}
      {gameMode === 'competitive' && teams.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">
            {language === 'ar' ? 'النقاط:' : 'Scores:'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teams.map((team, index) => (
              <div 
                key={team.id}
                className={`p-3 rounded-lg text-center ${
                  index === currentTeamIndex 
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="font-semibold text-gray-800 dark:text-white">
                  {team.name}
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {scores[team.id] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ClueGameScreen

