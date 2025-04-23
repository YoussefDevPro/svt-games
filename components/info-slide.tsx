"use client"

import { Button } from "@/components/ui/button"

interface InfoSlideProps {
  slide: any
  onContinue: () => void
  isLastSlide: boolean
}

export default function InfoSlide({ slide, onContinue, isLastSlide }: InfoSlideProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
          <img
            src={slide.image || `/placeholder.svg?height=400&width=400&text=Info`}
            alt="Information"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col">
        <div className="bg-white/50 rounded-xl p-6 mb-6 flex-1 shadow-lg border border-white/50">
          <p className="text-[#4c4f69] text-xl">{slide.text}</p>
        </div>

        <Button 
          onClick={onContinue} 
          className="ml-auto bg-[#8839ef] hover:bg-[#8839ef]/80 text-white transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg py-2 px-6 rounded-xl"
        >
          {isLastSlide ? "Terminer le Quiz" : "Continuer"}
        </Button>
      </div>
    </div>
  )
}
