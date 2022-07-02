import { createRoot } from 'react-dom/client'
import App from './App'

const containerRoot = document.getElementById('root')
const root = createRoot(containerRoot)
root.render(<App />)
