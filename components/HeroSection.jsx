'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function HeroSection({ image }) {
  const router = useRouter()

  return (
    <div className="relative h-[40vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh] w-full">
      {image && image.image ? (
        <img
          src={typeof image.image === 'string' ? `data:image/png;base64,${image.image}` : image.image}
          alt={image.altText || "Hero image"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600 text-sm">Loading image...</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center mb-4 sm:mb-6">
          Experience the game
        </h1>
        <div className="flex space-x-2 sm:space-x-4">
          <Button 
            onClick={() => router.push('/cricket')}
            className="bg-white text-black hover:bg-gray-200 text-xs sm:text-sm md:text-base px-6 sm:px-4 py-1 sm:py-2 font-semibold"
          >
            Cricket
          </Button>
          <Button 
            onClick={() => router.push('/football')}
            className="bg-white text-black hover:bg-gray-200 text-xs sm:text-sm md:text-base px-6 sm:px-4 py-1 sm:py-2 font-semibold"
          >
            Football
          </Button>
        </div>
      </div>
    </div>
  )
}