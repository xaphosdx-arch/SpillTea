"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Header } from "@/components/header"
import { QuestionCard } from "@/components/question-card"
import { questions } from "@/lib/questions"
import { RefreshCw, Sparkles, Trophy } from "lucide-react"

interface AnsweredQuestion {
  questionId: string
  answer: "YES" | "NO"
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [completionStats, setCompletionStats] = useState<{ matchRate: number; rank: number; yesCount: number; noCount: number } | null>(null)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = useCallback((answer: string) => {
    const newAnswered = [...answeredQuestions, { 
      questionId: currentQuestion.id, 
      answer: answer as "YES" | "NO" 
    }]
    setAnsweredQuestions(newAnswered)
    
    // Immediately go to next question
    if (currentQuestionIndex >= questions.length - 1) {
      setIsComplete(true)
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }, [answeredQuestions, currentQuestion, currentQuestionIndex])

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0)
    setAnsweredQuestions([])
    setIsComplete(false)
    setCompletionStats(null)
  }, [])

  // Generate completion stats only on client when complete
  useEffect(() => {
    if (isComplete && !completionStats) {
      const yesCount = answeredQuestions.filter(a => a.answer === "YES").length
      const noCount = answeredQuestions.filter(a => a.answer === "NO").length
      setCompletionStats({
        matchRate: Math.floor(Math.random() * 40) + 60,
        rank: Math.floor(Math.random() * 1000) + 1,
        yesCount,
        noCount,
      })
    }
  }, [isComplete, completionStats, answeredQuestions])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-8 px-4">
        <AnimatePresence mode="wait">
          {/* Feed State */}
          {!isComplete && currentQuestion && (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          )}

          {/* Complete State */}
          {isComplete && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center pt-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <Trophy className="w-12 h-12 text-primary" />
              </motion.div>
              
              <h2 className="text-3xl font-black text-foreground mb-2">
                YOU SPILLED IT ALL
              </h2>
              <p className="text-muted-foreground mb-8">
                {answeredQuestions.length} questions answered
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-500">
                    {completionStats ? completionStats.yesCount : "--"}
                  </div>
                  <div className="text-sm text-muted-foreground">Yes Swipes</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-3xl font-bold text-red-500">
                    {completionStats ? completionStats.noCount : "--"}
                  </div>
                  <div className="text-sm text-muted-foreground">No Swipes</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-primary">
                    {completionStats ? `${completionStats.matchRate}%` : "--%"}
                  </div>
                  <div className="text-xs text-muted-foreground">Match Rate</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-accent">
                    {completionStats ? `#${completionStats.rank}` : "#--"}
                  </div>
                  <div className="text-xs text-muted-foreground">Your Rank</div>
                </div>
              </div>

              {/* Share prompt */}
              <div className="bg-card border border-border rounded-xl p-6 mb-6">
                <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="text-foreground font-semibold mb-2">
                  Think you&apos;re different?
                </p>
                <p className="text-muted-foreground text-sm">
                  Share to see if your friends agree with your takes
                </p>
              </div>

              {/* Restart button */}
              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 mx-auto bg-secondary text-secondary-foreground font-bold py-3 px-8 rounded-xl hover:bg-secondary/80 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                PLAY AGAIN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
