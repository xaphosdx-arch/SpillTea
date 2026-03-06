"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Flame, Users } from "lucide-react"

export function Header() {
  const [liveCount, setLiveCount] = useState<number | null>(null)

  useEffect(() => {
    setLiveCount(Math.floor(Math.random() * 5000) + 10000)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Flame className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-black text-lg tracking-tight text-foreground">
            SPILL
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium">
            {liveCount !== null ? `${liveCount.toLocaleString()} live` : "-- live"}
          </span>
        </motion.div>
      </div>
    </header>
  )
}
