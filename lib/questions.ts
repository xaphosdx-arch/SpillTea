export interface Question {
  id: string
  text: string
  category: string
  emoji: string
}

export interface FakeAnswer {
  id: string
  username: string
  answer: string
  likes: number
  timeAgo: string
  verified: boolean
  avatar: string
}

// Viral yes/no questions designed for swipe engagement
export const questions: Question[] = [
  {
    id: "1",
    text: "Would you give up social media for a year for $50,000?",
    category: "MONEY",
    emoji: "💰"
  },
  {
    id: "2", 
    text: "Would you respond if your ex texted 'I miss you' at 2am?",
    category: "RELATIONSHIPS",
    emoji: "💔"
  },
  {
    id: "3",
    text: "Would you confront your best friend if you found out they talked bad about you?",
    category: "DRAMA",
    emoji: "🔥"
  },
  {
    id: "4",
    text: "Would you date someone who makes less money than you?",
    category: "DATING",
    emoji: "💕"
  },
  {
    id: "5",
    text: "Would you check your partner's phone if their celebrity crush slid into their DMs?",
    category: "JEALOUSY",
    emoji: "😤"
  },
  {
    id: "6",
    text: "Would you fake your own death if you accidentally sent a screenshot TO the person?",
    category: "NIGHTMARE",
    emoji: "💀"
  },
  {
    id: "7",
    text: "Would you want to know the exact date you're going to die?",
    category: "DEEP",
    emoji: "🤔"
  },
  {
    id: "8",
    text: "Would you tell your friend if their new partner gave you bad vibes?",
    category: "FRIENDSHIP",
    emoji: "👀"
  },
  {
    id: "9",
    text: "Is violence an acceptable response to someone spoiling a show you've been waiting to watch?",
    category: "RAGE",
    emoji: "😡"
  },
  {
    id: "10",
    text: "Would you confront your parent if you caught them on a dating app?",
    category: "AWKWARD",
    emoji: "😬"
  },
  {
    id: "11",
    text: "Does it mean something when your crush follows you back but doesn't like any posts?",
    category: "DELULU",
    emoji: "🦋"
  },
  {
    id: "12",
    text: "Would you read your partner's messages if you had the chance and knew you wouldn't get caught?",
    category: "TRUST",
    emoji: "🔓"
  }
]

// Fake viral usernames
const usernames = [
  "chaotic_queen_", "no_thoughts_", "main_character", "delulu_is_the_solulu",
  "unbothered_king", "gaslight_gatekeep", "chronically_online", "touch_grass_",
  "its_giving_", "slay_all_day", "villain_era", "not_a_pick_me",
  "red_flag_collector", "green_flag_only", "therapy_needed", "emotionally_damaged",
  "hot_take_haver", "controversy_queen", "drama_llama", "tea_spiller_"
]

// Generate fake answers based on question and the user's choice
export function generateFakeAnswers(question: Question, userChoice: string): FakeAnswer[] {
  const yesAnswers: Record<string, string[]> = {
    "1": ["bro i would do it for $500", "easiest money ever", "my mental health would improve honestly"],
    "2": ["curiosity always wins", "depends on the ex tho", "sometimes you gotta know whats up"],
    "3": ["confrontation is healthy actually", "id need answers fr", "cant let that slide"],
    "4": ["love over money always", "we building together", "money comes and goes"],
    "5": ["trust but verify", "id just take a peek", "need to protect my peace"],
    "6": ["only logical option tbh", "witness protection program activated", "new identity who dis"],
    "7": ["id plan my life perfectly", "max out credit cards the day before", "knowledge is power"],
    "8": ["real friends tell the truth", "id want them to tell me", "protecting my bestie"],
    "9": ["some things are unforgivable", "endgame spoilers still hurt", "justice must be served"],
    "10": ["communication is key", "id help them make a better profile", "we having this convo"],
    "11": ["THEYRE OBSESSED", "its a sign fr", "manifesting is working"],
    "12": ["everyone would lets be real", "if you trust why not", "just a quick peek"]
  }

  const noAnswers: Record<string, string[]> = {
    "1": ["how would i stalk my ex", "tiktok is my therapy", "i literally need this to survive"],
    "2": ["left on read is the only answer", "block immediately", "not falling for that again"],
    "3": ["cutting off silently hits different", "they dont deserve my energy", "silence is louder"],
    "4": ["controversial but no", "love dont pay bills", "need financial security"],
    "5": ["trust is everything", "secure relationships dont need that", "id be so calm about it"],
    "6": ["own it and double down", "gaslight them into thinking its fake", "confidence is key"],
    "7": ["ignorance is bliss", "id be too anxious", "some things better not to know"],
    "8": ["not my business", "they wont listen anyway", "let them learn"],
    "9": ["violence is never the answer", "just block them forever", "id simply cry instead"],
    "10": ["pretend i didnt see it", "their life their choice", "some things cant be unseen"],
    "11": ["means literally nothing", "delulu is not the solulu here", "touch grass bestie"],
    "12": ["thats a violation", "if you trust why would you need to", "respecting boundaries"]
  }

  const answers = userChoice === "YES" ? yesAnswers[question.id] : noAnswers[question.id]
  const fallbackAnswers = userChoice === "YES" 
    ? ["same honestly", "this is so real", "exactly what i was thinking"]
    : ["hard disagree but ok", "interesting take", "couldnt be me"]

  const selectedAnswers = answers || fallbackAnswers

  return selectedAnswers.map((answer, index) => ({
    id: `${question.id}-${index}`,
    username: usernames[Math.floor(Math.random() * usernames.length)],
    answer,
    likes: Math.floor(Math.random() * 50000) + 100,
    timeAgo: ["2m", "5m", "12m"][index] || "1h",
    verified: Math.random() > 0.7,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
  }))
}

export function getRandomQuestion(): Question {
  return questions[Math.floor(Math.random() * questions.length)]
}
