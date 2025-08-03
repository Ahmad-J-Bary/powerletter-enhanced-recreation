import { useState } from 'react'
import { useGameMode } from './contexts/GameModeContext'
import './App.css'

// Import components
import ModeToggler from './components/GameSetup/ModeToggler'
import LanguageSelector from './components/GameSetup/LanguageSelector'
import GameModeSelector from './components/GameSetup/GameModeSelector'
import TeamConfigurator from './components/GameSetup/TeamConfigurator'
import GameTypeSelector from './components/GameScreens/GameTypeSelector'

function App() {
  const { 
    language, 
    gameMode, 
    gameType, 
    teams, 
    gameStarted,
    setGameStarted 
  } = useGameMode()

  // Determine current setup step
  const getCurrentStep = () => {
    if (!language) return 'language'
    if (!gameMode) return 'gameMode'
    if (gameMode === 'competitive' && teams.length < 2) return 'teams'
    if (!gameType) return 'gameType'
    return 'ready'
  }

  const currentStep = getCurrentStep()

  const handleStartGame = () => {
    setGameStarted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <ModeToggler />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            PowerLetter Enhanced
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'ar' ? 'لعبة ألغاز الكلمات ثنائية اللغة' : 'Bilingual Word Puzzle Game'}
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          {!gameStarted ? (
            <div className="space-y-6">
              {/* Language Selection */}
              {currentStep === 'language' && <LanguageSelector />}
              
              {/* Game Mode Selection */}
              {currentStep === 'gameMode' && <GameModeSelector />}
              
              {/* Team Configuration (only for competitive mode) */}
              {currentStep === 'teams' && <TeamConfigurator />}
              
              {/* Game Type Selection */}
              {currentStep === 'gameType' && <GameTypeSelector />}
              
              {/* Ready to Start */}
              {currentStep === 'ready' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    {language === 'ar' ? 'جاهز للبدء!' : 'Ready to Start!'}
                  </h2>
                  <div className="space-y-2 mb-6 text-gray-600 dark:text-gray-300">
                    <p>
                      <strong>{language === 'ar' ? 'اللغة:' : 'Language:'}</strong> {language === 'ar' ? 'العربية' : 'English'}
                    </p>
                    <p>
                      <strong>{language === 'ar' ? 'نمط اللعب:' : 'Game Mode:'}</strong> {
                        gameMode === 'single' 
                          ? (language === 'ar' ? 'لاعب واحد' : 'Single Player')
                          : (language === 'ar' ? 'تنافسي' : 'Competitive')
                      }
                    </p>
                    {gameMode === 'competitive' && (
                      <p>
                        <strong>{language === 'ar' ? 'الفرق:' : 'Teams:'}</strong> {teams.length} {language === 'ar' ? 'فرق' : 'teams'}
                      </p>
                    )}
                    <p>
                      <strong>{language === 'ar' ? 'نوع اللعبة:' : 'Game Type:'}</strong> {
                        gameType === 'clue-game' 
                          ? (language === 'ar' ? 'لعبة الدلائل' : 'Clue-Driven Word Find')
                          : gameType
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleStartGame}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                  >
                    {language === 'ar' ? 'ابدأ اللعب!' : 'Start Playing!'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {language === 'ar' ? 'اللعبة قيد التطوير' : 'Game In Development'}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {language === 'ar' 
                  ? 'سيتم إضافة واجهة اللعب في المرحلة التالية' 
                  : 'Game interface will be added in the next phase'}
              </p>
              <button
                onClick={() => setGameStarted(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                {language === 'ar' ? 'العودة للإعدادات' : 'Back to Setup'}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App

