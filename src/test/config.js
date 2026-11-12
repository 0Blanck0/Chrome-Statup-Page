// Small configuration used by the tests (same shape as public/config.js)
const solid = color => ({ type: 'solid', color })

export const testConfig = {
  macros: [
    {
      name: 'GitHub',
      url: 'https://github.com',
      keywords: ['git'],
      commands: { search: { template: '{@}/search?q={$}' }, go: { template: '{@}/{$}', description: 'go to repository' } },
      bgColor: solid('#000'),
      textColor: '#fff',
      pinned: true,
    },
    {
      name: 'Netflix',
      url: 'https://www.netflix.com/browse',
      commands: { search: { template: 'https://www.netflix.com/search?q={$}' } },
      bgColor: solid('#000'),
      textColor: '#da0813',
      pinned: true,
    },
    { name: 'Google Drive', url: 'https://drive.google.com', bgColor: solid('#fff'), textColor: '#000', pinned: true },
    { name: 'Disney+', url: 'https://www.disneyplus.com/fr-fr', bgColor: solid('#00f'), textColor: '#fff', pinned: true },
    { name: 'Wikipédia', url: 'https://fr.wikipedia.org', bgColor: solid('#fff'), textColor: '#000', pinned: false },
  ],
  commands: [
    { type: 'search', trigger: '?' },
    { type: 'go', trigger: '/' },
  ],
  engine: {
    name: 'DuckDuckGo',
    bgColor: solid('#e37151'),
    textColor: '#e8e8e8',
    types: {
      query: { template: 'https://duckduckgo.com/?q={$}' },
      calculator: { template: 'https://duckduckgo.com/?q={@}' },
    },
  },
  icons: {},
}
