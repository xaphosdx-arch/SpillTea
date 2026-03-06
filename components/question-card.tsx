"use client"

import { useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion"
import { Flame, ThumbsUp, ThumbsDown } from "lucide-react"
import type { Question } from "@/lib/questions"

interface QuestionCardProps {
  question: Question
  onAnswer: (option: string) => void
  questionNumber: number
  totalQuestions: number
}

export function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }: QuestionCardProps) {
  const [exitX, setExitX] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [answeringCount, setAnsweringCount] = useState(0)

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  
  // Yes indicator opacity (swipe left)
  const yesOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0])
  // No indicator opacity (swipe right)
  const noOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1])

  useEffect(() => {
    setMounted(true)
    setAnsweringCount(Math.floor(Math.random() * 5000) + 1000)
  }, [question.id])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100
    
    if (info.offset.x < -threshold) {
      // Swiped left = YES
      setExitX(-300)
      setTimeout(() => onAnswer("YES"), 200)
    } else if (info.offset.x > threshold) {
      // Swiped right = NO
      setExitX(300)
      setTimeout(() => onAnswer("NO"), 200)
    }
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide">
            {question.category}
          </span>
          <Flame className="w-5 h-5 text-primary animate-pulse" />
        </div>
        <span className="text-muted-foreground text-sm font-medium">
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      {/* Swipe indicators */}
      <div className="absolute top-1/2 -left-16 z-10 pointer-events-none">
        <motion.div 
          style={{ opacity: yesOpacity }}
          className="flex items-center gap-2 text-green-500 font-bold text-xl"
        >
          <ThumbsUp className="w-8 h-8" />
          <span>YES</span>
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 -right-16 z-10 pointer-events-none">
        <motion.div 
          style={{ opacity: noOpacity }}
          className="flex items-center gap-2 text-red-500 font-bold text-xl"
        >
          <span>NO</span>
          <ThumbsDown className="w-8 h-8" />
        </motion.div>
      </div>

      {/* Main card */}
      <motion.div
        style={{ x, rotate, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ x: exitX, opacity: 0, transition: { duration: 0.2 } }}
        className="cursor-grab active:cursor-grabbing"
      >
        <div className="bg-card border-2 border-border rounded-3xl p-8 relative overflow-hidden select-none">
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
          
          {/* Emoji */}
          <span className="text-6xl mb-6 block text-center">{question.emoji}</span>
          
          {/* Question text */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight text-center text-balance mb-8">
            {question.text}
          </h2>

          {/* Swipe instruction */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-green-500" />
              <span>Swipe left</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Swipe right</span>
              <ThumbsDown className="w-5 h-5 text-red-500" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* People answering indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <span className="text-muted-foreground text-sm">
          <span className="text-primary font-semibold">
            {mounted ? answeringCount.toLocaleString() : "---"}
          </span> people answering right now
        </span>
      </motion.div>
    </div>
  )
}
