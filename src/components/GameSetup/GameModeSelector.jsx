import { Button } from '@/components/ui/button'
import { useGameMode } from '@/contexts/GameModeContext'
import { User, Users } from 'lucide-react'

const GameModeSelector = () => {
  const { gameMode, setGameMode, language } = useGameMode()

  const gameModes = [
    {
      id: 'single',
      name: language === 'ar' ? 'لاعب واحد' : 'Single Player',
      description: language === 'ar' 
        ? 'تحدي شخصي مع صعوبة متدرجة' 
        : 'Personal challenge mode with progressive difficulty',
      icon: User,
      color: 'blue'
    },
    {
      id: 'competitive',
      name: language === 'ar' ? 'تنافسي' : 'Competitive Mode',
      description: language === 'ar' 
        ? 'لعب جماعي مع نظام النقاط والفرق' 
        : 'Team-based gameplay with scoring and turn rotation',
      icon: Users,
      color: 'green'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {language === 'ar' ? 'اختر نمط اللعب' : 'Choose Game Mode'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {language === 'ar' 
            ? 'حدد كيف تريد أن تلعب' 
            : 'Select how you want to play'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gameModes.map((mode) => {
          const Icon = mode.icon
          const isSelected = gameMode === mode.id
          
          return (
            <Button
              key={mode.id}
              variant="outline"
              onClick={() => setGameMode(mode.id)}
              className={`h-auto p-6 text-left transition-all duration-200 ${
                isSelected 
                  ? `border-${mode.color}-500 bg-${mode.color}-50 dark:bg-${mode.color}-900/20` 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  isSelected 
                    ? `bg-${mode.color}-500 text-white` 
                    : `bg-${mode.color}-100 dark:bg-${mode.color}-900/30 text-${mode.color}-600 dark:text-${mode.color}-400`
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg mb-2 ${
                    isSelected 
                      ? `text-${mode.color}-700 dark:text-${mode.color}-300` 
                      : 'text-gray-800 dark:text-white'
                  }`}>
                    {mode.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {mode.description}
                  </p>
                  {isSelected && (
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
    </div>
  )
}

export default GameModeSelector

