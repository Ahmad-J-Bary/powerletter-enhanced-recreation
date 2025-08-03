import { Button } from '@/components/ui/button'
import { useGameMode } from '@/contexts/GameModeContext'
import { Lightbulb, Puzzle, Target } from 'lucide-react'

const GameTypeSelector = () => {
  const { gameType, setGameType, language } = useGameMode()

  const gameTypes = [
    {
      id: 'clue-game',
      name: language === 'ar' ? 'لعبة الدلائل' : 'Clue-Driven Word Find',
      description: language === 'ar' 
        ? 'اعثر على الكلمة باستخدام الدلائل المعطاة' 
        : 'Find the word using given clues',
      icon: Lightbulb,
      available: true,
      color: 'blue'
    },
    {
      id: 'word-formation',
      name: language === 'ar' ? 'تكوين الكلمات' : 'Word Formation Challenge',
      description: language === 'ar' 
        ? 'كون أكبر عدد من الكلمات من الحروف المعطاة' 
        : 'Form as many words as possible from given letters',
      icon: Puzzle,
      available: false,
      color: 'green'
    },
    {
      id: 'category-guess',
      name: language === 'ar' ? 'تخمين الفئة' : 'Category Word Guess',
      description: language === 'ar' 
        ? 'خمن الكلمات من فئة معينة' 
        : 'Guess words from a specific category',
      icon: Target,
      available: false,
      color: 'purple'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {language === 'ar' ? 'اختر نوع اللعبة' : 'Choose Game Type'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {language === 'ar' 
            ? 'حدد نوع التحدي الذي تريد لعبه' 
            : 'Select the type of challenge you want to play'}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {gameTypes.map((type) => {
          const Icon = type.icon
          const isSelected = gameType === type.id
          const isAvailable = type.available
          
          return (
            <Button
              key={type.id}
              variant="outline"
              onClick={() => isAvailable && setGameType(type.id)}
              disabled={!isAvailable}
              className={`h-auto p-6 text-left transition-all duration-200 ${
                !isAvailable 
                  ? 'opacity-50 cursor-not-allowed' 
                  : isSelected 
                    ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20` 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  !isAvailable 
                    ? 'bg-gray-200 dark:bg-gray-600 text-gray-400' 
                    : isSelected 
                      ? `bg-${type.color}-500 text-white` 
                      : `bg-${type.color}-100 dark:bg-${type.color}-900/30 text-${type.color}-600 dark:text-${type.color}-400`
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className={`font-semibold text-lg ${
                      !isAvailable 
                        ? 'text-gray-400' 
                        : isSelected 
                          ? `text-${type.color}-700 dark:text-${type.color}-300` 
                          : 'text-gray-800 dark:text-white'
                    }`}>
                      {type.name}
                    </h3>
                    {!isAvailable && (
                      <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded">
                        {language === 'ar' ? 'قريباً' : 'Coming Soon'}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm ${
                    !isAvailable 
                      ? 'text-gray-400' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {type.description}
                  </p>
                  {isSelected && isAvailable && (
                    <div className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400">
                      <span>✓ {language === 'ar' ? 'محدد' : 'Selected'}</span>
                    </div>
                  )}
                </div>
              </div>
            </Button>
          )
        })}
      </div>

      {gameType === 'clue-game' && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            {language === 'ar' ? 'كيفية اللعب:' : 'How to Play:'}
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• {language === 'ar' ? 'اقرأ الدليل المعطى' : 'Read the given clue'}</li>
            <li>• {language === 'ar' ? 'حلل الحروف المتاحة' : 'Analyze the available letters'}</li>
            <li>• {language === 'ar' ? 'كون الإجابة الصحيحة' : 'Form the correct answer'}</li>
            <li>• {language === 'ar' ? 'استخدم التلميحات عند الحاجة' : 'Use hints when needed'}</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default GameTypeSelector

