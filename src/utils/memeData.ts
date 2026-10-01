export interface MemeTemplate {
  id: string;
  name: string;
  type: 'image' | 'gif';
  isPremium: boolean;
  category: 'Classic' | 'Trending' | 'GIFs' | 'Reaction' | 'Gaming' | 'Tech';
  url: string;
  topDefault: string;
  bottomDefault: string;
}

export const MEME_TEMPLATES: MemeTemplate[] = [
  // ---- Animated GIF Templates ----
  {
    id: 'goku-angry',
    name: 'Goku Going Super Saiyan',
    type: 'gif',
    isPremium: true,
    category: 'GIFs',
    url: '/assets/gifs/goku-goku-angry.gif',
    topDefault: 'WHEN THE BUG PASSES CODE REVIEW',
    bottomDefault: 'AND BLOWS UP PROD'
  },
  {
    id: 'im-in-slide',
    name: 'Hacker Slide In: I\'m In',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: "/assets/gifs/i'm-in-13-seconds-slide-in gif.gif",
    topDefault: 'SENIOR DEV WALKING INTO MY PULL REQUEST',
    bottomDefault: 'IT\'S SAFE TO MERGE'
  },
  {
    id: 'son-modi-gif',
    name: 'Son Modi Reaction',
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/son-modi.gif',
    topDefault: 'WHEN THE CLIENT ASKS FOR A QUICK FEATURE',
    bottomDefault: 'THAT REQUIRES REWRITING THE BACKEND'
  },

  // ---- Still Image Meme Templates ----
  {
    id: 'dagestan-calling',
    name: '2-3 Years Dagestan Is Calling',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/2-3 years dagestan is calling meme.jpeg',
    topDefault: 'WHEN YOU LOCK IN FOR 3 MONTHS',
    bottomDefault: 'AND EMERGE AS A FULL STACK WIZARD'
  },
  {
    id: 'absolute-cinema',
    name: 'Absolute Cinema',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/absolute cinema.jpg',
    topDefault: 'WHEN THE CODE WORKS ON FIRST TRY',
    bottomDefault: 'ABSOLUTE CINEMA'
  },
  {
    id: 'actually-genius',
    name: 'Actually Genius',
    type: 'image',
    isPremium: true,
    category: 'Tech',
    url: '/assets/memes/actually genius meme.jpg',
    topDefault: 'INSTEAD OF FIXING THE BUG',
    bottomDefault: 'I DELETED THE TEST THAT FAILED'
  },
  {
    id: 'airball-meme',
    name: 'Airball',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/airball meme.jpg',
    topDefault: 'ME TRYING TO ESTIMATE TASK DURATION',
    bottomDefault: 'COMPLETE AIRBALL'
  },
  {
    id: 'an-iq-meme',
    name: 'High IQ vs Low IQ Spectrum',
    type: 'image',
    isPremium: false,
    category: 'Tech',
    url: '/assets/memes/an iq meme.jpg',
    topDefault: 'LOW IQ: COPY FROM A FORUM',
    bottomDefault: 'HIGH IQ: READ THE ACTUAL DOCS'
  },
  {
    id: 'ayanokoji-blank',
    name: 'Ayanokoji Blank Thought',
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/ayanokoji meme template blank.jpeg',
    topDefault: '',
    bottomDefault: ''
  },
  {
    id: 'backrooms-question',
    name: 'Backrooms Question Mark',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/backrooms question mark meme.jpg',
    topDefault: 'WHY IS THE MONDAY STANDUP',
    bottomDefault: 'ALREADY ON THE CALENDAR'
  },
  {
    id: 'ball-knower',
    name: 'Ball Knower',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/ball knower meme.jpg',
    topDefault: 'SAID HE\'LL "JUST TAKE A LOOK"',
    bottomDefault: 'BALL KNOWER'
  },
  {
    id: 'basketball-knows',
    name: 'Basketball Knows This Guy',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/basketball knows this guy meme.jpg',
    topDefault: 'JAVASCRIPT TYPING KNOWS THIS GUY',
    bottomDefault: 'FROM TRAINING CAMP'
  },
  {
    id: 'big-leagues-calling',
    name: 'Big Leagues Are Calling',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/big leagues calling meme.jpg',
    topDefault: 'FINISHED MY SIDE PROJECT',
    bottomDefault: 'BIG LEAGUES ARE CALLING'
  },
  {
    id: 'chess-smoke',
    name: 'Chess Smoke',
    type: 'image',
    isPremium: true,
    category: 'Classic',
    url: '/assets/memes/black guy chess smoke meme.jpg',
    topDefault: 'PLANNING THE MIGRATION',
    bottomDefault: 'MOVE BY MOVE'
  },
  {
    id: 'black-sheep',
    name: 'Black Sheep in the Herd',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/black sheep with white sheep herd.jpeg',
    topDefault: 'ME ON VACATION',
    bottomDefault: 'EVERYONE ELSE GRINDING OVERTIME'
  },
  {
    id: 'blackbeard-writing',
    name: 'Blackbeard Writing',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/blackbeard writing meme.png',
    topDefault: 'ME WRITING THE DOCUMENTATION',
    bottomDefault: 'FOR CODE I DON\'T UNDERSTAND'
  },
  {
    id: 'bro-not-on-team',
    name: 'Bro Thinks He\'s Not on the Team',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/bro thinks hes not on the team meme.jpg',
    topDefault: 'THE STAGING ENVIRONMENT',
    bottomDefault: 'BRO THINKS HE\'S NOT ON THE TEAM'
  },
  {
    id: 'cornball-detected',
    name: 'Cornball Detected',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/cornball detected meme.jpg',
    topDefault: 'GOT 5 NEW JOKES AFTER',
    bottomDefault: 'THE CODEBASE WENT CORKY: CORNBALL DETECTED'
  },
  {
    id: 'croco-dunk',
    name: 'Croco Dunk',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/croco dunk meme.jpg',
    topDefault: 'SENIOR DEV REVIEWING',
    bottomDefault: 'MY FIRST OPEN SOURCE PR'
  },
  {
    id: 'crying-shutup',
    name: 'Crying, Please Shut Up',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/crying please shutup meme.jpg',
    topDefault: 'WHEN DESIGNERS REMIND ME',
    bottomDefault: 'OF THE 1PX PADDING DIFFERENCE'
  },
  {
    id: 'death-note-template',
    name: 'Death Note Plan',
    type: 'image',
    isPremium: true,
    category: 'Classic',
    url: '/assets/memes/death note meme template.jpg',
    topDefault: 'WRITING DOWN ALL THE BUGS',
    bottomDefault: 'THAT I AM GOING TO "FIX LATER"'
  },
  {
    id: 'dino-toilet-volcano',
    name: 'Dino Toilet Volcano',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/dinosaur toilet volcano meme.jpg',
    topDefault: 'WHEN THE KIDDIE POOL OVERFLOWS',
    bottomDefault: 'IT\'S LIKE A LITTLE DINO VOLCANO'
  },
  {
    id: 'does-he-know',
    name: 'Does He Know?',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/does he know meme.jpeg',
    topDefault: 'DOES THE INTERN',
    bottomDefault: 'KNOW THE SERVER IS ALSO A TOASTER'
  },
  {
    id: 'ear-blocked',
    name: 'Ear Blocked by a Wall',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/ear blocked by a wall meme.jpg',
    topDefault: 'MY EARS DURING THE',
    bottomDefault: 'LOUD BUILD NOISE WALL'
  },
  {
    id: 'ear-large',
    name: 'Ear Large',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/ear large meme.jpg',
    topDefault: 'EAR SHAPED LIKE A DOOR',
    bottomDefault: 'SLIDE RIGHT IN'
  },
  {
    id: 'einstein-tesla',
    name: 'Einstein & Tesla',
    type: 'image',
    isPremium: true,
    category: 'Classic',
    url: '/assets/memes/einstien and tesla meme.jpg',
    topDefault: 'DEBATING PHOTON THEORY',
    bottomDefault: 'VS DEBATING TAB VS SPACES'
  },
  {
    id: 'einstein-reacts',
    name: 'Einstein Reacts',
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/einstien meme.jpg',
    topDefault: 'WHEN SOMEONE SAYS',
    bottomDefault: 'E = MC SQUARED... SQUARED'
  },
  {
    id: 'evil-throne-kitten',
    name: 'Evil Kitten on Throne',
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/evil throne kitten meme.png',
    topDefault: 'ME PLOTTING TO MERGE TO MAIN',
    bottomDefault: 'ON A FRIDAY AFTERNOON'
  },
  {
    id: 'feels-the-aura',
    name: 'Feels the Aura',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/feels the aura meme.png',
    topDefault: 'HEARD THE DING DING DING',
    bottomDefault: 'FEELS THE AURA OF A MERGED PR'
  },
  {
    id: 'gem-alert',
    name: 'Gem Alert',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/gem alert original.png',
    topDefault: 'FOUND A ONE-LINE FIX',
    bottomDefault: 'IN A 40,000-LINE CODEBASE: GEM ALERT'
  },
  {
    id: 'goodbye-university',
    name: 'Goodbye University',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/goodbye university hello drugdealing meme.jpg',
    topDefault: 'GOODBYE UNIVERSITY',
    bottomDefault: 'HELLO 9-5 WITH 400 MAMES PER DAY'
  },
  {
    id: 'half-wolf',
    name: 'Half Wolf, Half Human',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/half wolf half human meme.jpg',
    topDefault: 'LEFT BRAIN: BUILD THE FEATURE',
    bottomDefault: 'RIGHT BRAIN: REFACTOR THE WHOLE REPO'
  },
  {
    id: 'hank-schrader',
    name: 'Hank Schrader Before & After',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/hank schrader before and after meme.png',
    topDefault: 'BEFORE VS AFTER READING',
    bottomDefault: 'THE PROD ERROR LOGS'
  },
  {
    id: 'he-made-a-statement',
    name: 'He Made a Statement',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/he made a statement meme.jpeg',
    topDefault: 'THIS BRO SUBMITTED A PR',
    bottomDefault: 'TO A REPO HE HAS NEVER FORKED'
  },
  {
    id: 'dino-felt-like',
    name: 'How Bro Felt (Dino)',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/how bro felt after saying that dino meme.png',
    topDefault: 'HOW BRO FELT AFTER SAYING',
    bottomDefault: 'C++ IS FASTER THAN PYTHON'
  },
  {
    id: 'lion-felt-like',
    name: 'How Bro Felt (Lion)',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/how bro felt after saying that lion meme.png',
    topDefault: 'HOW BRO FELT AFTER FIXING',
    bottomDefault: 'A CSS MARGIN BUG'
  },
  {
    id: 'minion-felt-like',
    name: 'How Bro Felt (Minion)',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/how bro felt after saying that minion meme.png',
    topDefault: 'HOW BRO FELT AFTER SAYING',
    bottomDefault: '"IT WORKS ON MY MACHINE"'
  },
  {
    id: 'in-chat-in-vc',
    name: 'In Chat vs In VC',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/in chat in vc meme.png',
    topDefault: 'IN SLACK CHAT: PROMPT & POLITE',
    bottomDefault: 'IN ZOOM VC: MUTED & CONFUSED'
  },
  {
    id: 'kitten-thinks-lion',
    name: 'Kitten Thinks Lion',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/kitten thinks lion meme.jpg',
    topDefault: 'ME IN A SENIOR DEV CALL',
    bottomDefault: 'THINKING I KNOW WHAT I\'M DOING'
  },
  {
    id: 'larp-meter',
    name: 'LarpMeter: Larp God',
    type: 'image',
    isPremium: true,
    category: 'Trending',
    url: '/assets/memes/larpmeter larpgod meme.jpg',
    topDefault: 'LARP METER FOR THIS STANDUP',
    bottomDefault: 'MAXIMUM LARP GOD ENERGY'
  },
  {
    id: 'laughing-truck',
    name: 'Laughing Emoji Truck',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/laughing emoji truck meme.jpg',
    topDefault: 'SAID THEY WOULD "JUST QUICKLY"',
    bottomDefault: 'CHECK THE ISSUES: HAHAAHAHA TRUCK'
  },
  {
    id: 'lion-lightbulb',
    name: 'Lion Lightbulb Moment',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/lion lightbulb meme.jpg',
    topDefault: 'WHEN THE LION REALIZES',
    bottomDefault: 'THE GREP PATTERN MATCHED ITSELF'
  },
  {
    id: 'lvg-all-white',
    name: 'LVG All White',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/LTG all white meme.jpg',
    topDefault: 'WHEN THE WHOLE TEAM',
    bottomDefault: 'WEAR THE SAME ALL-WHITE OUTFIT'
  },
  {
    id: 'mike-two-ears',
    name: 'Mike Two Large Ears',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/mike two large ears meme.jpg',
    topDefault: 'HANGING OFF MICHAEL',
    bottomDefault: 'WITH THE COFFEE MACHINE STILL RUNNING'
  },
  {
    id: 'monkey-glasses-reading',
    name: 'Monkey with Glasses Reading',
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/monkey glasses reading meme.jpg',
    topDefault: 'ME READING MY OWN CODE',
    bottomDefault: 'FROM TWO WEEKS AGO'
  },
  {
    id: 'monkey-glasses-writing',
    name: 'Monkey with Glasses Writing',
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/monkey glasses writing meme.jpg',
    topDefault: 'ME WRITING DEEP AI MEMES',
    bottomDefault: 'AT 3:00 AM'
  },
  {
    id: 'neymar-1-percent',
    name: 'Neymar 1%',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/neymar 1 percent meme.jpg',
    topDefault: 'MY BATTERY AT 1%',
    bottomDefault: 'AND THE DEPLOY STILL HUNG'
  },
  {
    id: 'no-ear',
    name: 'No Ear',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/no ear meme.jpg',
    topDefault: 'THE BUDGET FOR THIS FEATURE',
    bottomDefault: 'GOT EATEN: NO EAR'
  },
  {
    id: 'little-comedian',
    name: 'Out, Little Comedian',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/out little comedian meme.jpg',
    topDefault: 'OUT OF THE STANDUP ROOM',
    bottomDefault: 'LITTLE COMEDIAN, GO BACK TO BED'
  },
  {
    id: 'please-continue',
    name: 'Please Continue',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/please continue meme.jpg',
    topDefault: 'WHEN THE INTERVIEWER ASKS',
    bottomDefault: '"SO, TELL ME MORE ABOUT THE BUG"'
  },
  {
    id: 'please-stop',
    name: 'Please Stop',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/please stop meme.jpg',
    topDefault: 'WHEN THE "ONE MORE FEATURE"',
    bottomDefault: 'BECOMES TWELVE MORE FEATURES: PLEASE STOP'
  },
  {
    id: 'ryan-gosling-out',
    name: 'Ryan Gosling Is Out',
    type: 'image',
    isPremium: true,
    category: 'Trending',
    url: '/assets/memes/ryan gosling is out meme.jpg',
    topDefault: 'ME WHEN THE MEETING',
    bottomDefault: 'COULD HAVE BEEN AN EMAIL'
  },
  {
    id: 'shaq-timeout',
    name: 'Shaq Time Out',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/shaq timeout meme.jpeg',
    topDefault: 'HOLD ON BRO',
    bottomDefault: 'LET ME MAKE A MEME FIRST'
  },
  {
    id: 'socrates-shakespeare-you',
    name: 'Socrates, Shakespeare & You',
    type: 'image',
    isPremium: true,
    category: 'Classic',
    url: '/assets/memes/socrates shakespeare you.jpg',
    topDefault: 'THE GREATEST MINDS IN HISTORY',
    bottomDefault: 'AND YOU CREATING GIF MEMES'
  },
  {
    id: 'son-reaction',
    name: 'Son Reaction',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/son meme template.jpg',
    topDefault: 'WHEN DAD SAYS',
    bottomDefault: '"I\'M NOT MAD, I\'M JUST DISAPPOINTED"'
  },
  {
    id: 'spongebob-edge',
    name: 'SpongeBob & Friends on Edge',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/spongebob squidward patrick on edge meme.jpg',
    topDefault: 'WAITING FOR THE DEPLOYMENT',
    bottomDefault: 'TO GO THROUGH SUCCESSFULLY'
  },
  {
    id: 'squidward-weird',
    name: 'Squidward Weird Face',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/squidward weird meme.jpg',
    topDefault: 'WHEN SOMEONE COMPARES',
    bottomDefault: 'MY LUNCH TO THEIR LUNCH'
  },
  {
    id: 'tiger-smoking',
    name: 'Tiger Smoking',
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/tiger smoking meme.jpg',
    topDefault: 'COOL TIGER DEALING WITH',
    bottomDefault: 'A 404 ON PRODUCTION'
  },
  {
    id: 'time-to-lock-in',
    name: 'Time To Lock In',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/time to lock in meme.jpg',
    topDefault: 'DEADLINE IN 2 HOURS',
    bottomDefault: 'TIME TO LOCK IN'
  },
  {
    id: 'trash-vs-garbage',
    name: 'Trash vs Garbage',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/trash vs garbage meme.jpg',
    topDefault: 'MY CODE REVIEW COMMENTS:',
    bottomDefault: 'TRASH. GARBAGE. TRASH GARBAGE.'
  },
  {
    id: 'ts-cornball',
    name: 'TS, You Cornball',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/ts you cornball meme.jpg',
    topDefault: 'WHEN THE TYPESCRIPT',
    bottomDefault: 'COMPILER CALLS YOU A CORNBALL'
  },
  {
    id: 'useless-info',
    name: 'Useless Info',
    type: 'image',
    isPremium: false,
    category: 'Tech',
    url: '/assets/memes/useless info meme.jpg',
    topDefault: 'LEARNED THE EXACT HISTORY OF',
    bottomDefault: 'THE SEMICOLON: USELESS INFO'
  },
  {
    id: 'vegeta-reading',
    name: 'Vegeta Reading a Book',
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/vegeta reading a book meme.jpg',
    topDefault: 'VEGETA STUDYING',
    bottomDefault: 'THE TAILWIND V4 DOCS'
  },
  {
    id: 'vegeta-blackbeard',
    name: 'Vegeta & Blackbeard Study Session',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/vegeta reading a book with blackbeard writing meme.jpeg',
    topDefault: 'TWO PRIDEFUL CODES',
    bottomDefault: 'SHARING ONE CODE REVIEW'
  },
  {
    id: 'walking-larp',
    name: 'Walking Larp',
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/walking larp meme.jpg',
    topDefault: 'THE WAY THIS BRO WALKS',
    bottomDefault: 'INTO THE STANDUP: A WALKING LARP'
  },
  {
    id: 'walter-mike-smoking',
    name: 'Walter & Mike Smoking',
    type: 'image',
    isPremium: true,
    category: 'Classic',
    url: '/assets/memes/walter smoking mike meme.jpg',
    topDefault: 'WE BUILT THE BEST MEME STUDIO',
    bottomDefault: 'SAY MY NAME: GIFMEMEMAKER'
  },
  {
    id: 'why-is-he',
    name: 'Why Is He?',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/why is he meme.jpg',
    topDefault: 'WHY IS HE STILL',
    bottomDefault: 'ON THE CALL AFTER THE RETRO'
  },
  {
    id: 'worst-message-ever',
    name: 'Worst Message Ever',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/worst message ever meme.jpg',
    topDefault: 'MY FAVOURITE:',
    bottomDefault: '"GOT A MINUTE? IT\'S A QUICK QUESTION"'
  },
  {
    id: 'your-wig-sir',
    name: 'Your Wig, Sir',
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/your wig sir meme.jpg',
    topDefault: 'TAKING IT PERSONAL',
    bottomDefault: 'BECAUSE OF YOUR WIG, SIR'
  }
];

export const AI_CAPTION_PROMPTS: Record<string, { top: string; bottom: string }[]> = {
  humorous: [
    { top: 'MY CODE IS SO CLEAN', bottom: 'EVEN THE BUGS HAVE A GOOD TIME' },
    { top: "I DON'T ALWAYS TEST CODE", bottom: 'BUT WHEN I DO, I DO IT IN PRODUCTION' },
    { top: 'EXCUSE ME WHILE I PRETEND', bottom: 'I UNDERSTAND WHAT I AM DOING' },
    { top: "IT'S NOT A BUG", bottom: 'IT\'S AN UNDOCUMENTED FEATURE' },
    { top: 'GIFTS FOR THE BUGS', bottom: 'BECAUSE THEY SURVIVED CODE REVIEW' }
  ],
  relatable: [
    { top: "WHEN YOU SAY 'ONE MORE MINUTE'", bottom: 'AND 4 HOURS PASS ON MEMES' },
    { top: 'ME EXPLAINING TO MY FRIENDS', bottom: 'WHY THIS MEME IS ABSOLUTE ART' },
    { top: 'OPENING 45 BROWSER TABS', bottom: 'FOR A 2-LINE CSS FIX' },
    { top: 'GOING TO BED AT A REASONABLE HOUR', bottom: 'VS BUILDING A NEW AI MEME SITE' },
    { top: 'WHEN THE WIFI DROPS', bottom: 'AND YOUR MEME IS 99% UPLOADED' }
  ],
  tech: [
    { top: 'AI GENERATING MEMES AT 60 FPS', bottom: 'THE FUTURE IS HERE, MY FRIENDS' },
    { top: 'SENIOR DEV WATCHING JUNIOR', bottom: 'FIX IT WITH ONE LINE OF UTILITY CSS' },
    { top: 'NO BACKEND NEEDED', bottom: '100% IN-BROWSER MEME STUDIO' },
    { top: 'TAILWIND CSS V4 ENGINE', bottom: 'FASTEST MEME RENDERING IN THE WEST' },
    { top: 'git commit -m "fix"', bottom: '27 TIMES, ALL DIFFERENT FIXES' }
  ],
  sarcastic: [
    { top: 'OH YOU CREATED A MEME?', bottom: 'TELL ME MORE ABOUT YOUR ARTISTIC VISION' },
    { top: 'YES, I REALLY NEEDED ANOTHER', bottom: 'NOTIFICATION AT 3 AM' },
    { top: 'THANKS FOR THE VALUABLE ADVICE', bottom: 'I WILL IMMEDIATELY IGNORE IT' },
    { top: 'SURE, LET ME "QUICKLY" ADD', bottom: 'A WHOLE NEW GENERATOR FOR THAT' }
  ],
  genz: [
    { top: 'HOW BRO FELT AFTER CREATING THIS', bottom: 'LOWKEY UNMATCHED AURA' },
    { top: "BRO THINKS HE'S THE MAIN CHARACTER", bottom: 'AND NGL HE KINDA IS' },
    { top: 'NO CAP THIS MEME GENERATOR', bottom: 'JUST HIT DIFFERENT' },
    { top: 'IT GIVES FREE CONFIDENCE', bottom: 'IT GIVES 100% PRO ENERGY' }
  ]
};
