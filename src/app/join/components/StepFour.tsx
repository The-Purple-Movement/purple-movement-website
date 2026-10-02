'use client'

import { FaWhatsapp } from "react-icons/fa6"
import Link from "next/link"
import { MdHome } from "react-icons/md"

interface StepFourProps {
  userName?: string
  isAnonymous?: boolean
}

export default function StepFour({ userName = "Friend", isAnonymous = false }: StepFourProps) {
  const handleWhatsAppJoin = () => {
    window.open('https://chat.whatsapp.com/JfnuaMproG51BoNJZ21LNB', '_blank')
  }

  // If user chose to stay anonymous, show simplified message
  if (isAnonymous) {
    return (
      <div className="w-full px-4 sm:px-6">
        <div className="max-w-xl mx-auto flex justify-center">
          <div className="w-full bg-slate-900/90 border border-purple-500/30 rounded-2xl flex flex-col items-center justify-center p-8 sm:p-12 gap-6 text-center shadow-xl">
            <h1 className="text-white text-3xl sm:text-4xl font-bold font-poppins">Thank You!</h1>
            <p className="text-zinc-300 text-base sm:text-lg font-normal font-poppins">We&apos;ve received your submission.</p>
            
            {/* Go Home Button */}
            <Link 
              href="/" 
              className="mt-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-xl inline-flex justify-center items-center gap-2 text-white text-base font-semibold font-poppins uppercase tracking-wider transition-all duration-300 shadow-lg shadow-purple-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>Go Home</span>
              <MdHome className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl backdrop-blur-sm">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-poppins text-white">
            Thank you, <span className="text-purple-400">{userName}</span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg font-poppins text-zinc-300 max-w-xl mx-auto leading-relaxed">
            We&apos;ve received your response and are thrilled to welcome you to the community.
          </p>

          <p className="text-white text-base sm:text-lg font-semibold font-poppins pt-2">
            Join our WhatsApp community for upcoming announcements and conversations:
          </p>

          {/* WhatsApp Button */}
          <div className="w-full flex justify-center pt-2">
            <button
              onClick={handleWhatsAppJoin}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-base font-bold font-poppins rounded-xl flex items-center justify-center gap-2.5 transition-all duration-300 shadow-lg shadow-emerald-600/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>Join WhatsApp Group</span>
              <FaWhatsapp className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="pt-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm font-poppins transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-400 rounded px-2 py-1"
            >
              <MdHome className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}