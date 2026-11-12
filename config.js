// Chevron user configuration: edit this file to change your websites, no rebuild needed.
//
// macros: websites suggested while typing (closest match on the name, the keywords and the domain)
//   name        displayed name, also used for matching
//   url         page opened
//   keywords    (optional) other names to match ('wiki' for Wikipédia...)
//   commands    (optional) URL templates used after a command symbol: {@} = macro url, {$} = text typed after the symbol
//   bgColor     { type: 'solid', color } or { type: 'gradient', gradientType: 'linear' | 'radial', colors, stops?, angle? }
//   textColor   color of the icon / text
//   icon        (optional) name of an SVG in icons.js, the initial of the name is shown otherwise
//   pinned      shown in the macros menu
//   key         (optional, pinned macros only) hotkey: Shift + this key ('KeyY' = Y)
window.CONFIG = {
  macros: [
    {
      name: 'Claude',
      category: 'IA',
      url: 'https://claude.ai/new',
      keywords: ['anthropic', 'ia', 'ai'],
      key: 'KeyC',
      commands: {
        search: { template: 'https://claude.ai/new?q={$}', description: 'ask Claude' }
      },
      bgColor: {
        type: 'solid',
        color: '#d97757'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'YouTube',
      category: 'Streaming',
      url: 'https://www.youtube.com',
      keywords: ['video'],
      icon: 'youtube',
      key: 'KeyY',
      commands: {
        search: { template: '{@}/results?search_query={$}' },
        go: { template: 'https://youtu.be/{$}', description: 'go to video' }
      },
      bgColor: {
        type: 'solid',
        color: '#f30002'
      },
      textColor: '#212121',
      pinned: true
    },
    {
      name: 'Netflix',
      category: 'Streaming',
      url: 'https://www.netflix.com/browse',
      keywords: ['film', 'serie'],
      icon: 'netflix',
      key: 'KeyN',
      commands: {
        search: { template: 'https://www.netflix.com/search?q={$}' }
      },
      bgColor: {
        type: 'solid',
        color: '#000'
      },
      textColor: '#da0813',
      pinned: true
    },
    {
      name: 'Disney+',
      category: 'Streaming',
      url: 'https://www.disneyplus.com/fr-fr',
      keywords: ['disney plus', 'disneyplus'],
      key: 'KeyP',
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: 135,
        colors: ['#0c1d4f', '#0e6eb8']
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Canal+',
      category: 'Streaming',
      url: 'https://www.canalplus.com',
      keywords: ['canal plus', 'canalplus', 'mycanal'],
      key: 'KeyK',
      bgColor: {
        type: 'solid',
        color: '#000'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Twitch',
      category: 'Streaming',
      url: 'https://www.twitch.tv',
      keywords: ['live'],
      icon: 'twitch',
      commands: {
        search: { template: '{@}/search?term={$}' },
        go: { template: '{@}/{$}', description: 'go to channel' }
      },
      bgColor: {
        type: 'solid',
        color: '#8c44f7'
      },
      textColor: '#000',
      pinned: true
    },
    {
      name: 'Spotify',
      category: 'Musique',
      url: 'https://open.spotify.com',
      keywords: ['musique', 'music'],
      icon: 'spotify',
      commands: {
        search: { template: '{@}/search/{$}' },
        go: { template: '{@}/track/{$}', description: 'go to track' }
      },
      bgColor: {
        type: 'solid',
        color: '#1ccc5b'
      },
      textColor: '#000',
      pinned: true
    },
    {
      name: 'Amazon',
      category: 'Shopping',
      url: 'https://www.amazon.fr',
      keywords: ['achat'],
      icon: 'amazon',
      key: 'KeyA',
      commands: {
        search: { template: '{@}/s?k={$}' }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#f29100', '#fff'],
        stops: [0, 80]
      },
      textColor: '#000',
      pinned: true
    },
    {
      name: 'GitHub',
      category: 'Dev',
      url: 'https://github.com',
      keywords: ['git'],
      icon: 'github',
      key: 'KeyG',
      commands: {
        search: { template: '{@}/search?q={$}' },
        go: { template: '{@}/{$}', description: 'go to repository' }
      },
      bgColor: {
        type: 'solid',
        color: '#171515'
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      name: 'StackOverflow',
      category: 'Dev',
      url: 'https://stackoverflow.com',
      keywords: ['stack overflow'],
      icon: 'stackoverflow',
      key: 'KeyS',
      commands: {
        search: { template: '{@}/search?q={$}' },
        go: { template: '{@}/questions/{$}', description: 'go to question' }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#e87922', '#ffbe25'],
        stops: [0, 100]
      },
      textColor: '#212121',
      pinned: true
    },
    {
      name: 'Gmail',
      category: 'Communication',
      url: 'https://mail.google.com',
      keywords: ['mail', 'email'],
      icon: 'gmail',
      key: 'KeyE',
      commands: {
        search: { template: '{@}/mail/u/0/#search/{$}' }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: 45,
        colors: ['#df493b', '#e8e8e8'],
        stops: [50, 100]
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      name: 'Google Drive',
      category: 'Travail',
      url: 'https://drive.google.com',
      keywords: ['drive'],
      icon: 'gdrive',
      commands: {
        search: { template: '{@}/drive/search?q={$}' }
      },
      bgColor: {
        type: 'gradient',
        angle: 70,
        gradientType: 'linear',
        colors: ['#2684fc', '#00ac47', '#ffba00']
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'WhatsApp',
      category: 'Communication',
      url: 'https://web.whatsapp.com',
      icon: 'whatsApp',
      key: 'KeyW',
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: 45,
        colors: ['#26d347', '#58f879']
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Discord',
      category: 'Communication',
      url: 'https://discord.com/app',
      icon: 'discord',
      key: 'KeyD',
      bgColor: {
        type: 'solid',
        color: '#5460e6'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Reddit',
      category: 'Social',
      url: 'https://www.reddit.com',
      icon: 'reddit',
      key: 'KeyR',
      commands: {
        search: { template: '{@}/search?q={$}' },
        go: { template: '{@}/r/{$}', description: 'go to subreddit' }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#f07e23', '#f74300'],
        stops: [0, 100]
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Instagram',
      category: 'Social',
      url: 'https://www.instagram.com',
      keywords: ['insta'],
      icon: 'instagram',
      key: 'KeyI',
      commands: {
        go: { template: '{@}/{$}', description: 'go to user' }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'radial',
        angle: 'circle at 30% 107%',
        colors: ['#fdf497', '#fdf497', '#fd5949', '#d6249f', '#285aeb'],
        stops: [0, 5, 45, 60, 90]
      },
      textColor: '#e8e8e8',
      pinned: true
    },
    {
      name: 'LinkedIn',
      category: 'Travail',
      url: 'https://www.linkedin.com/feed',
      icon: 'linkedin',
      key: 'KeyL',
      commands: {
        search: { template: 'https://www.linkedin.com/search/results/all/?keywords={$}' }
      },
      bgColor: {
        type: 'solid',
        color: '#0077b7'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Traduction',
      category: 'Outils',
      url: 'https://translate.google.fr/?sl=auto&tl=fr',
      keywords: ['translate', 'google traduction'],
      icon: 'translate',
      key: 'KeyT',
      commands: {
        search: { template: 'https://translate.google.fr/?sl=auto&tl=fr&text={$}', description: 'translate' }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        angle: 45,
        colors: ['#508bed', '#4654b4']
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Correcteur',
      category: 'Outils',
      url: 'https://www.reverso.net/orthographe/correcteur-francais/',
      keywords: ['reverso', 'orthographe'],
      key: 'KeyO',
      bgColor: {
        type: 'solid',
        color: '#1a5fb4'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'Wikipédia',
      category: 'Outils',
      url: 'https://fr.wikipedia.org',
      keywords: ['wikipedia', 'wiki'],
      icon: 'wikipedia',
      commands: {
        search: { template: '{@}/w/index.php?search={$}' },
        go: { template: '{@}/wiki/{$}', description: 'go to article' }
      },
      bgColor: {
        type: 'gradient',
        gradientType: 'linear',
        colors: ['#e1e1e3', '#bbb'],
        stops: [60, 100]
      },
      textColor: '#000',
      pinned: true
    },
    {
      name: 'Lumo',
      category: 'IA',
      url: 'https://lumo.proton.me',
      keywords: ['proton'],
      bgColor: {
        type: 'solid',
        color: '#6d4aff'
      },
      textColor: '#fff',
      pinned: true
    },
    {
      name: 'ChatGPT',
      category: 'IA',
      url: 'https://chatgpt.com',
      keywords: ['openai', 'gpt'],
      icon: 'chatGPT',
      bgColor: {
        type: 'solid',
        color: '#70a597',
      },
      textColor: '#f7f7f7',
      pinned: true
    },
    {
      name: 'DuckDuckGo',
      category: 'Recherche',
      url: 'https://duckduckgo.com',
      keywords: ['ddg'],
      commands: {
        search: { template: '{@}/?q={$}' }
      },
      bgColor: {
        type: 'solid',
        color: '#e37151'
      },
      textColor: '#e8e8e8',
      pinned: false
    }
  ],
  // "netflix?stranger things" searches on Netflix, "youtube/dQw4w9WgXcQ" opens a video
  commands: [
    {
      type: 'search',
      trigger: '?'
    },
    {
      type: 'go',
      trigger: '/'
    }
  ],
  // search engine used for everything that is not a website
  engine: {
    name: 'DuckDuckGo',
    bgColor: {
      type: 'solid',
      color: '#e37151'
    },
    textColor: '#e8e8e8',
    types: {
      // {$} = final query (what is in the query field), {@} = what the user typed
      query: {
        template: 'https://duckduckgo.com/?q={$}&kl=fr-fr'
      },
      calculator: {
        template: 'https://duckduckgo.com/?q={@}&kl=fr-fr'
      },
      currency: {
        template: 'https://duckduckgo.com/?q={@}&kl=fr-fr'
      }
    }
  }
}
