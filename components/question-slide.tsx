"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { shuffle } from "@/lib/utils"

interface Choice {
  label: string
  emoji: string
  image?: string // Added optional image property
}

interface QuestionSlideProps {
  slide: any
  onCorrectAnswer: () => void
  onIncorrectAnswer: () => void
}

export default function QuestionSlide({ slide, onCorrectAnswer, onIncorrectAnswer }: QuestionSlideProps) {
  const [shuffledChoices, setShuffledChoices] = useState<Choice[]>([])
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Shuffle choices when slide changes or on retry
  useEffect(() => {
    setShuffledChoices(shuffle([...slide.choices]))
    setSelectedChoice(null)
    setIsCorrect(null)
  }, [slide])

  const handleChoiceSelect = (choice: Choice) => {
    setSelectedChoice(choice)

    const correctAnswer = slide.choices[0] // First choice is always correct
    const isAnswerCorrect = choice.label === correctAnswer.label

    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      onCorrectAnswer()
    } else {
      onIncorrectAnswer()
      // Reshuffle choices after a short delay
      setTimeout(() => {
        setShuffledChoices(shuffle([...slide.choices]))
        setSelectedChoice(null)
        setIsCorrect(null)
      }, 1500)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
          <img
            src={slide.image || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(slide.question)}`}
            alt={slide.question}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col">
        <h3 className="text-3xl font-medium text-[#4c4f69] mb-8">{slide.question}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 flex-1">
          {shuffledChoices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleChoiceSelect(choice)}
              disabled={selectedChoice !== null}
              className={`
                h-auto py-8 px-8 text-left rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center
                ${
                  selectedChoice?.label === choice.label
                    ? isCorrect
                      ? "bg-[#40a02b]/20 text-[#40a02b] border-[#40a02b]/50"
                      : "bg-[#d20f39]/20 text-[#d20f39] border-[#d20f39]/50"
                    : "bg-white/50 hover:bg-white/70 text-[#4c4f69] border-[#ccd0da]"
                }
              `}
              style={{
                boxShadow: "5px 5px 10px rgba(166, 173, 200, 0.2), -5px -5px 10px rgba(255, 255, 255, 0.7)",
              }}
              variant="outline"
            >
              {choice.image ? (
                <img 
                  src={choice.image} 
                  alt={choice.label}
                  className="w-24 h-24 mb-4 object-contain" 
                />
              ) : (
                <span className="text-6xl mb-4">{choice.emoji}</span>
              )}
              <span className="text-center text-xl">{choice.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
