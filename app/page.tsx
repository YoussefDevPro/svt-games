"use client"

import { useState } from "react"
import { toast } from "sonner"
import MainMenu from "@/components/main-menu"
import QuizContainer from "@/components/quiz-container"
import quizData from "@/data/quiz-data.json"

export default function Home() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  

  const handleQuizSelect = (quizId: string) => {
    setActiveQuiz(quizId)
  }

  const handleBackToMenu = () => {
    setActiveQuiz(null)
  }

  const handleScoreChange = (points: number, hint?: string) => {
    setScore((prevScore) => prevScore + points)

    if (hint) {
      toast.success(hint, {
        description: "Indice",
        duration: 3000
      })
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-0 bg-gradient-to-br from-[#eff1f5] to-[#e6e9ef] animated-bg">
      <div className="fixed top-6 right-6 z-50 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50">
        <div className="text-2xl font-semibold text-[#8839ef]">Score: {score}</div>
      </div>

      <div className="w-full h-screen rounded-none overflow-hidden backdrop-blur-md bg-white/40 border border-white/20 shadow-lg flex flex-col">
        <header className="p-6 text-center">
          <h1 className="text-4xl font-bold text-[#4c4f69]">Quiz de Biologie Humaine</h1>
        </header>

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
            <MainMenu onQuizSelect={handleQuizSelect} />
          )}
        </div>
      </div>
    </main>
  )
}
