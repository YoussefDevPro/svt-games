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
    <div className={`flex flex-col md:flex-row gap-6 transition-opacity duration-500 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`w-full md:w-1/2 flex flex-col items-center justify-center transition-all duration-500 ease-in-out delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
          <img
            src={slide.image || `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(slide.question)}`}
            alt={slide.question}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col">
        <h3 className={`text-2xl font-medium text-[#4c4f69] mb-6 transition-all duration-500 ease-in-out delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>{slide.question}</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
          {shuffledChoices.map((choice, index) => (
            <Button
              key={index}
              onClick={() => handleChoiceSelect(choice)}
              disabled={selectedChoice !== null}
              className={`
                h-auto py-6 px-6 text-left rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center
                transition-all duration-500 ease-in-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                ${ // Apply delay based on index
                  isMounted ? `delay-${index * 100 + 300}` : ''
                }
                ${ // Existing conditional styles
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
                  className="w-16 h-16 mb-3 object-contain" 
                />
              ) : (
                <span className="text-5xl mb-3">{choice.emoji}</span>
              )}
              <span className="text-center text-lg">{choice.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
