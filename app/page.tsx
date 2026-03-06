"use client"

import { useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Header } from "@/components/header"
import { QuestionCard } from "@/components/question-card"
import { AnswersSection } from "@/components/answers-section"
import { questions } from "@/lib/questions"
import { RefreshCw, Sparkles, Trophy, Zap } from "lucide-react"

type GameState = "playing" | "viewing-answers" | "complete"

interface AnsweredQuestion {
  question: (typeof questions)[0]
  answer: string
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("playing")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([])
  const [viewingAnswerIndex, setViewingAnswerIndex] = useState(0)
  const [completionStats, setCompletionStats] = useState<{ matchRate: number; rank: number } | null>(null)

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = useCallback((answer: string) => {
    const newAnswered = [...answeredQuestions, { question: currentQuestion, answer }]
    setAnsweredQuestions(newAnswered)
    
    // Show answers view
    setViewingAnswerIndex(newAnswered.length - 1)
    setGameState("viewing-answers")
  }, [answeredQuestions, currentQuestion])

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex >= questions.length - 1) {
      setGameState("complete")
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
      setGameState("playing")
    }
  }, [currentQuestionIndex])

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0)
    setAnsweredQuestions([])
    setViewingAnswerIndex(0)
    setGameState("playing")
    setCompletionStats(null)
  }, [])

  // Generate completion stats only on client when game completes
  const generateCompletionStats = useCallback(() => {
    if (gameState === "complete" && !completionStats) {
      setCompletionStats({
        matchRate: Math.floor(Math.random() * 80) + 20,
        rank: Math.floor(Math.random() * 1000) + 1,
      })
    }
  }, [gameState, completionStats])

  // Trigger stats generation when complete
  if (gameState === "complete" && !completionStats) {
    generateCompletionStats()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-24 px-4">
        <AnimatePresence mode="wait">
          {/* Playing State */}
          {gameState === "playing" && currentQuestion && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            </motion.div>
          )}

          {/* Viewing Answers State */}
          {gameState === "viewing-answers" && answeredQuestions[viewingAnswerIndex] && (
            <motion.div
              key="viewing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <AnswersSection
                question={answeredQuestions[viewingAnswerIndex].question}
                userAnswer={answeredQuestions[viewingAnswerIndex].answer}
              />
              
              {/* Continue button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent"
              >
                <button
                  onClick={handleNextQuestion}
                  className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Zap className="w-5 h-5" />
                  NEXT QUESTION
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Complete State */}
          {gameState === "complete" && (
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
              <div className="grid grid-cols-3 gap-4 mb-8">
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
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="text-2xl font-bold text-foreground">
                    {answeredQuestions.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Streak</div>
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
