"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import QuestionSlide from "@/components/question-slide"
import InfoSlide from "@/components/info-slide"
import { Button } from "@/components/ui/button"

interface QuizContainerProps {
  quizId: string
  quizData: any
  onBackToMenu: () => void
  onScoreChange: (points: number, hint?: string) => void
}

export default function QuizContainer({ quizId, quizData, onBackToMenu, onScoreChange }: QuizContainerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [quiz, setQuiz] = useState<any>(null)

  useEffect(() => {
    const selectedQuiz = quizData.quizzes.find((q: any) => q.id === quizId)
    setQuiz(selectedQuiz)
    setCurrentSlideIndex(0)
  }, [quizId, quizData])

  const handleNextSlide = () => {
    if (quiz && currentSlideIndex < quiz.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1)
    } else {
      // Quiz completed
      onBackToMenu()
    }
  }

  const handleCorrectAnswer = () => {
    onScoreChange(30)
    handleNextSlide()
  }

  const handleIncorrectAnswer = () => {
    const currentSlide = quiz.slides[currentSlideIndex]
    const randomHintIndex = Math.floor(Math.random() * currentSlide.hints.length)
    const randomHint = currentSlide.hints[randomHintIndex]

    onScoreChange(-10, randomHint)
  }

  if (!quiz) return <div>Chargement...</div>

  const currentSlide = quiz.slides[currentSlideIndex]
  const isLastSlide = currentSlideIndex === quiz.slides.length - 1

  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBackToMenu} className="flex items-center text-[#4c4f69] text-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour au Menu
        </Button>
        <h2 className="text-2xl font-semibold text-[#4c4f69] ml-6">{quiz.title}</h2>
        <div className="ml-auto text-lg text-[#4c4f69]">
          Diapositive {currentSlideIndex + 1} sur {quiz.slides.length}
        </div>
      </div>

      <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50 transition-all duration-300">
        {currentSlide.type === "question" ? (
          <QuestionSlide
            slide={currentSlide}
            onCorrectAnswer={handleCorrectAnswer}
            onIncorrectAnswer={handleIncorrectAnswer}
          />
        ) : (
          <InfoSlide slide={currentSlide} onContinue={handleNextSlide} isLastSlide={isLastSlide} />
        )}
      </div>
    </div>
  )
}
