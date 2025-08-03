import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useGameMode } from '@/contexts/GameModeContext'
import { Plus, Trash2, Users } from 'lucide-react'

const TeamConfigurator = () => {
  const { teams, addTeam, removeTeam, language } = useGameMode()
  const [newTeamName, setNewTeamName] = useState('')

  const handleAddTeam = () => {
    if (newTeamName.trim() && teams.length < 8) {
      addTeam(newTeamName.trim())
      setNewTeamName('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTeam()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="text-center mb-6">
        <Users className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {language === 'ar' ? 'إعداد الفرق' : 'Team Setup'}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {language === 'ar' 
            ? 'أضف من 2 إلى 8 فرق للعب التنافسي' 
            : 'Add 2-8 teams for competitive play'}
        </p>
      </div>

      {/* Add Team Section */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder={language === 'ar' ? 'اسم الفريق' : 'Team name'}
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            disabled={teams.length >= 8}
          />
          <Button
            onClick={handleAddTeam}
            disabled={!newTeamName.trim() || teams.length >= 8}
            className="bg-green-500 hover:bg-green-600"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {teams.length >= 8 && (
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
            {language === 'ar' ? 'الحد الأقصى 8 فرق' : 'Maximum 8 teams allowed'}
          </p>
        )}
      </div>

      {/* Teams List */}
      {teams.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800 dark:text-white">
            {language === 'ar' ? 'الفرق المضافة:' : 'Added Teams:'}
          </h3>
          {teams.map((team, index) => (
            <div
              key={team.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-800 dark:text-white">
                  {team.name}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeTeam(team.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Status Message */}
      <div className="mt-6">
        {teams.length === 0 && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300 text-center">
              {language === 'ar' 
                ? 'أضف فريقين على الأقل للبدء' 
                : 'Add at least 2 teams to start'}
            </p>
          </div>
        )}
        {teams.length === 1 && (
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-yellow-800 dark:text-yellow-300 text-center">
              {language === 'ar' 
                ? 'أضف فريق واحد آخر على الأقل' 
                : 'Add at least one more team'}
            </p>
          </div>
        )}
        {teams.length >= 2 && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-800 dark:text-green-300 text-center">
              ✓ {language === 'ar' 
                ? `جاهز للعب مع ${teams.length} فرق` 
                : `Ready to play with ${teams.length} teams`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamConfigurator

