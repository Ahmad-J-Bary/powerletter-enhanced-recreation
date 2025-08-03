import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            PowerLetter Enhanced
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Bilingual Word Puzzle Game
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Welcome to PowerLetter Enhanced
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                A comprehensive React-based word puzzle game featuring multiple game modes, 
                bilingual support, and competitive gameplay.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                      Game Modes
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Single Player & Competitive Mode
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                      Bilingual Support
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      English & Arabic with RTL support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

