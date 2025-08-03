import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import { GameModeProvider } from './contexts/GameModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GameModeProvider>
        <App />
      </GameModeProvider>
    </ThemeProvider>
  </StrictMode>,
)
