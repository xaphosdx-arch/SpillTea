"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, MessageCircle, Share2, BadgeCheck, Sparkles } from "lucide-react"
import type { FakeAnswer, Question } from "@/lib/questions"
import { generateFakeAnswers } from "@/lib/questions"

interface AnswersSectionProps {
  question: Question
  userAnswer: string
}

export function AnswersSection({ question, userAnswer }: AnswersSectionProps) {
  const [answers, setAnswers] = useState<FakeAnswer[]>([])
  const [likedAnswers, setLikedAnswers] = useState<Set<string>>(new Set())
  const [showUserAnswer, setShowUserAnswer] = useState(false)

  useEffect(() => {
    // Generate fake answers with a slight delay for effect
    const fakeAnswers = generateFakeAnswers(question)
    setAnswers(fakeAnswers)
    
    setTimeout(() => {
      setShowUserAnswer(true)
    }, 500)
  }, [question])

  const toggleLike = (answerId: string) => {
    setLikedAnswers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(answerId)) {
        newSet.delete(answerId)
      } else {
        newSet.add(answerId)
      }
      return newSet
    })
  }

  const formatLikes = (likes: number) => {
    if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`
    }
    return likes.toString()
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">Top Answers</span>
        </div>
        <span className="text-muted-foreground text-sm">
          {Math.floor(Math.random() * 100) + 50}K responses
        </span>
      </div>

      {/* User's answer highlight */}
      {showUserAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-primary/10 border-2 border-primary relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
            YOUR ANSWER
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              U
            </div>
            <div>
              <p className="font-semibold text-foreground">You said:</p>
              <p className="text-primary font-bold text-lg">{userAnswer}</p>
            </div>
          </div>
          
          {/* Fake engagement on user answer */}
          <div className="flex items-center gap-4 mt-4 text-muted-foreground text-sm">
            <span className="text-primary">
              ❤️ {Math.floor(Math.random() * 500) + 50} people agree
            </span>
          </div>
        </motion.div>
      )}

      {/* Fake answers */}
      <div className="space-y-4">
        {answers.map((answer, index) => (
          <motion.div
            key={answer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            {/* User info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={answer.avatar}
                alt=""
                className="w-10 h-10 rounded-full bg-secondary"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground text-sm">
                    @{answer.username}
                  </span>
                  {answer.verified && (
                    <BadgeCheck className="w-4 h-4 text-primary" />
                  )}
                </div>
                <span className="text-muted-foreground text-xs">{answer.timeAgo} ago</span>
              </div>
            </div>

            {/* Answer text */}
            <p className="text-foreground mb-4">{answer.answer}</p>

            {/* Engagement */}
            <div className="flex items-center gap-6 text-muted-foreground">
              <button
                onClick={() => toggleLike(answer.id)}
                className="flex items-center gap-1 hover:text-accent transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    likedAnswers.has(answer.id) ? "fill-accent text-accent" : ""
                  }`}
                />
                <span className="text-sm">
                  {formatLikes(likedAnswers.has(answer.id) ? answer.likes + 1 : answer.likes)}
                </span>
              </button>
              
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{Math.floor(Math.random() * 200) + 10}</span>
              </button>
              
              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load more fake prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-center"
      >
        <button className="text-primary font-semibold text-sm hover:underline">
          View {Math.floor(Math.random() * 500) + 100} more answers →
        </button>
      </motion.div>
    </div>
  )
}
