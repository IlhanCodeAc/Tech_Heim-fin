import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SidebarProvider } from './Components/components/ui/sidebar.tsx'
import { AuthProvider } from './Context/index.tsx'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
    <App />
    </AuthProvider>
)
