import { createContext, useContext, useState } from 'react'

const GameModeContext = createContext()

export const useGameMode = () => {
  const context = useContext(GameModeContext)
  if (!context) {
    throw new Error('useGameMode must be used within a GameModeProvider')
  }
  return context
}

export const GameModeProvider = ({ children }) => {
  const [language, setLanguage] = useState('en') // 'en' or 'ar'
  const [gameMode, setGameMode] = useState('single') // 'single' or 'competitive'
  const [gameType, setGameType] = useState('') // 'clue-game', 'word-formation', 'category-guess'
  const [teams, setTeams] = useState([])
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)
  const [scores, setScores] = useState({})
  const [currentLevel, setCurrentLevel] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)

  // Team management functions
  const addTeam = (teamName) => {
    const newTeam = {
      id: Date.now(),
      name: teamName,
      score: 0
    }
    setTeams(prev => [...prev, newTeam])
    setScores(prev => ({ ...prev, [newTeam.id]: 0 }))
  }

  const removeTeam = (teamId) => {
    setTeams(prev => prev.filter(team => team.id !== teamId))
    setScores(prev => {
      const newScores = { ...prev }
      delete newScores[teamId]
      return newScores
    })
  }

  const updateTeamScore = (teamId, points) => {
    setScores(prev => ({
      ...prev,
      [teamId]: (prev[teamId] || 0) + points
    }))
  }

  const nextTurn = () => {
    if (gameMode === 'competitive' && teams.length > 0) {
      setCurrentTeamIndex(prev => (prev + 1) % teams.length)
    }
  }

  const resetGame = () => {
    setCurrentLevel(0)
    setCurrentTeamIndex(0)
    setGameStarted(false)
    if (gameMode === 'competitive') {
      const resetScores = {}
      teams.forEach(team => {
        resetScores[team.id] = 0
      })
      setScores(resetScores)
    }
  }

  const value = {
    language,
    setLanguage,
    gameMode,
    setGameMode,
    gameType,
    setGameType,
    teams,
    setTeams,
    addTeam,
    removeTeam,
    currentTeamIndex,
    setCurrentTeamIndex,
    scores,
    setScores,
    updateTeamScore,
    nextTurn,
    currentLevel,
    setCurrentLevel,
    gameStarted,
    setGameStarted,
    resetGame
  }

  return (
    <GameModeContext.Provider value={value}>
      {children}
    </GameModeContext.Provider>
  )
}

