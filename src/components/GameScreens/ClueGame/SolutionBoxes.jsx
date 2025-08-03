import { X } from 'lucide-react'

const SolutionBoxes = ({ answer, onRemoveLetter, language }) => {
  const letters = answer.split('')

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 text-center">
        {language === 'ar' ? 'إجابتك:' : 'Your Answer:'}
      </h3>
      
      <div className="flex flex-wrap justify-center gap-2 min-h-[60px] items-center">
        {letters.length === 0 ? (
          <div className="text-gray-400 dark:text-gray-500 italic">
            {language === 'ar' ? 'اختر الحروف لتكوين الإجابة' : 'Select letters to form your answer'}
          </div>
        ) : (
          letters.map((letter, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-600 rounded-lg flex items-center justify-center text-xl font-bold text-blue-800 dark:text-blue-300 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200">
                {letter}
              </div>
              
              {/* Remove button */}
              <button
                onClick={() => onRemoveLetter(index)}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label={`Remove ${letter}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))
        )}
      </div>
      
      {letters.length > 0 && (
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {language === 'ar' ? 'الكلمة الحالية:' : 'Current word:'} 
            <span className="font-bold ml-2">{answer}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SolutionBoxes

