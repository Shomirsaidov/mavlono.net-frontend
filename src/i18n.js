import { ref } from 'vue'

// Static UI text is written in Tajik in the source and used as the translation key.
// Poems, poet names and other dynamic data are never passed through t().
const STORAGE_KEY = 'mavlono_lang'
const SUPPORTED = ['tg', 'en']

const readStoredLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return SUPPORTED.includes(stored) ? stored : 'tg'
  } catch (e) {
    return 'tg'
  }
}

export const lang = ref(readStoredLang())

export const setLang = (value) => {
  if (!SUPPORTED.includes(value)) return
  lang.value = value
  try { localStorage.setItem(STORAGE_KEY, value) } catch (e) { /* storage unavailable */ }
  document.documentElement.lang = value
}

const en = {
  // Navigation
  'Асосӣ': 'Home',
  'Саҳифаи ман': 'My page',
  'Каталог': 'Catalog',
  'Иловаи шеър': 'Add a poem',
  'Нависед': 'Write',
  'Профил': 'Profile',
  'AI Шарҳ': 'AI Explain',
  'Танзимот': 'Settings',
  'Шоирон': 'Poets',

  // Home
  'Шеърҳои нав': 'New poems',
  'Тозатарин шеърҳо аз шоирони тоҷик': 'The latest poems by Tajik poets',
  'Филтрҳои ҷустуҷӯ': 'Search filters',
  'Интихоби шеърҳо': 'Browse poems',
  '{n} фаъол': '{n} active',
  'Ҳамаи муаллифон': 'All authors',
  'Ҳамаи жанрҳо': 'All genres',
  'Ҳамаи мавзӯъҳо': 'All topics',
  'Шумораи натиҷаҳо: {n}': 'Results: {n}',
  'Тоза кардани филтр': 'Clear filters',
  'Шеър ёфт нашуд': 'No poems found',
  'Бо ин филтрҳо ягон шеър ёфт нашуд. Филтрҳоро тағйир диҳед.': 'No poems match these filters. Try changing them.',
  'Муфассал хонед →': 'Read more →',

  // Catalog & search
  'Каталог ва ҷустуҷӯ': 'Catalog & search',
  'Ҷустуҷӯи шеърҳо, шоирон ё мавзӯъҳо...': 'Search poems, poets or topics...',
  'Ҷустуҷӯ': 'Search',
  'Ҷустуҷӯ...': 'Search...',
  'Мавзӯъҳои маъмул': 'Popular topics',
  'Рӯйхати адибон': 'List of poets',
  'Натиҷаҳои ҷустуҷӯ': 'Search results',
  'Барои:': 'For:',
  'Натиҷа ёфт нашуд': 'No results found',
  'Мо чизе ёфта натавонистем. Лутфан калимаҳои дигарро истифода баред.': "We couldn't find anything. Please try different words.",
  'Ба каталог баргаштан': 'Back to catalog',

  // Poet pages
  'Шоир': 'Poet',
  'Шоир ёфт нашуд.': 'Poet not found.',
  'Обуна шудан +': 'Subscribe +',
  'Обунагирон': 'Subscribers',
  'Лайкҳо': 'Likes',
  'Дар бораи шоир': 'About the poet',
  'Давомашро хонед': 'Read more',
  'Машҳур': 'Popular',
  'Навтарин': 'Newest',
  'Шеъре нест...': 'No poems yet...',
  'Тарҷумаи ҳол': 'Biography',
  'Маълумоти бештар дар бораи ин шахсият дар ҳоли омодашавӣ аст...': 'More information about this figure is being prepared...',
  'Шеърҳои машҳур': 'Famous poems',
  'Ҳамааш →': 'See all →',
  'Хондан →': 'Read →',
  'Дигар адибон': 'Other poets',

  // Poem page
  'Шеър ёфт нашуд.': 'Poem not found.',
  '{n} бор хонда шуд': 'Read {n} times',
  'Иловакунандаи шеър': 'Added by',
  'Луғат ва калимаҳои душворфаҳм': 'Dictionary & difficult words',
  'калимаро нависед...': 'type a word...',
  'Маъно': 'Meaning',
  'Маънои шеър (AI Шарҳ)': 'Meaning of the poem (AI Explain)',
  'Шарҳҳо': 'Comments',
  'Ҳоло шарҳе нест.': 'No comments yet.',
  'Хонанда': 'Reader',
  'Назари худро нависед': 'Share your thoughts',
  'Фикратонро нависед...': 'Write your comment...',
  'Фиристодан': 'Send',
  'Саҳифаи шоир': "Poet's page",
  'Шеърҳои монанд': 'Similar poems',
  'Лутфан аввал ба система ворид шавед.': 'Please sign in first.',
  'Шумо': 'You',

  // Profile
  'Профили шумо': 'Your profile',
  'Мушоҳидаи профили оммавӣ': 'Viewing public profile',
  '{n}‑ҷой': '#{n}',
  'хонанда': 'reader',
  'Шеърҳои воридкарда': 'Poems added',
  'Ҷойгоҳ дар рейтинг': 'Ranking',
  'Куллан хонда шуд': 'Total reads',
  'Обунаҳо': 'Subscriptions',
  'Шеърҳои писандида': 'Liked poems',
  'Шеърҳои иловашуда': 'Added poems',
  'Номаълум': 'Unknown',
  'Шумо ҳоло ҳеҷ фаъолияте надоред.': "You don't have any activity yet.",
  'Ба каталог гузарам': 'Go to catalog',
  'Хуруҷ аз система': 'Sign out',

  // AI
  'Хуши сунъӣ (AI)': 'Artificial intelligence (AI)',
  'Маъно ва шарҳи шеъри тоҷикиро биомӯзед': 'Learn the meaning and explanation of Tajik poetry',
  'Шеъри худро ба ин ҷо нависед ё ворид кунед...': 'Write or paste your poem here...',
  'Шарҳ дода мешавад...': 'Explaining...',
  'Шарҳ гиред': 'Get explanation',
  'Шарҳи ҳуши сунъӣ': 'AI explanation',
  'Ҷавоб нест.': 'No response.',
  'Хатогӣ рух дод. Дубора кӯшиш кунед.': 'Something went wrong. Please try again.',

  // Auth
  'Хуш омадед': 'Welcome',
  'Ба ҳисоби худ ворид шавед': 'Sign in to your account',
  'Ҳисоби нав созед': 'Create a new account',
  'Вуруд': 'Sign in',
  'Бақайдгирӣ': 'Sign up',
  'Ном ва насаб': 'Full name',
  'Номи худро ворид кунед': 'Enter your name',
  'Почтаи электронӣ': 'Email',
  'Парол': 'Password',
  'Лутфан интизор шавед...': 'Please wait...',
  'Вуруд ба система': 'Sign in',
  'Хатогӣ ҳангоми вуруд': 'Sign-in failed',
  'Хатогӣ ҳангоми бақайдгирӣ': 'Sign-up failed',

  // Write
  'Шеъри нав ба сомона илова кунед': 'Add a new poem to the site',
  'Шоирро интихоб кунед': 'Select a poet',
  'Матни шеър': 'Poem text',
  'Матни шеърро ин ҷо нависед...': 'Write the poem text here...',
  'Жанр': 'Genre',
  'Жанрро интихоб кунед': 'Select a genre',
  'Тегҳо (бо вергул ҷудо кунед)': 'Tags (separate with commas)',
  'ишқ, ватан, табиат': 'love, homeland, nature',
  'Шеър бо муваффақият илова шуд!': 'Poem added successfully!',
  'Фиристода мешавад...': 'Sending...',
  'Шеър илова кардан': 'Add poem',

  // Settings
  'Дар бораи лоиҳа ва ҷамоаи мо': 'About the project and our team',
  'Забон': 'Language',
  'Забони интерфейс': 'Interface language',
  'Забони интерфейсро интихоб кунед. Шеърҳо ва маълумоти дигар бетағйир мемонанд.': 'Choose the interface language. Poems and other content stay unchanged.',
  'Ҷамоаи мо': 'Our team',
  'А': 'A',
  'Абубакр Шомирсаидов': 'Abubakr Shomirsaidov',
  'Асосгузор': 'Founder',
  'Абубакр Шомирсаидов — барномасоз ва тадқиқотчии соҳаи ҳуши сунъӣ аз Хуҷанд, ки зиёда аз се сол маҳсулоти барномавӣ месозад. Корашро дар чорроҳаи ҳуши сунъӣ, муҳандисии нармафзор ва тадқиқоти амалӣ пеш мебарад.':
    'Abubakr Shomirsaidov is a programmer and AI researcher from Khujand who has been building software products for more than three years. His work sits at the crossroads of artificial intelligence, software engineering and applied research.',
  'Ӯ асосгузори Shoiron.tj (пештар mavlono.tj) аст — бузургтарин маркази кушод барои хондан, мубодила ва шарҳи шеъри форсӣ-тоҷикӣ, ки зиёда аз 8 800 шеър ва беш аз 2 000 хонандаи фаъоли моҳона дорад.':
    'He is the founder of Shoiron.tj (formerly mavlono.tj), the largest open hub for reading, sharing and interpreting Persian-Tajik poetry, with more than 8,800 poems and over 2,000 monthly active readers.',
  'Дар соҳаи технология ӯ ҳамчун ходими таҷрибаомӯзи омӯзиши мошинӣ дар Zypl.ai дар сохтани моделҳои скоринг барои чор бонки Осиёи Марказӣ ва АМА иштирок кардааст. Ӯ ҳамчунин CTO-и Moní AI (tajiklaw.ai) — мушовири ҳуқуқии ҳуши сунъӣ оид ба қонунгузории Тоҷикистон ва CTO-и Poputki.online — аввалин платформаи ҳамсафарӣ ва фурӯши чиптаи автобус дар кишвар мебошад.':
    'In technology, he worked as a machine learning intern at Zypl.ai, helping build scoring models for four banks in Central Asia and the UAE. He is also the CTO of Moní AI (tajiklaw.ai), an AI legal advisor on Tajikistan’s legislation, and the CTO of Poputki.online, the country’s first carpooling and bus ticket platform.',
  'Ғайр аз ин, Абубакр дар ҷомеа фаъол аст: сафири минтақавии Common Voice Tajik, ташкилкунандаи се ҳакатон дар вилояти Суғд, мураббии ихтиёрӣ дар лоиҳаи UNICEF Тоҷикистон ва ҳаммуассиси Aurora Rising Sun, ки ба духтарони афғон дарсҳои ройгон медиҳад. Ӯ иштирокчии барномаи Yale Young Global Scholars (тобистони 2026) ва дугона қаҳрамони Лигаи миллии мунозира мебошад.':
    'Abubakr is also active in the community: he is a regional ambassador for Common Voice Tajik, organized three hackathons in the Sughd region, volunteers as a mentor for UNICEF Tajikistan, and co-founded Aurora Rising Sun, which gives free lessons to Afghan girls. He is a participant of the Yale Young Global Scholars program (summer 2026) and a two-time champion of the National Debate League.',
  'Сайти шахсӣ': 'Personal website',
  'Мо дар расонаҳо': 'We in the media',
  'Лоиҳаи мо дар шабакаҳои телевизионӣ нишон дода шудааст:': 'Our project has been featured on television networks:',
  'Телевизион': 'Television',

  // Admin
  'Админ': 'Admin',
  'Хуруҷ': 'Sign out',
  'Шеърҳо': 'Poems',
  'Адибон': 'Poets',
  'Панели маъмурӣ': 'Admin panel',
  'Пароли маъмурӣ': 'Admin password',
  'Ворид шудан': 'Sign in',
  'Бозгашт ба сомона': 'Back to site',
  'Хатогӣ дар воридшавӣ': 'Sign-in error',
  'Сервер дастрас нест': 'Server unavailable',
  'Идоракунии мундариҷа': 'Content management',
  'Идоракунии профилҳои адибон': 'Manage poet profiles',
  'Иловаи адиб': 'Add poet',
  'Таҳрири адиб': 'Edit poet',
  'Нест кардани адиб': 'Delete poet',
  'Нест кардани шеър': 'Delete poem',
  'Таҳрири шеър': 'Edit poem',
  'Мундариҷа': 'Content',
  'Муаллиф': 'Author',
  'Амалҳо': 'Actions',
  'Акс': 'Photo',
  'Адиб': 'Poet',
  'Категория': 'Category',
  'Жанр / Категория': 'Genre / Category',
  'Давраи ҳаёт': 'Lifetime',
  'Ному насаб': 'Full name',
  'Масалан: Ҷалолуддини Румӣ': 'e.g. Jalaluddin Rumi',
  'Масалан: Классик': 'e.g. Classic',
  'Масалан: 1207 - 1273': 'e.g. 1207 - 1273',
  'Аксро кашола кунед ё интихоб намоед': 'Drag a photo here or choose one',
  'Тоза кардан': 'Remove',
  'Навиштан': 'Write',
  'Пешнамоиш': 'Preview',
  'Матне барои пешнамоиш нест...': 'Nothing to preview...',
  'Барчаспҳо': 'Labels',
  'Бекор кардан': 'Cancel',
  'Бастан': 'Close',
  'Ҳифз кардан': 'Save',
  'Ҳифз...': 'Saving...',
  'Боргузорӣ...': 'Loading...',
  'Адиб ёфт нашуд.': 'Poet not found.',
  'Тафсилоти шеър #{n}': 'Poem details #{n}',
  'Ҳа, нест кун': 'Yes, delete',
  'Нест карда истодааст...': 'Deleting...',
  'ин адиб': 'this poet',
  'Оё шумо мутмаин ҳастед, ки мехоҳед маълумоти': 'Are you sure you want to delete the data of',
  '-ро нест кунед? Ин амалро баргардонда намешавад.': '? This action cannot be undone.',
  'Оё шумо мутмаин ҳастед, ки мехоҳед ин шеърро нест кунед? Ин амалро баргардонда намешавад.': 'Are you sure you want to delete this poem? This action cannot be undone.',

  // Landing page
  'Меню': 'Menu',
  'Оғоз кардан': 'Get started',
  'Имкониятҳо': 'Features',
  'Шарҳи AI': 'AI explanation',
  'Дар расонаҳо': 'In the media',
  'Маркази кушоди шеъри форсӣ-тоҷикӣ': 'Open Persian-Tajik poetry hub',
  'Шеъри бузургон,': 'The poetry of the masters,',
  'фаҳмо ба забони имрӯз': "understood in today's language",
  'mavlono.net — маркази кушод барои хондан, ҷустуҷӯ ва фаҳмидани шеъри форсӣ-тоҷикӣ. Ҳуши сунъӣ калимаҳо ва мисраъҳои кӯҳнаро ба тоҷикии имрӯза шарҳ медиҳад.': 'mavlono.net is an open hub for reading, searching and understanding Persian-Tajik poetry. AI explains archaic words and lines in modern Tajik.',
  'Оғози хондан': 'Start reading',
  'Дидани каталог': 'Browse the catalog',
  '8 800+ шеър': '8,800+ poems',
  'Шарҳи AI ба тоҷикии имрӯза': 'AI explanations in modern Tajik',
  'Луғат дар паҳлуи шеър': 'A dictionary beside every poem',
  'нейзор, ҷое, ки най мерӯяд;': 'a reed bed, a place where reeds grow;',
  'аз решаам ҷудо кардаанд.': 'they have cut me from my roots.',
  'Най аз ҷудоии худ аз найистон нола мекунад — рамзи ҷоне, ки аз сарчашмаи худ дур афтодааст.': 'The reed laments its separation from the reed bed — a symbol of the soul torn from its source.',
  'Мо дар рақамҳо': 'We in numbers',
  'шеър дар сомона': 'poems on the platform',
  'хонандаи фаъол дар як моҳ': 'monthly active readers',
  'донишҷӯ, ки лоиҳа дар назди онҳо муаррифӣ шуд': 'students the project was presented to',
  'ҷой дар озмуни миллии ихтироъ': 'place at the National Invention Prize',
  'Ҳама чиз барои хондани шеър': 'Everything you need to read poetry',
  'Аз лентаи шеърҳои нав то шарҳи ҳуши сунъӣ — ҳар чизе, ки барои хондан, фаҳмидан ва мубодилаи шеър лозим аст, дар як ҷо.': 'From the feed of new poems to AI explanations — everything you need to read, understand and share poetry, in one place.',
  'Лентаи шеърҳои нав': 'Feed of new poems',
  'Тозатарин шеърҳо аз шоирони тоҷик дар як лента — бо филтр аз рӯи муаллиф, жанр ва мавзӯъ.': 'The latest poems by Tajik poets in one feed — filter by author, genre and topic.',
  'Рӯйхати адибон, мавзӯъҳои маъмул ва ҷустуҷӯи зуд аз рӯи шеър, шоир ё калима.': 'A list of poets, popular topics and fast search by poem, poet or word.',
  'Мисраъҳои душворро ворид кунед ва маънои онҳоро ба забони тоҷикии имрӯза гиред.': 'Paste difficult lines and get their meaning in modern Tajik.',
  'Калимаҳои кӯҳна ва душворфаҳмро бевосита дар саҳифаи худи шеър ҷустуҷӯ кунед.': 'Look up archaic and hard-to-understand words right on the poem page.',
  'Саҳифаи шоирон': 'Poet pages',
  'Тарҷумаи ҳол, шеърҳои машҳур ва навтарин; ба шоири дӯстдоштаатон обуна шавед.': 'Biography, famous and newest poems; subscribe to your favorite poet.',
  'Лайк ва шарҳҳо': 'Likes & comments',
  'Шеърро писанд кунед, назар нависед ва бо дигар хонандагон андеша мубодила намоед.': 'Like a poem, leave a comment and share your thoughts with other readers.',
  'Шеъри худро илова кунед': 'Add your own poems',
  'Шеър ё байтҳои худро ба сомона илова кунед ва жанр ва тегҳоро нишон диҳед.': 'Add your poems or couplets to the site and set the genre and tags.',
  'Саҳифаи шахсӣ': 'Personal page',
  'Шеърҳои писандида, обунаҳо, шеърҳои иловашуда ва ҷойгоҳи шумо дар рейтинг.': 'Liked poems, subscriptions, added poems and your place in the ranking.',
  'Тоҷикӣ ва English': 'Tajik & English',
  'Интерфейси сомона ба забонҳои тоҷикӣ ва англисӣ; худи шеърҳо бетағйир мемонанд.': 'The interface is available in Tajik and English; the poems themselves stay unchanged.',
  'Ҳуши сунъӣ': 'Artificial intelligence',
  'Калимаҳои кӯҳна дигар монеа нестанд': 'Archaic words are no longer a barrier',
  'Шеъри классикӣ пур аз калимаҳо ва таркибҳоест, ки имрӯз кам истифода мешаванд. Ҳуши сунъии mavlono онҳоро ба забони равони тоҷикии имрӯза шарҳ медиҳад — то шумо на танҳо бихонед, балки бифаҳмед.': "Classical poetry is full of words and phrases that are rarely used today. mavlono's AI explains them in fluent modern Tajik — so you don't just read, you understand.",
  'Санҷидани шарҳи AI': 'Try AI explanations',
  'Шеърро пайдо кунед': 'Find a poem',
  'Дар лента, каталог ё ҷустуҷӯ шеъри дилхоҳро ёбед.': 'Find any poem in the feed, catalog or search.',
  'Ҳуши сунъӣ калимаҳо ва мисраъҳои кӯҳнаро ба тоҷикии равони имрӯза шарҳ медиҳад.': 'AI explains archaic words and lines in fluent modern Tajik.',
  'Амиқтар бифаҳмед': 'Understand more deeply',
  'Луғатро кушоед, шарҳҳои хонандагонро бихонед ва шеърҳои монандро бубинед.': "Open the dictionary, read other readers' comments and discover similar poems.",
  'Мо дар Sughd TV': 'We on Sughd TV',
  'Мусоҳибаҳо дар телевизион дар бораи лоиҳа, шеъри тоҷикӣ ва он ки чӣ тавр технология онро ба наслҳои нав наздик мекунад.': 'Television interviews about the project, Tajik poetry and how technology brings it closer to new generations.',
  'Мусоҳиба дар Sughd TV — 1': 'Sughd TV interview — 1',
  'Мусоҳиба дар Sughd TV — 2': 'Sughd TV interview — 2',
  'Муаррифӣ дар назди 400+ донишҷӯ': 'Presented to 400+ students',
  'Ҷои 2-юм дар озмуни миллии ихтироъ': '2nd place at the National Invention Prize',
  'Мусоҳибаҳо дар Sughd TV': 'Interviews on Sughd TV',
  'Ду нусха': 'Two editions',
  'Як платформа — ду хона': 'One platform, two homes',
  'Платформаи мо ду нусха дорад. Ҳар ду ба як мақсад хидмат мекунанд: шеъри форсӣ-тоҷикӣ барои ҳама.': 'Our platform has two editions. Both serve one goal: Persian-Tajik poetry for everyone.',
  'Шумо ҳоло инҷоед': 'You are here',
  'Нусхаи нав бо лентаи шахсӣ, шарҳи ҳуши сунъӣ, луғат, обуна ба шоирон ва ҳисоби шахсӣ.': 'The newer edition, with a personal feed, AI explanations, a dictionary, poet subscriptions and a personal account.',
  'Нусхаи дигар': 'Other edition',
  'Нусхаи дигари платформаи мо дар shoiron.tj дастрас аст — бузургтарин маркази кушод барои хондан, мубодила ва шарҳи шеъри форсӣ-тоҷикӣ.': 'Another edition of our platform is available at shoiron.tj — the largest open hub for reading, sharing and interpreting Persian-Tajik poetry.',
  'Боз кардани shoiron.tj': 'Open shoiron.tj',
  'Хуҷанд, Тоҷикистон': 'Khujand, Tajikistan',
  'Бештар дар бораи ӯ': 'More about him',
  'Шеърро на танҳо бихонед — бифаҳмед': "Don't just read poetry — understand it",
  'Ҳисоб кушоед, то лентаи шахсии худро бинед, шеърҳоро писанд кунед, назар нависед ва ба шоирони дӯстдоштаатон обуна шавед.': 'Create an account to see your personal feed, like poems, comment and subscribe to your favorite poets.',
}

const dictionaries = { en }

// t('Тоҷикӣ матн', { n: 3 }) — falls back to the Tajik source text.
export const t = (key, params) => {
  const dict = dictionaries[lang.value]
  let out = (dict && dict[key]) || key
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      out = out.replaceAll(`{${name}}`, value ?? '')
    }
  }
  return out
}

export default {
  install(app) {
    app.config.globalProperties.$t = t
    app.config.globalProperties.$lang = lang
    document.documentElement.lang = lang.value
  }
}
