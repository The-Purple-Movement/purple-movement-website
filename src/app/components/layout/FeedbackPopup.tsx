'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface FeedbackPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackPopup({ isOpen, onClose }: FeedbackPopupProps) {
  const [feedback, setFeedback] = useState('')
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const reactions = [
    { id: 'very-sad', src: '/images/fbr1.webp', alt: 'Very Sad' },
    { id: 'sad', src: '/images/fbr2.webp', alt: 'Sad' },
    { id: 'neutral', src: '/images/fbr3.webp', alt: 'Neutral' },
    { id: 'happy', src: '/images/fbr4.webp', alt: 'Happy' },
    { id: 'very-happy', src: '/images/fbr5.webp', alt: 'Very Happy' }
  ]

  const handleReactionClick = (reactionId: string) => {
    setSelectedReaction(selectedReaction === reactionId ? null : reactionId)
  }

  // Prevent body scrolling and handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = 'auto'
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  const handleSubmit = async () => {
    if (!feedback.trim() && !selectedReaction) return
    
    setIsSubmitting(true)
    setStatusMessage(null)
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reaction: selectedReaction,
          feedback: feedback.trim(),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit feedback')
      }

      setStatusMessage('Thank you for your feedback!')
      setTimeout(() => {
        setFeedback('')
        setSelectedReaction(null)
        setStatusMessage(null)
        onClose()
      }, 1200)
    } catch (error) {
      console.error('Error submitting feedback:', error)
      setStatusMessage('Failed to send feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 transition-all duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-dialog-title"
    >
      <div className="w-full max-w-lg bg-pm-bg-dark border border-pm-border-hover rounded-3xl shadow-2xl p-6 sm:p-8 relative flex flex-col items-center gap-6 animate-scale-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-pm-text-muted hover:text-pm-text-primary hover:bg-pm-card rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent"
          aria-label="Close feedback modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Main heading */}
        <div className="text-center pt-2">
          <h2 id="feedback-dialog-title" className="text-pm-text-primary text-2xl sm:text-3xl font-bold font-poppins tracking-tight">
            How helpful was this?
          </h2>
          <p className="text-pm-text-muted text-sm font-poppins mt-1">
            Let us know what you think or how we can improve.
          </p>
        </div>

        {/* Reactions section */}
        <div className="flex justify-center items-center gap-3 sm:gap-5" role="group" aria-label="Reaction ratings">
          {reactions.map((reaction) => {
            const isSelected = selectedReaction === reaction.id
            return (
              <button
                key={reaction.id}
                type="button"
                onClick={() => handleReactionClick(reaction.id)}
                aria-pressed={isSelected}
                aria-label={reaction.alt}
                className={`p-2 rounded-2xl transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent ${
                  isSelected 
                    ? 'bg-pm-primary/30 border border-pm-accent scale-110 opacity-100' 
                    : 'opacity-40 hover:opacity-100 hover:bg-pm-card border border-transparent'
                }`}
              >
                <Image
                  src={reaction.src}
                  alt={reaction.alt}
                  width={44}
                  height={44}
                  className="object-contain w-9 h-9 sm:w-11 sm:h-11"
                />
              </button>
            )
          })}
        </div>

        {/* Feedback input */}
        <div className="w-full">
          <label htmlFor="feedback-text-area" className="sr-only">Your feedback</label>
          <textarea
            id="feedback-text-area"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts or suggestions..."
            className="w-full h-32 px-4 py-3 bg-pm-card text-pm-text-primary text-sm sm:text-base font-poppins resize-none rounded-xl border border-pm-card-border placeholder:text-pm-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent focus-visible:border-transparent transition-all"
          />
        </div>

        {statusMessage && (
          <p className={`text-sm font-poppins ${statusMessage.includes('Thank') ? 'text-pm-success' : 'text-pm-error'}`}>
            {statusMessage}
          </p>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={(!feedback.trim() && !selectedReaction) || isSubmitting}
          className={`w-full sm:w-auto px-10 py-3 rounded-xl font-semibold font-poppins text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pm-accent ${
            (feedback.trim() || selectedReaction) && !isSubmitting
              ? 'bg-pm-primary hover:bg-pm-primary-hover text-pm-text-primary shadow-[var(--pm-glow)] hover:shadow-[var(--pm-glow-strong)] active:scale-95'
              : 'bg-pm-card/40 text-pm-text-muted border border-pm-card-border cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-pm-text-primary/30 border-t-pm-text-primary rounded-full animate-spin" />
              <span>Submitting...</span>
            </div>
          ) : (
            'Submit Feedback'
          )}
        </button>
      </div>
    </div>
  )
}