"use client"

import { useState } from "react"
import { toast, Toaster } from "sonner"
import MainMenu from "@/components/main-menu"
import QuizContainer from "@/components/quiz-container"
import quizData from "@/data/quiz-data.json"

export default function Home() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [currentHint, setCurrentHint] = useState<string | null>(null)
  

  const handleQuizSelect = (quizId: string) => {
    setActiveQuiz(quizId)
  }

  const handleBackToMenu = () => {
    setActiveQuiz(null)
  }

  const handleScoreChange = (points: number, hint?: string) => {
    setScore((prevScore) => prevScore + points)

    if (hint) {
      setCurrentHint(hint)
      setShowHint(true)
      
      // Auto-hide hint after 3 seconds
      setTimeout(() => {
        setShowHint(false)
      }, 3000)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0 bg-gradient-to-br from-[#eff1f5] to-[#e6e9ef] animated-bg">
      {/* Score moved to the left side */}
      {activeQuiz && (
        <div className="fixed top-6 right-6 z-50 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50">
          <div className="text-3xl font-semibold text-[#8839ef]">Score: {score}</div>
        </div>
      )}

      {/* Hint popup with red overlay */}
      {showHint && (
        <div className="fixed inset-0 bg-[#d20f39]/30 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md mx-auto shadow-lg border border-[#d20f39]/50 transform transition-all duration-300 scale-100">
            <h3 className="text-2xl font-semibold text-[#4c4f69] mb-2">Indice</h3>
            <p className="text-xl text-[#4c4f69]">{currentHint}</p>
          </div>
        </div>
      )}

      <div className="w-full h-screen rounded-none overflow-hidden backdrop-blur-md bg-white/40 border border-white/20 shadow-lg flex flex-col">
        {!activeQuiz && (
          <header className="p-6 text-center">
            <h1 className="text-5xl font-bold text-[#4c4f69]">Quiz de Biologie Humaine</h1>
          </header>
        )}

        <div className="flex-1 flex items-center justify-center p-6">
          {activeQuiz ? (
            <QuizContainer
              quizId={activeQuiz}
              quizData={quizData}
              onBackToMenu={() => {
                setActiveQuiz(null)
                setScore(0) // Reset score when exiting quiz
              }}
              onScoreChange={handleScoreChange}
            />
          ) : (
            <MainMenu onQuizSelect={handleQuizSelect} showTitle={!activeQuiz} />
          )}
        </div>
      </div>
    </main>
  )
}
