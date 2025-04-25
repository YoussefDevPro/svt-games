"use client"

import { Heart, TreesIcon as Lungs, Utensils, Droplet, Beef, HeartPulse, Wind, HandPlatter } from "lucide-react"

interface MainMenuProps {
  onQuizSelect: (quizId: string) => void
}

export default function MainMenu({ onQuizSelect }: MainMenuProps) {
  const quizzes = [
    {
      id: "digestive_system",
      title: "Système Digestif",
      icon: <Beef className="h-12 w-12 mb-2" />,
      color: "bg-[#fe640b]/10 hover:bg-[#fe640b]/20",
      textColor: "text-[#fe640b]",
      borderColor: "border-[#fe640b]/30",
      shadowColor: "shadow-[#fe640b]/10",
    },
    {
      id: "circulatory_system",
      title: "Système Circulatoire",
      icon: <HeartPulse className="h-12 w-12 mb-2" />,
      color: "bg-[#d20f39]/10 hover:bg-[#d20f39]/20",
      textColor: "text-[#d20f39]",
      borderColor: "border-[#d20f39]/30",
      shadowColor: "shadow-[#d20f39]/10",
    },
    {
      id: "respiratory_system",
      title: "Système Respiratoire",
      icon: <Wind className="h-12 w-12 mb-2" />,
      color: "bg-[#179299]/10 hover:bg-[#179299]/20",
      textColor: "text-[#179299]",
      borderColor: "border-[#179299]/30",
      shadowColor: "shadow-[#179299]/10",
    },
    {
      id: "nutrition",
      title: "Nutrition",
      icon: <HandPlatter className="h-12 w-12 mb-2" />,
      color: "bg-[#40a02b]/10 hover:bg-[#40a02b]/20",
      textColor: "text-[#40a02b]",
      borderColor: "border-[#40a02b]/30",
      shadowColor: "shadow-[#40a02b]/10",
    },
  ]

  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-3xl font-semibold text-[#4c4f69] mb-8 text-center">Choisissez un Sujet</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() => onQuizSelect(quiz.id)}
            className={`flex flex-col items-center justify-center p-10 rounded-2xl ${quiz.color} ${quiz.textColor} border ${quiz.borderColor} transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${quiz.shadowColor}`}
            style={{
              boxShadow: "8px 8px 16px rgba(166, 173, 200, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.7)",
            }}
          >
            {quiz.icon}
            <span className="text-2xl font-medium mt-2">{quiz.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
