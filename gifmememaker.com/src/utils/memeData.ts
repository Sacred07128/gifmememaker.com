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
    id: 'blinking-guy',
    name: "Blinking White Guy",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/blinking-guy.gif',
    topDefault: "TEACHER: THE TEST IS EASY",
    bottomDefault: "THE TEST:"
  },
  {
    id: 'leo-cheers-gif',
    name: "Leonardo DiCaprio Cheers Toast",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/leo-cheers.gif',
    topDefault: "CHEERS TO THE CODE",
    bottomDefault: "THAT WORKED ON THE FIRST RUN"
  },
  {
    id: 'kermit-tea',
    name: "Kermit Sipping Tea",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/kermit-tea.gif',
    topDefault: "I WARNED YOU ABOUT THAT BUG",
    bottomDefault: "BUT THAT IS NONE OF MY BUSINESS"
  },
  {
    id: 'mind-blown',
    name: "Mind Blown Reaction",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/mind-blown.gif',
    topDefault: "WHEN YOU REALIZE",
    bottomDefault: "YOU CAN MAKE MEMES 100% IN BROWSER"
  },
  {
    id: 'rock-eyebrow',
    name: "The Rock Eyebrow Raise",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/rock-eyebrow.gif',
    topDefault: "WHEN SOMEONE PUSHES DIRECTLY TO MAIN",
    bottomDefault: "AND SAYS TRUST ME BRO"
  },
  {
    id: 'pop-cat',
    name: "Pop Cat Animated",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/pop-cat.gif',
    topDefault: "ME YAPPING WITH NO EVIDENCE",
    bottomDefault: "JUST PURE CONFIDENCE"
  },
  {
    id: 'vibing-cat',
    name: "Cat Vibing to Music",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/vibing-cat.gif',
    topDefault: "WHEN THE WEEKEND STARTS",
    bottomDefault: "AND ALL YOUR TASKS ARE DONE"
  },
  {
    id: 'homer-hedge',
    name: "Homer Simpson Backs Into Bushes",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/homer-hedge.gif',
    topDefault: "WHEN THEY ASK WHO BROKE THE BUILD",
    bottomDefault: "I WAS NEVER HERE"
  },
  {
    id: 'spiderman-dance',
    name: "Spider-Man Dancing",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/spiderman-dance.gif',
    topDefault: "WHEN YOUR MEME GETS",
    bottomDefault: "OVER 10K LIKES"
  },
  {
    id: 'obama-mic-drop',
    name: "Obama Mic Drop",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/obama-mic-drop.gif',
    topDefault: "DELIVERED ON TIME WITH ZERO BUGS",
    bottomDefault: "MIC DROP"
  },
  {
    id: 'confused-math-lady',
    name: "Confused Math Lady Calculating",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/confused-math-lady.gif',
    topDefault: "ME TRYING TO CALCULATE",
    bottomDefault: "WHERE ALL MY TIME WENT"
  },
  {
    id: 'shocked-cat',
    name: "Shocked Surprised Cat",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/shocked-cat.gif',
    topDefault: "WHEN YOU CHECK YOUR BANK ACCOUNT",
    bottomDefault: "AFTER A WEEKEND OF ONLINE SHOPPING"
  },
  {
    id: 'success-kid',
    name: "Success Kid Fist Pump",
    type: 'gif',
    isPremium: false,
    category: 'GIFs',
    url: '/assets/gifs/success-kid.gif',
    topDefault: "TRIED SOMETHING RISKY",
    bottomDefault: "WORKED BEAUTIFULLY"
  },
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
    topDefault: 'ME WRITING VIRAL MEMES',
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
  },

  // ---- Web Classic & Trending Meme Templates ----
  {
    id: 'drake-hotline-bling',
    name: "Drake Hotline Bling",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/drake-hotline-bling.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'two-buttons',
    name: "Two Buttons",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/two-buttons.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'distracted-boyfriend',
    name: "Distracted Boyfriend",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/distracted-boyfriend.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'bernie-i-am-once-again-asking-for-your-support',
    name: "Bernie I Am Once Again Asking For Your Support",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/bernie-i-am-once-again-asking-for-your-support.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'uno-draw-25-cards',
    name: "UNO Draw 25 Cards",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/uno-draw-25-cards.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'left-exit-12-off-ramp',
    name: "Left Exit 12 Off Ramp",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/left-exit-12-off-ramp.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'always-has-been',
    name: "Always Has Been",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/always-has-been.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'anakin-padme-4-panel',
    name: "Anakin Padme 4 Panel",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/anakin-padme-4-panel.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'epic-handshake',
    name: "Epic Handshake",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/epic-handshake.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'gru-s-plan',
    name: "Gru's Plan",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/gru-s-plan.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'running-away-balloon',
    name: "Running Away Balloon",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/running-away-balloon.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'disaster-girl',
    name: "Disaster Girl",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/disaster-girl.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'waiting-skeleton',
    name: "Waiting Skeleton",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/waiting-skeleton.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'sad-pablo-escobar',
    name: "Sad Pablo Escobar",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/sad-pablo-escobar.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'trade-offer',
    name: "Trade Offer",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/trade-offer.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'change-my-mind',
    name: "Change My Mind",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/change-my-mind.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'y-all-got-any-more-of-that',
    name: "Y'all Got Any More Of That",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/y-all-got-any-more-of-that.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'x-x-everywhere',
    name: "X, X Everywhere",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/x-x-everywhere.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'batman-slapping-robin',
    name: "Batman Slapping Robin",
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/batman-slapping-robin.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'woman-yelling-at-cat',
    name: "Woman Yelling At Cat",
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/woman-yelling-at-cat.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'marked-safe-from',
    name: "Marked Safe From",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/marked-safe-from.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'bernie-sanders-once-again-asking',
    name: "Bernie Sanders Once Again Asking",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/bernie-sanders-once-again-asking.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'bike-fall',
    name: "Bike Fall",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/bike-fall.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'ancient-aliens',
    name: "Ancient Aliens",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/ancient-aliens.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'mocking-spongebob',
    name: "Mocking Spongebob",
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/mocking-spongebob.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'one-does-not-simply',
    name: "One Does Not Simply",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/one-does-not-simply.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'they-re-the-same-picture',
    name: "They're The Same Picture",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/they-re-the-same-picture.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'is-this-a-pigeon',
    name: "Is This A Pigeon",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/is-this-a-pigeon.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'you-guys-are-getting-paid',
    name: "You Guys are Getting Paid",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/you-guys-are-getting-paid.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'absolute-cinema-imgflip',
    name: "Absolute Cinema",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/absolute-cinema.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'buff-doge-vs-cheems',
    name: "Buff Doge vs. Cheems",
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/buff-doge-vs-cheems.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: '0-days-without-lenny-simpsons',
    name: "0 days without (Lenny, Simpsons)",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/0-days-without-lenny-simpsons.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'expanding-brain',
    name: "Expanding Brain",
    type: 'image',
    isPremium: false,
    category: 'Tech',
    url: '/assets/memes/expanding-brain.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'mother-ignoring-kid-drowning-in-a-pool',
    name: "Mother Ignoring Kid Drowning In A Pool",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/mother-ignoring-kid-drowning-in-a-pool.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'squidward-window',
    name: "Squidward window",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/squidward-window.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'oprah-you-get-a',
    name: "Oprah You Get A",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/oprah-you-get-a.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'this-is-where-i-d-put-my-trophy-if-i-had-one',
    name: "This Is Where I'd Put My Trophy If I Had One",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/this-is-where-i-d-put-my-trophy-if-i-had-one.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'tuxedo-winnie-the-pooh',
    name: "Tuxedo Winnie The Pooh",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/tuxedo-winnie-the-pooh.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'megamind-peeking',
    name: "Megamind peeking",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/megamind-peeking.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'george-bush-9-11',
    name: "George Bush 9/11",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/george-bush-9-11.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'pawn-stars-best-i-can-do',
    name: "Pawn Stars Best I Can Do",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/pawn-stars-best-i-can-do.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'this-is-fine',
    name: "This Is Fine",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/this-is-fine.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'i-bet-he-s-thinking-about-other-women',
    name: "I Bet He's Thinking About Other Women",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/i-bet-he-s-thinking-about-other-women.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'bell-curve',
    name: "Bell Curve",
    type: 'image',
    isPremium: false,
    category: 'Tech',
    url: '/assets/memes/bell-curve.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'they-don-t-know',
    name: "They don't know",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/they-don-t-know.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'soldier-protecting-sleeping-child',
    name: "Soldier protecting sleeping child",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/soldier-protecting-sleeping-child.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'monkey-puppet',
    name: "Monkey Puppet",
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/monkey-puppet.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'friendship-ended',
    name: "Friendship ended",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/friendship-ended.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'two-guys-on-a-bus',
    name: "Two guys on a bus",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/two-guys-on-a-bus.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'clown-applying-makeup',
    name: "Clown Applying Makeup",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/clown-applying-makeup.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'imagination-spongebob',
    name: "Imagination Spongebob",
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/imagination-spongebob.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'roll-safe-think-about-it',
    name: "Roll Safe Think About It",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/roll-safe-think-about-it.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'spider-man-triple',
    name: "Spider Man Triple",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/spider-man-triple.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'boardroom-meeting-suggestion',
    name: "Boardroom Meeting Suggestion",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/boardroom-meeting-suggestion.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'where-monkey',
    name: "where monkey",
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/where-monkey.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'hide-the-pain-harold',
    name: "Hide the Pain Harold",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/hide-the-pain-harold.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'types-of-headaches-meme',
    name: "Types of Headaches meme",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/types-of-headaches-meme.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'evil-kermit',
    name: "Evil Kermit",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/evil-kermit.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'flex-tape',
    name: "Flex Tape",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/flex-tape.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'all-my-homies-hate',
    name: "All My Homies Hate",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/all-my-homies-hate.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'you-know-i-m-something-of-a-scientist-myself',
    name: "You know, I'm something of a scientist myself",
    type: 'image',
    isPremium: false,
    category: 'Tech',
    url: '/assets/memes/you-know-i-m-something-of-a-scientist-myself.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'three-headed-dragon',
    name: "Three-headed Dragon",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/three-headed-dragon.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'sleeping-shaq',
    name: "Sleeping Shaq",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/sleeping-shaq.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'inhaling-seagull',
    name: "Inhaling Seagull",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/inhaling-seagull.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'a-train-hitting-a-school-bus',
    name: "A train hitting a school bus",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/a-train-hitting-a-school-bus.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'laughing-leo',
    name: "Laughing Leo",
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/laughing-leo.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'anime-girl-hiding-from-terminator',
    name: "Anime Girl Hiding from Terminator",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/anime-girl-hiding-from-terminator.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'no-yes',
    name: "No - Yes",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/no-yes.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'panik-kalm-panik',
    name: "Panik Kalm Panik",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/panik-kalm-panik.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'aj-styles-undertaker',
    name: "AJ Styles & Undertaker",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/aj-styles-undertaker.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'scooby-doo-mask-reveal',
    name: "Scooby doo mask reveal",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/scooby-doo-mask-reveal.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'grant-gustin-over-grave',
    name: "Grant Gustin over grave",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/grant-gustin-over-grave.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'bad-luck-brian',
    name: "Bad Luck Brian",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/bad-luck-brian.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'megamind-no-bitches',
    name: "Megamind no bitches",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/megamind-no-bitches.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'domino-effect',
    name: "Domino Effect",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/domino-effect.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'spiderman-pointing-at-spiderman',
    name: "spiderman pointing at spiderman",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/spiderman-pointing-at-spiderman.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'whisper-and-goosebumps',
    name: "Whisper and Goosebumps",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/whisper-and-goosebumps.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'surprised-pikachu',
    name: "Surprised Pikachu",
    type: 'image',
    isPremium: false,
    category: 'Trending',
    url: '/assets/memes/surprised-pikachu.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'third-world-skeptical-kid',
    name: "Third World Skeptical Kid",
    type: 'image',
    isPremium: false,
    category: 'Reaction',
    url: '/assets/memes/third-world-skeptical-kid.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'who-killed-hannibal',
    name: "Who Killed Hannibal",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/who-killed-hannibal.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'grim-reaper-knocking-door',
    name: "Grim Reaper Knocking Door",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/grim-reaper-knocking-door.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'is-this-butterfly',
    name: "is this butterfly",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/is-this-butterfly.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'blank-nut-button',
    name: "Blank Nut Button",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/blank-nut-button.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'star-wars-yoda',
    name: "Star Wars Yoda",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/star-wars-yoda.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'futurama-fry',
    name: "Futurama Fry",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/futurama-fry.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'say-the-line-bart-simpsons',
    name: "say the line bart! simpsons",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/say-the-line-bart-simpsons.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'c-mon-do-something',
    name: "c'mon do something",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/c-mon-do-something.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'two-paths',
    name: "Two Paths",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/two-paths.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'grandma-finds-the-internet',
    name: "Grandma Finds The Internet",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/grandma-finds-the-internet.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'i-m-the-captain-now',
    name: "I'm The Captain Now",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/i-m-the-captain-now.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'leonardo-dicaprio-cheers',
    name: "Leonardo Dicaprio Cheers",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/leonardo-dicaprio-cheers.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'drake-blank',
    name: "Drake Blank",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/drake-blank.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'charlie-conspiracy-always-sunny-in-philidelphia',
    name: "Charlie Conspiracy (Always Sunny in Philidelphia)",
    type: 'image',
    isPremium: false,
    category: 'Tech',
    url: '/assets/memes/charlie-conspiracy-always-sunny-in-philidelphia.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'the-scroll-of-truth',
    name: "The Scroll Of Truth",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/the-scroll-of-truth.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'the-rock-driving',
    name: "The Rock Driving",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/the-rock-driving.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'whe-i-m-in-a-competition-and-my-opponent-is',
    name: "whe i'm in a competition and my opponent is",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/whe-i-m-in-a-competition-and-my-opponent-is.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'american-chopper-argument',
    name: "American Chopper Argument",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/american-chopper-argument.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'wolverine-remember',
    name: "Wolverine Remember",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/wolverine-remember.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'gus-fring-we-are-not-the-same',
    name: "Gus Fring we are not the same",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/gus-fring-we-are-not-the-same.png',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  },
  {
    id: 'trump-bill-signing',
    name: "Trump Bill Signing",
    type: 'image',
    isPremium: false,
    category: 'Classic',
    url: '/assets/memes/trump-bill-signing.jpg',
    topDefault: "WHEN YOU WANT TO MAKE A MEME",
    bottomDefault: "AND IT TURNS OUT EPIC"
  }
];

export const CAPTION_PROMPTS: Record<string, { top: string; bottom: string }[]> = {
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
    { top: 'GOING TO BED AT A REASONABLE HOUR', bottom: 'VS MAKING MEMES AT 3 AM' },
    { top: 'WHEN THE WIFI DROPS', bottom: 'AND YOUR MEME IS 99% UPLOADED' }
  ],
  tech: [
    { top: 'GENERATING CRISP MEMES AT 60 FPS', bottom: 'THE FUTURE IS HERE, MY FRIENDS' },
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

export const AI_CAPTION_PROMPTS = CAPTION_PROMPTS;
