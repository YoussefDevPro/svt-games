"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { shuffle } from "@/lib/utils"

interface Choice {
  label: string
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
  const [isMounted, setIsMounted] = useState(false); // State to trigger animations

  // Shuffle choices and reset state when slide changes
  useEffect(() => {
    setShuffledChoices(shuffle([...slide.choices]))
    setSelectedChoice(null)
    setIsCorrect(null)
    setIsMounted(false); // Reset mount state for animation
    // Trigger animation after a short delay to allow DOM update
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
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
    <div className={`flex flex-col gap-0 transition-opacity duration-500 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`w-full flex flex-col items-center justify-start transition-all duration-500 ease-in-out delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-full aspect-square rounded-xl overflow-hidden mb-4">
          <img
            src={slide.image || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(slide.question)}`}
            alt={slide.question}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-start">
        <h3 className={`text-18 font-medium text-[#4c4f69] mb-2 transition-all duration-500 ease-in-out delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{slide.question}</h3>

        <div className={`grid grid-cols-2 gap-4 w-full mt-6 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} transition-all duration-500`}>
          {shuffledChoices.map((choice, index) => (
            <Button
              key={index}
              variant="outline"
              className={`h-auto min-h-[100px] p-4 text-lg md:text-xl transition-all duration-300 ${
                selectedChoice === choice
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                    : 'border-red-500 bg-red-50 hover:bg-red-100'
                  : 'hover:scale-[1.02]'
              }`}
              onClick={() => !selectedChoice && handleChoiceSelect(choice)}
              disabled={!!selectedChoice}
            >
              <div className="flex flex-col items-center gap-2 w-full">
                {choice.image && (
                  <img 
                    src={choice.image}
                    alt="Choice visual"
                    className="w-full max-w-[120px] h-auto max-h-[80px] object-contain mb-2"
                  />
                )}
                <span className="font-medium whitespace-normal">{choice.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
      </div>
  )
}
