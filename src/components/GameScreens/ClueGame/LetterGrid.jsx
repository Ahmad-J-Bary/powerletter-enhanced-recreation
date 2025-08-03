const LetterGrid = ({ letters, selectedIndices, onLetterClick, language }) => {
  // Split letters into two rows for better layout
  const midPoint = Math.ceil(letters.length / 2)
  const firstRow = letters.slice(0, midPoint)
  const secondRow = letters.slice(midPoint)

  const renderLetterButton = (letter, originalIndex) => {
    const isSelected = selectedIndices.includes(originalIndex)
    
    return (
      <button
        key={originalIndex}
        onClick={() => !isSelected && onLetterClick(letter, originalIndex)}
        disabled={isSelected}
        className={`w-12 h-12 rounded-lg text-xl font-bold transition-all duration-200 transform hover:scale-105 ${
          isSelected
            ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed opacity-50'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer shadow-md hover:shadow-lg'
        }`}
        aria-label={`Select letter ${letter}`}
      >
        {letter}
      </button>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4 text-center">
        {language === 'ar' ? 'الحروف المتاحة:' : 'Available Letters:'}
      </h3>
      
      <div className="space-y-4">
        {/* First Row */}
        <div className="flex justify-center gap-2 flex-wrap">
          {firstRow.map((letter, index) => 
            renderLetterButton(letter, index)
          )}
        </div>
        
        {/* Second Row */}
        {secondRow.length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap">
            {secondRow.map((letter, index) => 
              renderLetterButton(letter, midPoint + index)
            )}
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        {language === 'ar' 
          ? 'انقر على الحروف لتكوين إجابتك' 
          : 'Click on letters to form your answer'}
      </div>
    </div>
  )
}

export default LetterGrid

