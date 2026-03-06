"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Share2, MessageCircle, ChevronRight } from "lucide-react"
import type { Question } from "@/lib/questions"

interface QuestionCardProps {
  question: Question
  onAnswer: (option: string) => void
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showPercentages, setShowPercentages] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [fakeStats, setFakeStats] = useState({ comments: 0, shares: 0, answering: 0 })

  // Generate stable fake percentages based on question id (deterministic)
  const normalizedPercentages = useMemo(() => {
    const seed = question.id.charCodeAt(0) + question.id.length
    const fakePercentages = question.options?.map((_, i) => 
      ((seed * (i + 1) * 7) % 40) + 20
    ) || []
    const total = fakePercentages.reduce((a, b) => a + b, 0)
    return fakePercentages.map(p => Math.round((p / total) * 100))
  }, [question.id, question.options])

  // Generate random stats only on client
  useEffect(() => {
    setMounted(true)
    setFakeStats({
      comments: Math.floor(Math.random() * 50) + 10,
      shares: Math.floor(Math.random() * 20) + 5,
      answering: Math.floor(Math.random() * 5000) + 1000,
    })
  }, [question.id])

  const handleOptionClick = (option: string) => {
    if (selectedOption) return
    setSelectedOption(option)
    setShowPercentages(true)
    
    setTimeout(() => {
      onAnswer(option)
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide">
            {question.category}
          </span>
          <Flame className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <span className="text-muted-foreground text-sm">
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 mb-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <span className="text-4xl mb-4 block">{question.emoji}</span>
        
        <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight text-balance">
          {question.text}
        </h2>

        <div className="flex items-center gap-4 mt-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{mounted ? `${fakeStats.comments}K` : "--K"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4" />
            <span>{mounted ? `${fakeStats.shares}K` : "--K"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {question.options?.map((option, index) => (
          <motion.button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            whileTap={{ scale: selectedOption ? 1 : 0.98 }}
            className={`
              relative w-full text-left p-4 rounded-xl border-2 transition-all duration-300 overflow-hidden
              ${selectedOption === option 
                ? "border-primary bg-primary/10" 
                : selectedOption 
                  ? "border-border bg-secondary/50" 
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
              }
            `}
          >
            <AnimatePresence>
              {showPercentages && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${normalizedPercentages[index]}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`absolute left-0 top-0 h-full ${
                    selectedOption === option ? "bg-primary/30" : "bg-secondary"
                  }`}
                />
              )}
            </AnimatePresence>

            <div className="relative z-10 flex items-center justify-between">
              <span className={`font-semibold text-lg ${
                selectedOption === option ? "text-primary" : "text-foreground"
              }`}>
                {option}
              </span>
              
              {showPercentages ? (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-bold text-xl"
                >
                  {normalizedPercentages[index]}%
                </motion.span>
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <span className="text-muted-foreground text-sm">
          <span className="text-primary font-semibold">{mounted ? fakeStats.answering.toLocaleString() : "---"}</span> people answering right now
        </span>
      </motion.div>
    </motion.div>
  )
}
