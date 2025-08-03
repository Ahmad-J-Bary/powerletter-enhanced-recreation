import { Button } from '@/components/ui/button'
import { useGameMode } from '@/contexts/GameModeContext'
import { Globe } from 'lucide-react'

const LanguageSelector = () => {
  const { language, setLanguage } = useGameMode()

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <Globe className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Choose Your Language
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select your preferred language to start playing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            variant={language === lang.code ? "default" : "outline"}
            size="lg"
            onClick={() => setLanguage(lang.code)}
            className={`h-20 text-lg font-semibold transition-all duration-200 ${
              language === lang.code 
                ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
            dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </Button>
        ))}
      </div>

      {language && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-green-800 dark:text-green-300 text-center">
            ✓ Language selected: {languages.find(l => l.code === language)?.name}
          </p>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector

