import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SidebarProvider } from './Components/components/ui/sidebar.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
