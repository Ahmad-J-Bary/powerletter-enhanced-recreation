# PowerLetter Enhanced - Bilingual Word Puzzle Game

A comprehensive React-based word puzzle game featuring multiple game modes, bilingual support, and competitive gameplay. Built with modern web technologies and designed for both single-player and team-based experiences.

## 🌟 Key Features

### 🎮 Game Modes

*   **Single Player**: Personal challenge mode with progressive difficulty
*   **Competitive Mode**: Team-based gameplay with scoring and turn rotation
*   **Multiple Game Types**: Clue-Driven Word Find (available), with Word Formation Challenge and Category Word Guess coming soon

### 🌍 Bilingual Support

*   **English**: Full Latin alphabet support with left-to-right text layout
*   **Arabic**: Complete Arabic alphabet support with right-to-left (RTL) text layout
*   **Dynamic Language Switching**: Seamless transition between languages
*   **Localized Content**: Separate level data for each language

### 🎨 Modern UI/UX

*   **Light/Dark Theme**: Toggle between light and dark modes with persistent preferences
*   **Responsive Design**: Optimized for desktop and mobile devices
*   **Smooth Animations**: Enhanced user experience with fluid transitions
*   **Accessibility**: Proper contrast ratios and keyboard navigation support

### 🏆 Competitive Features

*   **Team Management**: Configure 2-8 teams with custom names
*   **Score Tracking**: Real-time scoring system with difficulty-based points
*   **Turn-Based Gameplay**: Automatic turn rotation between teams
*   **Performance Metrics**: Track hints used and calculate scores accordingly

## 🚀 Getting Started

### Prerequisites

*   Node.js (version 18 or higher)
*   pnpm (recommended) or npm

### Installation

1.  **Clone the repository**:
    
    ```shell
    git clone https://github.com/Ahmad-J-Bary/powerletter-enhanced-recreation.git
    cd powerletter-enhanced-recreation
    ```
    
2.  **Install dependencies**:
    
    ```shell
    pnpm install
    # or
    npm install
    ```
    
3.  **Start the development server**:
    
    ```shell
    pnpm run dev --host
    # or
    npm run dev -- --host
    ```
    
4.  **Open your browser** and navigate to:
    
        http://localhost:5173
        

### Building for Production

```shell
pnpm run build
# or
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Play

### Game Initialization Flow

1.  **Language Selection**: Choose between English and Arabic
2.  **Game Mode Selection**: Select Single Player or Competitive mode
3.  **Team Setup** (Competitive only): Configure team names and count
4.  **Game Type Selection**: Choose from available game types
5.  **Start Playing**: Begin your word puzzle adventure!

### Clue-Driven Word Find Gameplay

1.  **Read the Clue**: Each level presents a clue to help identify the target word
2.  **Analyze the Letters**: Letters are scrambled according to difficulty level:
    *   **Easy**: 10 total letters
    *   **Medium**: 14 total letters
    *   **Hard**: 20 total letters
3.  **Form Your Answer**: Click letters to build your solution
4.  **Use Helper Tools**:
    *   **Hint System**: Get up to 3 hints per level
    *   **Remove/Clear**: Edit your current answer
    *   **Show Solution**: Reveal the correct answer
5.  **Check Answer**: Validate your solution
6.  **Progress**: Move between levels and track your score

### Competitive Mode

*   Teams take turns solving puzzles
*   Points awarded based on difficulty and hints used
*   Automatic turn rotation after each completed level
*   Real-time score tracking for all teams

## 🏗️ Project Architecture

### Directory Structure

    powerletter-enhanced-recreation/
    ├── src/
    │   ├── components/
    │   │   ├── GameSetup/
    │   │   │   ├── LanguageSelector.jsx
    │   │   │   ├── ModeToggler.jsx
    │   │   │   ├── GameModeSelector.jsx
    │   │   │   └── TeamConfigurator.jsx
    │   │   ├── GameScreens/
    │   │   │   ├── ClueGame/
    │   │   │   │   ├── ClueGameScreen.jsx
    │   │   │   │   ├── SolutionBoxes.jsx
    │   │   │   │   ├── LetterGrid.jsx
    │   │   │   │   └── GameControls.jsx
    │   │   │   ├── GameTypeSelector.jsx
    │   │   │   └── ComingSoon.jsx
    │   │   └── ui/                    # Shadcn/UI components
    │   ├── contexts/
    │   │   ├── ThemeContext.jsx       # Light/Dark theme management
    │   │   └── GameModeContext.jsx    # Game state management
    │   ├── data/
    │   │   ├── en/
    │   │   │   └── clueLevels.json    # English level data
    │   │   └── ar/
    │   │       └── clueLevels.json    # Arabic level data
    │   ├── lib/
    │   │   └── gameUtils.js           # Game logic utilities
    │   ├── App.jsx                    # Main application component
    │   ├── App.css                    # Global styles
    │   └── main.jsx                   # Entry point
    ├── public/                        # Static assets
    ├── package.json                   # Dependencies and scripts
    └── README.md                      # This file

### Key Components

#### Context Providers

*   **ThemeContext**: Manages light/dark theme state with localStorage persistence
*   **GameModeContext**: Handles game state, language, teams, and scoring

#### Game Setup Flow

*   **LanguageSelector**: Bilingual language selection interface
*   **GameModeSelector**: Single player vs competitive mode selection
*   **TeamConfigurator**: Team setup for competitive mode
*   **GameTypeSelector**: Choose between available game types

#### Gameplay Components

*   **ClueGameScreen**: Main game interface with level management
*   **SolutionBoxes**: Dynamic word display with visual feedback
*   **LetterGrid**: Interactive letter selection with two-row layout
*   **GameControls**: Complete control panel for game actions

### Technical Stack

*   **Frontend Framework**: React 18 with Vite
*   **Styling**: Tailwind CSS + Shadcn/UI components
*   **Icons**: Lucide React
*   **State Management**: React Context API with hooks
*   **Build Tool**: Vite with hot module replacement
*   **Package Manager**: pnpm (recommended) or npm

## 🔧 Configuration & Customization

### Adding New Levels

Edit the appropriate language file in `src/data/[language]/clueLevels.json`:

```json
{
  "levels": [
    {
      "id": "easy-new",
      "difficulty": "easy",
      "clue": "Your clue here",
      "solution": "ANSWER"
    }
  ]
}
```

### Difficulty Settings

The game uses a dynamic letter generation system:

*   **Easy**: 10 total letters (solution + random extras)
*   **Medium**: 14 total letters (solution + random extras)
*   **Hard**: 20 total letters (solution + random extras)

### Theme Customization

Themes are defined in `src/App.css` using CSS custom properties. The system supports:

*   Automatic dark mode detection
*   Manual theme switching
*   Persistent theme preferences

### Language Support

To add a new language:

1.  Create a new directory in `src/data/[language-code]/`
2.  Add `clueLevels.json` with translated content
3.  Update the language selector in `LanguageSelector.jsx`
4.  Add language-specific utilities in `gameUtils.js`

## 🎨 Design System

### Color Palette

*   **Primary**: Blue tones for main actions and branding
*   **Secondary**: Gray tones for secondary elements
*   **Success**: Green for correct answers and achievements
*   **Warning**: Orange for hints and warnings
*   **Error**: Red for incorrect answers and destructive actions

### Typography

*   **Headings**: Bold, clear hierarchy
*   **Body Text**: Readable font sizes with proper line height
*   **Arabic Text**: Proper RTL support with Arabic font rendering

### Responsive Breakpoints

*   **Mobile**: < 768px
*   **Tablet**: 768px - 1024px
*   **Desktop**: > 1024px

## 🧪 Development

### Available Scripts

*   `pnpm run dev` - Start development server
*   `pnpm run build` - Build for production
*   `pnpm run preview` - Preview production build
*   `pnpm run lint` - Run ESLint

### Code Structure

*   Components are organized by feature and functionality
*   Contexts provide global state management
*   Utilities handle game logic and calculations
*   Data files contain level information for each language

## 🤝 Contributing

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

*   Built with React and Vite
*   UI components from Shadcn/UI
*   Icons from Lucide React
*   Styling with Tailwind CSS

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**PowerLetter Enhanced** - Making word puzzles accessible and enjoyable in multiple languages! 🌍🎮

