"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface InfoSlideProps {
  slide: any
  onContinue: () => void
  isLastSlide: boolean
}

export default function InfoSlide({ slide, onContinue, isLastSlide }: InfoSlideProps) {
  const [isMounted, setIsMounted] = useState(false); // State to trigger animations

  // Trigger animation on mount/slide change
  useEffect(() => {
    setIsMounted(false); // Reset mount state for animation
    // Trigger animation after a short delay to allow DOM update
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, [slide])

  return (
    // Changed to always use flex-col for all screen sizes
    <div className={`flex flex-col gap-6 transition-opacity duration-500 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`w-full flex flex-col items-center justify-center transition-all duration-500 ease-in-out delay-100 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-full max-w-md mx-auto aspect-square rounded-xl overflow-hidden shadow-lg">
          <img
            src={slide.image || `/placeholder.svg?height=400&width=400&text=Info`}
            alt="Information"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className={`bg-white/50 rounded-xl p-6 mb-6 flex-1 shadow-lg border border-white/50 transition-all duration-500 ease-in-out delay-200 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[#4c4f69] text-xl">{slide.text}</p>
        </div>

        <Button
          onClick={onContinue}
          className={`ml-auto bg-[#8839ef] hover:bg-[#8839ef]/80 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg py-2 px-6 rounded-xl transition-all duration-500 ease-in-out delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {isLastSlide ? "Terminer le Quiz" : "Continuer"}
        </Button>
      </div>
    </div>
  )
}
