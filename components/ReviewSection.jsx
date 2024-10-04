'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ReviewSection() {
  const reviews = [
    { id: 1, text: "Great Predictions!", author: "Sanoar Hossain" },
    { id: 2, text: "Loved the Insights", author: "King Rafi" },
    { id: 3, text: "I keep coming back to this", author: "Kazi Afsar" },
  ]

  const [currentReview, setCurrentReview] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prevReview) => (prevReview + 1) % reviews.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const nextReview = () => {
    setCurrentReview((prevReview) => (prevReview + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentReview((prevReview) => (prevReview - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">What Our Users Say</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0">
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow mx-2 flex flex-col items-center justify-center h-full text-center">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{review.text}</p>
                    <p className="font-semibold text-gray-800 dark:text-white">- {review.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevReview}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <button
            onClick={nextReview}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-full shadow"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}