import { Button } from '@/components/ui/button'
import { Lightbulb, RotateCcw, CheckCircle, Eye, ArrowRight } from 'lucide-react'

const GameControls = ({
  onHint,
  onClear,
  onCheck,
  onShowSolution,
  onNextLevel,
  hintsUsed,
  canUseHint,
  hasAnswer,
  isCorrect,
  isLastLevel,
  language
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 text-center">
        {language === 'ar' ? 'أدوات التحكم:' : 'Game Controls:'}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Hint Button */}
        <Button
          onClick={onHint}
          disabled={!canUseHint}
          variant="outline"
          className="flex flex-col items-center p-4 h-auto space-y-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
        >
          <Lightbulb className="h-5 w-5" />
          <span className="text-xs">
            {language === 'ar' ? 'تلميح' : 'Hint'}
          </span>
          <span className="text-xs text-gray-500">
            ({hintsUsed}/3)
          </span>
        </Button>

        {/* Clear Button */}
        <Button
          onClick={onClear}
          disabled={!hasAnswer}
          variant="outline"
          className="flex flex-col items-center p-4 h-auto space-y-2 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <RotateCcw className="h-5 w-5" />
          <span className="text-xs">
            {language === 'ar' ? 'مسح' : 'Clear'}
          </span>
        </Button>

        {/* Check Answer Button */}
        <Button
          onClick={onCheck}
          disabled={!hasAnswer || isCorrect}
          className="flex flex-col items-center p-4 h-auto space-y-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <CheckCircle className="h-5 w-5" />
          <span className="text-xs">
            {language === 'ar' ? 'تحقق' : 'Check'}
          </span>
        </Button>

        {/* Show Solution Button */}
        <Button
          onClick={onShowSolution}
          disabled={isCorrect}
          variant="outline"
          className="flex flex-col items-center p-4 h-auto space-y-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
        >
          <Eye className="h-5 w-5" />
          <span className="text-xs">
            {language === 'ar' ? 'الحل' : 'Solution'}
          </span>
        </Button>

        {/* Next Level Button */}
        <Button
          onClick={onNextLevel}
          disabled={!isCorrect}
          className="flex flex-col items-center p-4 h-auto space-y-2 bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
        >
          <ArrowRight className="h-5 w-5" />
          <span className="text-xs">
            {isLastLevel 
              ? (language === 'ar' ? 'إنهاء' : 'Finish')
              : (language === 'ar' ? 'التالي' : 'Next')
            }
          </span>
        </Button>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === 'ar' ? (
          <div className="space-y-1">
            <p>• استخدم التلميحات للمساعدة (تقلل من النقاط)</p>
            <p>• امسح الحروف لإعادة المحاولة</p>
            <p>• تحقق من إجابتك عند الانتهاء</p>
          </div>
        ) : (
          <div className="space-y-1">
            <p>• Use hints for help (reduces points)</p>
            <p>• Clear letters to try again</p>
            <p>• Check your answer when ready</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameControls

