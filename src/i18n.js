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
