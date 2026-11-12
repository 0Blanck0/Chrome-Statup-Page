// Serves the built app (dist/) on http://localhost:8000
import { createServer } from 'http-server'
import { fileURLToPath } from 'node:url'

const PORT = Number(process.env.PORT) || 8000
const root = fileURLToPath(new URL('../dist', import.meta.url))

createServer({ root, cache: -1 }).listen(PORT, () => {
  console.log(`Chevron is available on http://localhost:${PORT}`)
})
