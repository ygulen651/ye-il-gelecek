'use client'

import { useEffect } from 'react'
import Image from 'next/image'

interface NGO {
  id: number
  name: string
  logoUrl: string
}

interface LogoSliderProps {
  ngos: NGO[]
}

export default function LogoSlider({ ngos }: LogoSliderProps) {
  useEffect(() => {
    // Auto-scroll animation is handled by CSS
  }, [ngos.length])

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          İş Ortaklarımız
        </h2>
        
        <div className="relative overflow-hidden">
          <div className="flex space-x-12 animate-scroll">
            {ngos.map((ngo) => (
              <div
                key={ngo.id}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center border border-gray-100"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={ngo.logoUrl}
                    alt={ngo.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {ngos.map((ngo) => (
              <div
                key={`duplicate-${ngo.id}`}
                className="flex-shrink-0 w-40 h-24 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center border border-gray-100"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={ngo.logoUrl}
                    alt={ngo.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  )
} 