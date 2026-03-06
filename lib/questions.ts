export interface Question {
  id: string
  text: string
  category: string
  emoji: string
  options?: string[]
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

// Viral-style questions designed to get engagement
export const questions: Question[] = [
  {
    id: "1",
    text: "Would you give up social media for a year for $50,000?",
    category: "MONEY",
    emoji: "💰",
    options: ["YES IMMEDIATELY", "NO WAY"]
  },
  {
    id: "2", 
    text: "Your ex texts 'I miss you' at 2am. What do you do?",
    category: "RELATIONSHIPS",
    emoji: "💔",
    options: ["IGNORE", "RESPOND", "SCREENSHOT & POST"]
  },
  {
    id: "3",
    text: "You find out your best friend talks bad about you. Confront or cut off?",
    category: "DRAMA",
    emoji: "🔥",
    options: ["CONFRONT THEM", "CUT THEM OFF SILENTLY"]
  },
  {
    id: "4",
    text: "Would you date someone who makes less money than you?",
    category: "DATING",
    emoji: "💕",
    options: ["YES OBVIOUSLY", "DEPENDS", "NO"]
  },
  {
    id: "5",
    text: "Your partner's celebrity crush slides in their DMs. How do you react?",
    category: "JEALOUSY",
    emoji: "😤",
    options: ["TRUST THEM", "CHECK THEIR PHONE", "DUMP THEM"]
  },
  {
    id: "6",
    text: "You accidentally send a screenshot TO the person you were talking about. What now?",
    category: "NIGHTMARE",
    emoji: "💀",
    options: ["DOUBLE DOWN", "APOLOGIZE", "FAKE DEATH"]
  },
  {
    id: "7",
    text: "Would you rather know when you die or how you die?",
    category: "DEEP",
    emoji: "🤔",
    options: ["WHEN", "HOW", "NEITHER"]
  },
  {
    id: "8",
    text: "Your friend's new partner gives you bad vibes. Do you say something?",
    category: "FRIENDSHIP",
    emoji: "👀",
    options: ["TELL THEM", "STAY QUIET", "DROP HINTS"]
  },
  {
    id: "9",
    text: "Someone spoils the movie/show you've been waiting to watch. Violence?",
    category: "RAGE",
    emoji: "😡",
    options: ["VIOLENCE", "BLOCK THEM", "CRY"]
  },
  {
    id: "10",
    text: "You catch your parent on a dating app. What do you do?",
    category: "AWKWARD",
    emoji: "😬",
    options: ["CONFRONT", "PRETEND YOU DIDN'T SEE", "MAKE A PROFILE TOO"]
  },
  {
    id: "11",
    text: "Your crush follows you back but doesn't like any posts. What does it mean?",
    category: "DELULU",
    emoji: "🦋",
    options: ["THEY'RE SHY", "THEY'RE STALKING", "MEANS NOTHING"]
  },
  {
    id: "12",
    text: "Would you read your partner's messages if you had the chance?",
    category: "TRUST",
    emoji: "🔓",
    options: ["YES 100%", "NO THAT'S WRONG", "ALREADY DID"]
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

// Generate fake answer based on question
export function generateFakeAnswers(question: Question): FakeAnswer[] {
  const answerTemplates: Record<string, string[]> = {
    "1": [
      "bro i would do it for $500 😭",
      "no bc how would i stalk my ex???",
      "my screen time says no 💀",
      "easiest money ever tbh",
      "i literally need tiktok to survive"
    ],
    "2": [
      "respond with 'new phone who dis'",
      "screenshot it for the groupchat FIRST",
      "depends which ex we're talking about 👀",
      "left on read is the only answer",
      "block immediately no hesitation"
    ],
    "3": [
      "confronting them is so brave idk if i have it in me",
      "silent treatment hits different",
      "exposing them on my story tbh",
      "depends on what they said 😭",
      "cutting off gives them no closure and thats what they deserve"
    ],
    "4": [
      "love doesnt pay rent bestie",
      "if hes fine idgaf about his bank account",
      "we splitting bills 50/50 anyway",
      "money comes and goes but red flags are forever",
      "controversial but no lol"
    ],
    "5": [
      "id simply become their celebrity crush",
      "checking the phone immediately lets be real",
      "trust??? in THIS economy???",
      "depends on who the celebrity is ngl",
      "id help them respond tbh we're secure like that"
    ],
    "6": [
      "happened to me and i simply moved countries",
      "gaslight them into thinking its fake",
      "own it and make it worse somehow",
      "this is my nightmare scenario",
      "changing my name as we speak"
    ],
    "7": [
      "knowing when means i can procrastinate everything until then",
      "how i die so i can avoid it duh",
      "neither bc im mentally weak",
      "when so i can max out my credit cards the day before",
      "this question ruined my day thanks"
    ],
    "8": [
      "my friends choices are my choices too apparently",
      "id drop so many hints they'd figure it out",
      "staying quiet bc nobody listens anyway",
      "tell them once and then never again",
      "let them learn the hard way"
    ],
    "9": [
      "violence is never the answer but sometimes it is",
      "blocking them for life no questions",
      "spoilers should be a criminal offense",
      "id simply never recover",
      "this happened with endgame and im still mad"
    ],
    "10": [
      "matching with them accidentally is the real fear",
      "id simply look away and never speak of it",
      "supporting their journey or whatever",
      "making them a better profile obviously",
      "this happened and therapy was needed"
    ],
    "11": [
      "ITS A SIGN THEYRE OBSESSED",
      "they're intimidated by your presence",
      "it means literally nothing im sorry",
      "delulu is truly the solulu",
      "they forgot to like thats all"
    ],
    "12": [
      "if you trust them why would you need to",
      "anyone who says no is lying",
      "already have and found nothing dw",
      "trust but verify thats my motto",
      "no bc what if i find something"
    ]
  }

  const answers = answerTemplates[question.id] || [
    "this is so real",
    "crying at this question",
    "why would you ask this",
    "im screenshotting this",
    "the comments are gonna be crazy"
  ]

  return answers.map((answer, index) => ({
    id: `${question.id}-${index}`,
    username: usernames[Math.floor(Math.random() * usernames.length)],
    answer,
    likes: Math.floor(Math.random() * 50000) + 100,
    timeAgo: ["2m", "5m", "12m", "23m", "1h"][index] || "1h",
    verified: Math.random() > 0.7,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`
  }))
}

export function getRandomQuestion(): Question {
  return questions[Math.floor(Math.random() * questions.length)]
}
